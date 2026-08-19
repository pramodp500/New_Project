---
test: ../01_dashboard_loads_test.md
status: passed
started: 2026-08-19T20:53:50.441Z
duration_s: 219
session_id: f6edd8ef-cfd2-4c7d-987d-6e0d00e8b784
---

# Dashboard loads and displays real data — Result

## Navigate to the dashboard ✓ passed (1.14s)
md5: a4b99dee190764681362f713d8949ce3
Open http://localhost:3000/dashboard. Wait for the page to fully load and confirm the URL contains "/dashboard".

## Verify stat cards are visible and show non-zero values ✓ passed (1.05s)
md5: d487559969329c4a146d0d6f960ccee7
Verify that four stat cards are visible on the page: "Total Expenses", "Current Month", "Number of Expenses", and "Average Expense". Verify that the "Total Expenses" card displays a dollar amount greater than $0.00. Verify that the "Number of Expenses" card displays a number greater than 0.

## Verify category chart is rendered ✓ passed (41.6s)
md5: a63fcb03f48f5310b463232365de0b4c
Verify that the "Expenses by Category" section is visible on the page. Verify that at least one category label (such as "Food", "Travel", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", or "Other") is visible within the category chart section.

## Verify monthly chart is rendered ✓ passed (47.6s)
md5: 3a00da5cf8b180a4304bcef613eeaec1
Verify that the "Monthly Expenses" section is visible on the page. Verify that the bar chart area contains at least one bar or data point representing a month.

## Verify recent expenses table has entries ✓ passed (32.3s)
md5: da70e0287fada3b9572467d5e9bd6416
Verify that the "Recent Expenses" section is visible. Verify that the table within this section contains at least one row with expense data (a date, description, category badge, payment method, and dollar amount). Verify that the "View All" link is visible next to the "Recent Expenses" heading.

## Verify sidebar navigation works ✓ passed (87.2s)
md5: 987bc4bcda74cde53e2e00801050d22a
Click the "Expenses" link in the sidebar navigation. Verify the URL changes to contain "/expenses". Then click the "Dashboard" link in the sidebar. Verify the URL changes back to contain "/dashboard" and the stat cards are visible again.
