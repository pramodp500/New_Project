---
test: ../01_dashboard_loads_test.md
status: failed
started: 2026-08-17T19:21:55.627Z
duration_s: 162
session_id: 5a2ae03d-5bf2-4431-a992-522dd74c77e6
---

# Dashboard loads and displays real data — Result

## Navigate to the dashboard ✓ passed (18s)
md5: a4b99dee190764681362f713d8949ce3
Open http://localhost:3000/dashboard. Wait for the page to fully load and confirm the URL contains "/dashboard".

## Verify stat cards are visible and show non-zero values ✓ passed (31.5s)
md5: d487559969329c4a146d0d6f960ccee7
Verify that four stat cards are visible on the page: "Total Expenses", "Current Month", "Number of Expenses", and "Average Expense". Verify that the "Total Expenses" card displays a dollar amount greater than $0.00. Verify that the "Number of Expenses" card displays a number greater than 0.

## Verify category chart is rendered ✗ failed (107.2s)
md5: a63fcb03f48f5310b463232365de0b4c
Reason: Screenshot failed: TimeoutError: screenshot: Timeout 60000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded
 — bug verdict: Screenshot capture times out after dashboard verification [environment_issue/platform_failure, confidence 0.93]
Verify that the "Expenses by Category" section is visible on the page. Verify that at least one category label (such as "Food", "Travel", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", or "Other") is visible within the category chart section.

## Verify monthly chart is rendered ⏭ skipped

## Verify recent expenses table has entries ⏭ skipped

## Verify sidebar navigation works ⏭ skipped
