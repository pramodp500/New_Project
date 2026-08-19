---
mode: testing
url: http://localhost:3000/expenses/add
max_steps: 25
---

# Add Invalid Expense — Validation Errors

Verifies that the form rejects invalid submissions and displays the correct validation messages for each field.

## Open the Add Expense page
Open http://localhost:3000/expenses/add. Wait for the page to fully load. Verify the expense form is visible with Amount, Category, Date, Payment Method, and Description fields.

## Submit the empty form and verify all validation errors
Clear the Amount input field to remove any pre-filled value. Click the "Add Expense" submit button without filling in any fields. Verify that a validation error message "Amount is required" appears on the page. Verify that a validation error message "Category is required" appears on the page. Verify that a validation error message "Description is required" appears on the page. Verify that a validation error message "Payment method is required" appears on the page. Verify that no expense was created (the URL should still be "/expenses/add" and no success notification should appear).

## Submit a negative amount and verify the error
Type "-50" into the Amount input field. Type "Test negative amount" into the Description textarea. Select "Food" from the Category dropdown. Select "Cash" from the Payment Method dropdown. Click the "Add Expense" submit button. Verify that a validation error message "Amount must be greater than 0" appears on the page. Verify the form was not submitted successfully (no success notification).

## Submit zero amount and verify the error
Clear the Amount input field and type "0" into it. Click the "Add Expense" submit button. Verify that a validation error message "Amount must be greater than 0" appears on the page.

## Submit a description shorter than 3 characters and verify the error
Clear the Amount field and type "25" into it. Clear the Description textarea and type "ab" into it. Click the "Add Expense" submit button. Verify that a validation error message "Description must contain at least 3 characters" appears on the page.

## Verify blur validation works on individual fields
Clear all fields. Click the Amount input field and then click away from it (blur). Verify that the "Amount is required" error message appears for the amount field. Click the Description textarea and type "x", then click away. Verify that the "Description must contain at least 3 characters" error message appears for the description field.

## Verify Cancel button returns to expense list
Click the "Cancel" button. Verify the URL changes to contain "/expenses".
