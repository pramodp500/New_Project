---
mode: testing
url: http://localhost:3000/expenses
max_steps: 25
---

# Edit Expense — Verify Updated Amount

Verifies that editing an existing expense updates the data correctly and the change persists.

## Navigate to the expense list
Open http://localhost:3000/expenses. Wait for the page to fully load. Verify that the expense table contains at least one row.

## Record the first expense's current data
Store the description text from the first row in the expense table as 'original_description'. Store the dollar amount from the first row as 'original_amount'. Click the "Edit" link in the first row of the expense table. Verify the URL changes to contain "/expenses/edit/".

## Modify the expense amount
Verify the form is pre-filled with the original expense data. Clear the Amount input field and type "999.99" into it. Verify the Description field still contains 'original_description'.

## Save the edited expense
Click the "Save Expense" submit button. Verify a success notification appears with the text "Expense updated successfully". Wait for the redirect to complete.

## Verify the updated amount appears in the expense list
Verify the URL contains "/expenses". Verify the first row in the expense table still shows 'original_description'. Verify the first row now displays the amount "$999.99" instead of 'original_amount'.

## Verify the edit persists after reload
Reload the page. Wait for the expense table to load. Verify the first row still shows "999.99" as the amount.

## Clean up — restore original amount
Click the "Edit" link in the first row. Clear the Amount input field and type the original dollar amount (without the "$" sign) back into it. Click the "Save Expense" submit button. Wait for the redirect to the expense list. Verify the first row displays the restored 'original_amount' value.
