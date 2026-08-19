---
mode: testing
url: http://localhost:3000/expenses
max_steps: 25
---

# Filter Expenses — Category and Date Range

Verifies that category and date range filters work correctly when applied, and that the Clear Filter button resets everything.

## Navigate to the expense list
Open http://localhost:3000/expenses. Wait for the expense table to fully load. Store the number of visible expense rows as 'total_before_filter'. Verify 'total_before_filter' is greater than 0.

## Filter by category and verify only matching expenses appear
Select "Food" from the Category dropdown in the filter panel. Click the "Apply Filter" button. Wait for the table to update. Verify that every visible row displays the category badge "Food". Verify the number of visible rows is less than 'total_before_filter'.

## Verify the category filter persists after page reload
Reload the page. Wait for the expense table to load. Verify the Category dropdown still shows "Food". Verify every visible row still displays the category badge "Food".

## Clear the filter and verify all expenses reappear
Click the "Clear Filter" button. Wait for the table to update. Verify the number of visible rows is back to 'total_before_filter'. Verify the Category dropdown shows "All Categories".

## Filter by date range
Select a date in the first week of the current month as the "Date From" value. Select a date in the last day of the current month as the "Date To" value. Click the "Apply Filter" button. Wait for the table to update. Verify that all visible expense rows have dates within the selected range.

## Clear the date filter
Click the "Clear Filter" button. Wait for the table to update. Verify the Date From and Date To fields are empty. Verify all expenses are visible again.

## Verify sort controls work
Click the "Amount" sort button. Click the "Ascending" sort button. Wait for the table to update. Verify the amounts in the table are sorted from lowest to highest. Click the "Descending" sort button. Wait for the table to update. Verify the amounts are now sorted from highest to lowest. Click the "Date" sort button and "Descending" sort button. Verify the table shows the most recent expenses first.
