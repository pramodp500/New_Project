---
mode: testing
url: http://localhost:3000/dashboard
max_steps: 30
---

# Add Expense — Verify Expense Appears — Verify Dashboard Total Updates

This is the primary end-to-end smoke test. It creates a new expense, confirms it appears in the expense list, then verifies the dashboard total has increased by the exact amount added.

## Record the current dashboard total
Open http://localhost:3000/dashboard. Wait for the page to fully load. Store the dollar amount displayed in the "Total Expenses" stat card as 'initial_total'. Confirm the value starts with a "$" sign and contains a numeric amount.

## Navigate to the Add Expense page
Click the "Add Expense" button on the dashboard. Verify the URL changes to contain "/expenses/add". Verify the expense form is visible with fields for Amount, Category, Date, Payment Method, and Description.

## Fill in the expense form with valid data
Type "77.77" into the Amount input field. Select "Food" from the Category dropdown. Select today's date in the Date input field (if not already pre-filled with today). Select "Cash" from the Payment Method dropdown. Type "Kane automated test expense" into the Description textarea.

## Submit the expense and verify success
Click the "Add Expense" submit button. Verify that a success notification toast appears with the text "Expense added successfully". Verify the form resets: the Amount field should show empty or "0.00", the Category dropdown should show "Select a category", and the Description textarea should be empty.

## Navigate to the expense list and verify the new expense appears
Click the "Expenses" link in the sidebar navigation. Verify the URL changes to contain "/expenses". Verify that a table row containing the text "Kane automated test expense" is visible in the expense list. Verify that the row displays the category "Food", the payment method "Cash", and the amount "$77.77".

## Navigate to the dashboard and verify the total increased
Click the "Dashboard" link in the sidebar navigation. Wait for the page to fully load. Store the dollar amount displayed in the "Total Expenses" stat card as 'updated_total'. Verify that 'updated_total' is a larger dollar amount than 'initial_total'. Verify that the "Number of Expenses" stat card shows a count one higher than before the expense was added.

## Verify the expense persists after page reload
Reload the current page. Wait for the page to fully load. Verify the "Total Expenses" stat card still displays the same 'updated_total' value. Click the "Expenses" link in the sidebar. Verify the row with "Kane automated test expense" is still visible in the expense list.

## Clean up — delete the test expense
In the expense list, find the row containing "Kane automated test expense" and click the "Delete" button in that row. Verify a confirmation dialog appears with the text "Are you sure you want to delete this expense?" Click the "Delete Expense" button in the confirmation dialog. Verify the row with "Kane automated test expense" disappears from the table.
