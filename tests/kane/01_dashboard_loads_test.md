---
mode: testing
url: http://localhost:3000/dashboard
max_steps: 20
---

# Dashboard loads and displays real data

## Navigate to the dashboard
Open http://localhost:3000/dashboard. Wait for the page to fully load and confirm the URL contains "/dashboard".

## Verify stat cards are visible and show non-zero values
Verify that four stat cards are visible on the page: "Total Expenses", "Current Month", "Number of Expenses", and "Average Expense". Verify that the "Total Expenses" card displays a dollar amount greater than $0.00. Verify that the "Number of Expenses" card displays a number greater than 0.

## Verify category chart is rendered
Verify that the "Expenses by Category" section is visible on the page. Verify that at least one category label (such as "Food", "Travel", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", or "Other") is visible within the category chart section.

## Verify monthly chart is rendered
Verify that the "Monthly Expenses" section is visible on the page. Verify that the bar chart area contains at least one bar or data point representing a month.

## Verify recent expenses table has entries
Verify that the "Recent Expenses" section is visible. Verify that the table within this section contains at least one row with expense data (a date, description, category badge, payment method, and dollar amount). Verify that the "View All" link is visible next to the "Recent Expenses" heading.

## Verify sidebar navigation works
Click the "Expenses" link in the sidebar navigation. Verify the URL changes to contain "/expenses". Then click the "Dashboard" link in the sidebar. Verify the URL changes back to contain "/dashboard" and the stat cards are visible again.
