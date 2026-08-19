<#
.SYNOPSIS
    Closed-loop: Kane CLI test 08 -> AI fix -> re-verify.
#>
param(
    [int]$MaxRetries = 3,
    [string]$TestFile = "tests\kane\08_dashboard_total_test.md",
    [string]$AppUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$KaneCli = (Get-Command kane-cli.cmd -ErrorAction SilentlyContinue).Source
if (-not $KaneCli) { $KaneCli = "kane-cli" }
$OpenCode = (Get-Command opencode.cmd -ErrorAction SilentlyContinue).Source
if (-not $OpenCode) { $OpenCode = "opencode" }

function Write-Banner($title, $color = "Cyan") {
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor $color
    Write-Host "  $title" -ForegroundColor $color
    Write-Host ("=" * 60) -ForegroundColor $color
    Write-Host ""
}

function Write-Line($msg, $icon = "info") {
    $color = switch ($icon) { "ok" { "Green" } "fail" { "Red" } "fix" { "Magenta" } default { "Yellow" } }
    Write-Host "  $icon $msg" -ForegroundColor $color
}

function Test-DevServer {
    try {
        $r = Invoke-WebRequest -Uri $AppUrl -TimeoutSec 3 -UseBasicParsing -ErrorAction SilentlyContinue
        return $r.StatusCode -eq 200
    } catch { return $false }
}

function Start-DevServer {
    Write-Line "Starting Next.js dev server..." "info"
    Start-Process -FilePath "cmd" -ArgumentList "/c", "cd /d `"$ProjectDir`" && npm run dev > nul 2>&1" -WindowStyle Minimized
    $elapsed = 0
    while ($elapsed -lt 60) {
        Start-Sleep -Seconds 2; $elapsed += 2
        if (Test-DevServer) {
            Write-Line "Dev server ready at $AppUrl" "ok"
            return $true
        }
    }
    Write-Line "Dev server failed to start" "fail"
    return $false
}

function Invoke-KaneTest {
    $fullPath = Join-Path $ProjectDir $TestFile
    Write-Line "Running: $TestFile" "info"
    $p = New-Object System.Diagnostics.Process
    $p.StartInfo.FileName = $KaneCli
    $p.StartInfo.Arguments = "testmd run `"$fullPath`" --headless --timeout 300 --agent"
    $p.StartInfo.WorkingDirectory = $ProjectDir
    $p.StartInfo.RedirectStandardOutput = $true
    $p.StartInfo.RedirectStandardError = $true
    $p.StartInfo.UseShellExecute = $false
    $p.StartInfo.CreateNoWindow = $true
    $p.Start() | Out-Null
    $stdout = $p.StandardOutput.ReadToEnd()
    $stderr = $p.StandardError.ReadToEnd()
    $p.WaitForExit()

    $status = "unknown"; $summary = ""; $oneLiner = ""; $duration = ""
    foreach ($line in ($stdout -split "`n")) {
        $line = $line.Trim()
        if ($line -eq "") { continue }
        try {
            $evt = $line | ConvertFrom-Json
            if ($evt.type -eq "run_end") {
                $status = $evt.status
                $summary = $evt.summary
                $oneLiner = $evt.one_liner
                $duration = $evt.duration
            }
        } catch {}
    }
    return @{ Status=$status; Summary=$summary; OneLiner=$oneLiner; Duration=$duration; Output=$stdout; ExitCode=$p.ExitCode }
}

function Invoke-AIRepair($testName, $failedStep, $reason, $expected) {
    $prompt = @"
## Kane CLI Test Failure - Repair Required

Test: $testName
Failed Step: $failedStep
Failure Reason: $reason
Expected Behavior: $expected

### Your Task:
1. Read the relevant source files in src/ to understand the current implementation
2. Identify the root cause of this failure
3. Fix the APPLICATION CODE only - do NOT modify the test file
4. Explain what you changed and why

### Constraints:
- NEVER modify files in tests/kane/
- NEVER hardcode expected values
- NEVER suppress failures
- Fix the actual behavior to match expectations
"@

    Write-Line "Invoking opencode repair agent..." "fix"
    $p = New-Object System.Diagnostics.Process
    $p.StartInfo.FileName = $OpenCode
    $p.StartInfo.Arguments = "run --auto --pure --dir `"$ProjectDir`" `"$prompt`""
    $p.StartInfo.WorkingDirectory = $ProjectDir
    $p.StartInfo.RedirectStandardOutput = $true
    $p.StartInfo.RedirectStandardError = $true
    $p.StartInfo.UseShellExecute = $false
    $p.StartInfo.CreateNoWindow = $true
    $p.Start() | Out-Null
    $out = $p.StandardOutput.ReadToEnd()
    $err = $p.StandardError.ReadToEnd()
    $p.WaitForExit()
    if ($out) {
        $lines = $out -split "`n" | Select-Object -Last 10
        foreach ($l in $lines) { if ($l.Trim()) { Write-Host "    $l" -ForegroundColor DarkGray } }
    }
    return @{ Success = ($p.ExitCode -eq 0) }
}

# ============================================================
# MAIN
# ============================================================

Write-Banner "AI -> BUILD"
Write-Host "  Application changed." -ForegroundColor White
Write-Host "  Project: $ProjectDir" -ForegroundColor DarkGray
Write-Host "  Test:    $TestFile" -ForegroundColor DarkGray

# Step 1: Ensure dev server
if (-not (Test-DevServer)) {
    Start-DevServer | Out-Null
} else {
    Write-Line "Dev server already running at $AppUrl" "ok"
}

# Step 2: Run Kane verification
Write-Banner "KANE -> VERIFY"
Write-Line "Running verification..."
$result = Invoke-KaneTest

if ($result.Status -eq "passed") {
    Write-Line "PASSED ($($result.Duration)s)" "ok"
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Green
    Write-Host "  CLOSED LOOP COMPLETE" -ForegroundColor Green
    Write-Host "  Build -> Verify -> Pass" -ForegroundColor Green
    Write-Host ("=" * 60) -ForegroundColor Green
    exit 0
}

Write-Line "FAILED" "fail"
if ($result.Summary) { Write-Line "Reason: $($result.Summary)" "fail" }

# Step 3: Repair loop
$retryCount = 0
while ($retryCount -lt $MaxRetries) {
    $retryCount++

    Write-Banner "KANE -> AI"
    Write-Line "Failure sent to AI coding agent." "info"
    Write-Line "Test: $TestFile" "info"
    if ($result.Summary) { Write-Line "Reason: $($result.Summary)" "info" }

    # Parse failure details from Result.md
    $testDir = Join-Path $ProjectDir "tests\kane"
    $dirs = Get-ChildItem -Path $testDir -Directory -Filter "output-08_*" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
    $failedStep = ""; $reason = ""; $expected = ""
    if ($dirs.Count -gt 0) {
        $rf = Join-Path $dirs[0].FullName "Result.md"
        if (Test-Path $rf) {
            $content = Get-Content $rf -Raw
            foreach ($line in ($content -split "`n")) {
                if ($line -match '##\s+(.+?)\s*✗\s*failed') { $failedStep = $matches[1].Trim() }
                if ($line -match 'Reason:\s*(.+)$') { $reason = $matches[1].Trim() }
            }
            # Extract step description
            $capture = $false
            foreach ($line in ($content -split "`n")) {
                if ($capture -and $line.Trim()) { $expected = $line.Trim(); break }
                if ($line -match "##\s+$([regex]::Escape($failedStep))") { $capture = $true }
            }
        }
    }
    if (-not $failedStep) { $failedStep = $result.Summary }
    if (-not $reason) { $reason = "Kane test failed with exit code $($result.ExitCode)" }
    if (-not $expected) { $expected = $result.OneLiner }

    Write-Banner "AI -> FIX"
    Write-Line "Root cause identified:" "fix"
    Write-Line "  $reason" "fix"
    Write-Host ""
    Write-Line "Applying fix..." "fix"

    $repair = Invoke-AIRepair $TestFile $failedStep $reason $expected

    # Safety: check test files weren't modified
    $recentTestChanges = Get-ChildItem -Path (Join-Path $ProjectDir "tests\kane") -Filter "*_test.md" -ErrorAction SilentlyContinue |
        Where-Object { $_.LastWriteTime -gt (Get-Date).AddSeconds(-120) }
    if ($recentTestChanges) {
        Write-Line "SAFETY: Test files were modified! Reverting..." "fail"
        & git -C $ProjectDir checkout -- "tests/" 2>$null
    }

    # Re-run Kane
    Write-Banner "KANE -> VERIFY (Retry $retryCount/$MaxRetries)"
    Write-Line "Running verification again..."
    $result = Invoke-KaneTest

    if ($result.Status -eq "passed") {
        Write-Line "PASSED ($($result.Duration)s)" "ok"
        Write-Host ""
        Write-Host ("=" * 60) -ForegroundColor Green
        Write-Host "  CLOSED LOOP COMPLETE" -ForegroundColor Green
        Write-Host "  Build -> Verify -> Fail -> Fix -> Verify -> Pass" -ForegroundColor Green
        Write-Host ("=" * 60) -ForegroundColor Green
        exit 0
    }

    Write-Line "FAILED (attempt $retryCount/$MaxRetries)" "fail"
    if ($result.Summary) { Write-Line "Reason: $($result.Summary)" "fail" }
}

Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Red
Write-Host "  CLOSED LOOP FAILED" -ForegroundColor Red
Write-Host "  Max retries ($MaxRetries) exhausted." -ForegroundColor Red
Write-Host ("=" * 60) -ForegroundColor Red
exit 1
