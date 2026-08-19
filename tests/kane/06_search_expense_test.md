---
mode: testing
url: http://localhost:3000/expenses
max_steps: 20
---

# Search Expense — Verify Matching Results

Verifies that the search input filters expenses by description and category in real time.

## Navigate to the expense list
Open http://localhost:3000/expenses. Wait for the expense table to fully load. Verify that multiple expense rows are visible in the table.

## Record the total number of expenses before search
Count the number of data rows in the expense table (excluding the header row) and store it as 'total_before_search'. Verify 'total_before_search' is greater than 0.

## Search for a known description keyword
Type "Lunch" into the search input field labeled "Search Expenses". Wait for the table to update. Verify the number of visible rows is less than 'total_before_search'. Verify that every visible row in the table contains the word "Lunch" in its description column.

## Search for a category name
Clear the search input. Type "Travel" into the search input. Wait for the table to update. Verify that every visible row displays the category badge "Travel".

## Search for a term with no matches
Clear the search input. Type "xyznonexistent123" into the search input. Wait for the table to update. Verify that the empty state message "No expenses found" is visible. Verify the message "Try changing your search or filters." is displayed.

## Clear the search and verify all expenses reappear
Clear the search input field completely. Wait for the table to update. Verify the number of visible rows is back to 'total_before_search'. Verify all original expense rows are visible again.

## Verify the search is case-insensitive
Type "lunch" (lowercase) into the search input. Wait for the table to update. Verify that rows containing "Lunch" (with capital L) are still visible in the results.
