'use client';

import { usePathname } from 'next/navigation';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your financial activity' },
  '/expenses': { title: 'Expenses', subtitle: 'Manage and track all your expenses' },
  '/expenses/add': { title: 'Add Expense', subtitle: 'Record a new expense entry' },
  '/reports': { title: 'Reports', subtitle: 'Detailed analytics and insights' },
};

export default function TopHeader() {
  const pathname = usePathname();

  let pageInfo = pageTitles[pathname];
  if (!pageInfo) {
    if (pathname.startsWith('/expenses/edit/')) {
      pageInfo = { title: 'Edit Expense', subtitle: 'Update expense information' };
    } else if (pathname.match(/^\/expenses\/\d+$/)) {
      pageInfo = { title: 'Expense Details', subtitle: 'View expense information' };
    } else {
      pageInfo = { title: 'ExpenseFlow AI', subtitle: '' };
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-8 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{pageInfo.title}</h1>
        {pageInfo.subtitle && (
          <p className="text-sm text-gray-500">{pageInfo.subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <label htmlFor="header-search" className="sr-only">Search expenses</label>
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            id="header-search"
            placeholder="Search..."
            className="h-9 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Notifications"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
            J
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Jordan Lee</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
