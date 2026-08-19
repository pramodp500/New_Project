---
test: ../08_dashboard_total_test.md
status: failed
started: 2026-08-17T19:36:59.621Z
duration_s: 306
session_id: 9b36c6ea-233a-43fb-8c8b-4e751a89958b
---

# Dashboard Total Calculation — Cross-Verify with Expense List — Result

## Record the dashboard total ✓ passed (43.6s)
md5: 85c5868b32b4a12f4ba836443b04a38d
Open http://localhost:3000/dashboard. Wait for the page to fully load. Store the dollar amount from the "Total Expenses" stat card as 'dashboard_total'. Store the number from the "Number of Expenses" stat card as 'dashboard_count'. Verify 'dashboard_count' is greater than 0.

## Navigate to the full expense list ✓ passed (50.7s)
md5: 135153eef400e61e4c8f10f51be09ac9
Click the "Expenses" link in the sidebar. Wait for the expense table to load. Verify the table contains expense rows.

## Verify the expense count matches the dashboard ✓ passed (49.5s)
md5: 28944b403b91e2fa03e6bf6d835e3c8c
Count the number of expense rows in the table and store it as 'list_count'. Verify that 'list_count' equals 'dashboard_count'. If they differ, it means the dashboard count and the actual list count are out of sync.

## Verify the category breakdown adds up ✓ passed (53.3s)
md5: c47477bbfc7d56edd3b2b6082636d893
Navigate back to the dashboard. Scroll to the "Expenses by Category" section. Verify that at least two category labels are visible in the chart. Verify the "Average Expense" stat card shows a dollar amount greater than $0.00. Verify the "Current Month" stat card shows a dollar amount greater than or equal to $0.00 and less than or equal to 'dashboard_total'.

## Verify monthly chart has data ✓ passed (35.4s)
md5: 03d46e5c0c837377c4627c4435b88fd1
Scroll to the "Monthly Expenses" section. Verify at least one month label is visible below the chart bars. Verify the chart area is not empty.

## Verify recent expenses table shows the latest entries ✗ failed (65.2s)
md5: 977e65e1ed792d1141147e99370fb1b4
Reason: Checkpoint assertion failed: "the first row (most recent) has a date that is today or within the last 30 days" — bug verdict: Recent expenses seed data is ahead of the test date [automation_bug/test_data_issue, confidence 0.90]
Scroll to the "Recent Expenses" section. Verify the table contains rows. Verify the first row (most recent) has a date that is today or within the last 30 days. Verify each row in the recent expenses table displays a date, description, category badge, payment method, and dollar amount.
