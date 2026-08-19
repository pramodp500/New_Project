---
test: ../07_filter_expenses_test.md
status: failed
started: 2026-08-17T19:36:57.722Z
duration_s: 194
session_id: e65c7368-8d06-4dfd-b8c4-d02faaba2298
---

# Filter Expenses — Category and Date Range — Result

## Navigate to the expense list ✓ passed (50.9s)
md5: 50225d7be8db68ac3ffcd24547771f8e
Open http://localhost:3000/expenses. Wait for the expense table to fully load. Store the number of visible expense rows as 'total_before_filter'. Verify 'total_before_filter' is greater than 0.

## Filter by category and verify only matching expenses appear ✓ passed (46.1s)
md5: 59f5541417725eb798c5985e4b5f9185
Select "Food" from the Category dropdown in the filter panel. Click the "Apply Filter" button. Wait for the table to update. Verify that every visible row displays the category badge "Food". Verify the number of visible rows is less than 'total_before_filter'.

## Verify the category filter persists after page reload ✗ failed (89.6s)
md5: 8293db2816cfcd3f59e7a1df27ffe803
Reason: Checkpoint assertion failed: "the Category dropdown still shows "Food"" — bug verdict: Category filter persistence assumed across page reload [automation_bug/state_transition_bug, confidence 0.81]
Reload the page. Wait for the expense table to load. Verify the Category dropdown still shows "Food". Verify every visible row still displays the category badge "Food".

## Clear the filter and verify all expenses reappear ⏭ skipped

## Filter by date range ⏭ skipped

## Clear the date filter ⏭ skipped

## Verify sort controls work ⏭ skipped
