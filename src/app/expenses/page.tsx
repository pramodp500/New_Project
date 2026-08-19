'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ExpenseTable from '@/components/ExpenseTable';
import ConfirmDialog from '@/components/ConfirmDialog';
import Notification from '@/components/Notification';
import type { Expense } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { notifyDashboardMutation } from '@/lib/mutations';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Instant search — updates on every keystroke
  const [search, setSearch] = useState('');

  // Pending filters — only applied when "Apply Filter" is clicked
  const [pendingCategory, setPendingCategory] = useState('');
  const [pendingDateFrom, setPendingDateFrom] = useState('');
  const [pendingDateTo, setPendingDateTo] = useState('');

  // Active filters — sent to the API
  const [activeCategory, setActiveCategory] = useState('');
  const [activeDateFrom, setActiveDateFrom] = useState('');
  const [activeDateTo, setActiveDateTo] = useState('');

  // Sorting — always immediate
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchExpenses = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (activeCategory) params.set('category', activeCategory);
      if (activeDateFrom) params.set('dateFrom', activeDateFrom);
      if (activeDateTo) params.set('dateTo', activeDateTo);
      if (sortBy) params.set('sortBy', sortBy);
      if (sortOrder) params.set('sortOrder', sortOrder);

      const res = await fetch(`/api/expenses?${params.toString()}`);
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory, activeDateFrom, activeDateTo, sortBy, sortOrder]);

  // Fetch on mount and when any active filter/sort changes
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/expenses/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setNotification({ message: 'Expense deleted successfully', type: 'success' });
        notifyDashboardMutation();
        fetchExpenses();
      } else {
        setNotification({ message: 'Failed to delete expense', type: 'error' });
      }
    } catch {
      setNotification({ message: 'Failed to delete expense', type: 'error' });
    } finally {
      setDeleteId(null);
    }
  }

  function applyFilters() {
    setActiveCategory(pendingCategory);
    setActiveDateFrom(pendingDateFrom);
    setActiveDateTo(pendingDateTo);
  }

  function clearFilters() {
    setSearch('');
    setPendingCategory('');
    setPendingDateFrom('');
    setPendingDateTo('');
    setActiveCategory('');
    setActiveDateFrom('');
    setActiveDateTo('');
    setSortBy('date');
    setSortOrder('desc');
  }

  const hasActiveFilters = search !== '' || activeCategory !== '' || activeDateFrom !== '' || activeDateTo !== '';

  const inputClasses =
    'mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <Link
          href="/expenses/add"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Expense
        </Link>
      </div>

      {/* Filter Panel */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Row 1: Search (instant) */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search Expenses
          </label>
          <div className="relative mt-1.5">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputClasses} pl-9`}
              placeholder="Search by description or category..."
            />
          </div>
        </div>

        {/* Row 2: Category, Date From, Date To, Apply, Clear */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="filterCategory" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="filterCategory"
              value={pendingCategory}
              onChange={(e) => setPendingCategory(e.target.value)}
              className={inputClasses}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
              Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              value={pendingDateFrom}
              onChange={(e) => setPendingDateFrom(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
              Date To
            </label>
            <input
              type="date"
              id="dateTo"
              value={pendingDateTo}
              onChange={(e) => setPendingDateTo(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={applyFilters}
              className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              Apply Filter
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filter
            </button>
          </div>
        </div>

        {/* Row 3: Sorting controls */}
        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
          <span className="text-sm font-medium text-gray-500">Sort by:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === 'date'
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Date
            </button>
            <button
              onClick={() => setSortBy('amount')}
              className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === 'amount'
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Amount
            </button>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder('asc')}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortOrder === 'asc'
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Ascending
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortOrder === 'desc'
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Descending
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent" />
            <p className="mt-3 text-sm text-gray-500">Loading expenses...</p>
          </div>
        </div>
      ) : (
        <ExpenseTable
          expenses={expenses}
          onDelete={setDeleteId}
          hasActiveFilters={hasActiveFilters}
        />
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
