---
mode: testing
url: http://localhost:3000/dashboard
max_steps: 30
---

# Dashboard Total Calculation — Cross-Verify with Expense List

Verifies that the dashboard "Total Expenses" stat card matches the sum of all expenses in the database by comparing the dashboard value with the visible expense list data.

## Record the dashboard total
Open http://localhost:3000/dashboard. Wait for the page to fully load. Store the dollar amount from the "Total Expenses" stat card as 'dashboard_total'. Store the number from the "Number of Expenses" stat card as 'dashboard_count'. Verify 'dashboard_count' is greater than 0.

## Navigate to the full expense list
Click the "Expenses" link in the sidebar. Wait for the expense table to load. Verify the table contains expense rows.

## Verify the expense count matches the dashboard
Count the number of expense rows in the table and store it as 'list_count'. Verify that 'list_count' equals 'dashboard_count'. If they differ, it means the dashboard count and the actual list count are out of sync.

## Verify the category breakdown adds up
Navigate back to the dashboard. Scroll to the "Expenses by Category" section. Verify that at least two category labels are visible in the chart. Verify the "Average Expense" stat card shows a dollar amount greater than $0.00. Verify the "Current Month" stat card shows a dollar amount greater than or equal to $0.00 and less than or equal to 'dashboard_total'.

## Verify monthly chart has data
Scroll to the "Monthly Expenses" section. Verify at least one month label is visible below the chart bars. Verify the chart area is not empty.

## Verify recent expenses table shows the latest entries
Scroll to the "Recent Expenses" section. Verify the table contains rows. Verify the first row (most recent) has a date that is today or within the last 30 days. Verify each row in the recent expenses table displays a date, description, category badge, payment method, and dollar amount.
