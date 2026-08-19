---
mode: testing
url: http://localhost:3000/expenses/add
max_steps: 25
---

# Delete Expense — Confirm Dialog — Verify Removal

Verifies the full delete workflow: creating a test expense, cancelling delete, then confirming delete and verifying removal and dashboard total decrease.

## Create a test expense to delete
Open http://localhost:3000/expenses/add. Type "50.00" into the Amount input field. Select "Other" from the Category dropdown. Select today's date in the Date field. Select "Debit Card" from the Payment Method dropdown. Type "Expense to be deleted" into the Description textarea. Click the "Add Expense" submit button. Verify the success notification appears.

## Navigate to the expense list and find the test expense
Click the "Expenses" link in the sidebar. Verify a row containing "Expense to be deleted" is visible in the table. Store the current number of rows in the expense table as 'initial_row_count'.

## Click Delete and verify the confirmation dialog appears
Click the "Delete" button in the row containing "Expense to be deleted". Verify a confirmation dialog appears with the title "Delete Expense" and the message "Are you sure you want to delete this expense? This action cannot be undone." Verify the dialog has a "Cancel" button and a "Delete Expense" button.

## Cancel the deletion and verify expense still exists
Click the "Cancel" button in the confirmation dialog. Verify the dialog closes. Verify the row containing "Expense to be deleted" is still visible in the expense table. Verify the row count is still 'initial_row_count'.

## Confirm the deletion and verify the expense disappears
Click the "Delete" button in the row containing "Expense to be deleted" again. Click the "Delete Expense" button in the confirmation dialog. Verify a success notification appears with the text "Expense deleted successfully". Verify the row containing "Expense to be deleted" no longer appears in the expense table.

## Verify dashboard total decreased
Click the "Dashboard" link in the sidebar. Wait for the page to fully load. Store the dollar amount from the "Total Expenses" stat card as 'new_total'. Navigate back to the expense list. Verify the deleted expense is not present.
