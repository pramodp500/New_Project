---
test: ../03_add_invalid_expense_test.md
status: failed
started: 2026-08-17T19:25:01.699Z
duration_s: 70
session_id: 965075e6-3670-4e76-88db-6525daeee1ad
---

# Add Invalid Expense — Validation Errors — Result

## Open the Add Expense page ✓ passed (29.2s)
md5: 5618f9a3eda5d81b0194d0ce88928f35
Open http://localhost:3000/expenses/add. Wait for the page to fully load. Verify the expense form is visible with Amount, Category, Date, Payment Method, and Description fields.

## Submit the empty form and verify all validation errors ✗ failed (36.2s)
md5: 418ec5b1fe570a1bd3cda89f06e97d7e
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Submit click targeted description field instead of Add Expense button [automation_bug/agent_misstep, confidence 0.92]
Click the "Add Expense" submit button without filling in any fields. Verify that a validation error message "Amount is required" appears on the page. Verify that a validation error message "Category is required" appears on the page. Verify that a validation error message "Description is required" appears on the page. Verify that a validation error message "Payment method is required" appears on the page. Verify that no expense was created (the URL should still be "/expenses/add" and no success notification should appear).

## Submit a negative amount and verify the error ⏭ skipped

## Submit zero amount and verify the error ⏭ skipped

## Submit a description shorter than 3 characters and verify the error ⏭ skipped

## Verify blur validation works on individual fields ⏭ skipped

## Verify Cancel button returns to expense list ⏭ skipped
