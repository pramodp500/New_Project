---
mode: testing
url: http://localhost:3000/dashboard
max_steps: 30
---

# Dashboard Total Updates After Adding Expense

Verifies that when a new expense is added, the dashboard "Total Expenses" value reflects the new total including that expense.

## Record the current dashboard total
Open http://localhost:3000/dashboard. Wait for the page to fully load. Store the dollar amount from the "Total Expenses" stat card as 'dashboard_total_before'. Verify 'dashboard_total_before' is greater than $0.00. Store the number from the "Number of Expenses" stat card as 'count_before'. Verify 'count_before' is greater than 0.

## Add a new expense
Click the "Add Expense" link in the sidebar. Wait for the form to load. Fill the "Amount" field with "999.99". Fill the "Description" field with "Kane CLI test expense for verification". Select "Food" from the category dropdown. Select today's date in the date field. Select "Cash" from the payment method dropdown. Click the "Save" or "Submit" button. Verify the page navigates away from the form (indicating successful submission).

## Navigate back to dashboard
Click the "Dashboard" link in the sidebar. Wait for the page to fully load and for the stat cards to render.

## Verify the total updated
Store the dollar amount from the "Total Expenses" stat card as 'dashboard_total_after'. The 'dashboard_total_after' value MUST be greater than 'dashboard_total_before'. If 'dashboard_total_after' equals 'dashboard_total_before', the total did not update after adding the expense — this is a failure.

## Verify the count updated
Store the number from the "Number of Expenses" stat card as 'count_after'. Verify that 'count_after' equals 'count_before' + 1. The count must increase by exactly 1 after adding one expense.
