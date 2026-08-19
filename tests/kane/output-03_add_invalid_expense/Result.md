---
test: ../03_add_invalid_expense_test.md
status: failed
started: 2026-08-19T20:59:20.436Z
duration_s: 110
session_id: 49ef034a-077f-4abd-8fac-a856b6db6cd1
---

# Add Invalid Expense — Validation Errors — Result

## Open the Add Expense page ✓ passed (2.2s)
md5: 5618f9a3eda5d81b0194d0ce88928f35
Open http://localhost:3000/expenses/add. Wait for the page to fully load. Verify the expense form is visible with Amount, Category, Date, Payment Method, and Description fields.

## Submit the empty form and verify all validation errors ✗ failed (100.7s)
md5: 418ec5b1fe570a1bd3cda89f06e97d7e
Reason: Checkpoint assertion failed: "a validation error message "Amount is required" appears on the page" — bug verdict: Amount validation assertion mismatches prefilled 0.00 field [automation_bug/state_transition_bug, confidence 0.93]
Click the "Add Expense" submit button without filling in any fields. Verify that a validation error message "Amount is required" appears on the page. Verify that a validation error message "Category is required" appears on the page. Verify that a validation error message "Description is required" appears on the page. Verify that a validation error message "Payment method is required" appears on the page. Verify that no expense was created (the URL should still be "/expenses/add" and no success notification should appear).

## Submit a negative amount and verify the error ⏭ skipped

## Submit zero amount and verify the error ⏭ skipped

## Submit a description shorter than 3 characters and verify the error ⏭ skipped

## Verify blur validation works on individual fields ⏭ skipped

## Verify Cancel button returns to expense list ⏭ skipped
