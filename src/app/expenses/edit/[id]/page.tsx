'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ExpenseForm from '@/components/ExpenseForm';
import Notification from '@/components/Notification';
import type { ExpenseFormData } from '@/lib/types';
import { notifyDashboardMutation } from '@/lib/mutations';

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [initialData, setInitialData] = useState<ExpenseFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function fetchExpense() {
      try {
        const res = await fetch(`/api/expenses/${id}`);
        if (!res.ok) {
          setNotification({ message: 'Expense not found', type: 'error' });
          return;
        }
        const data = await res.json();
        setInitialData({
          amount: data.amount,
          category: data.category,
          description: data.description,
          date: data.date,
          paymentMethod: data.paymentMethod,
        });
      } catch {
        setNotification({ message: 'Failed to load expense', type: 'error' });
      } finally {
        setLoading(false);
      }
    }

    fetchExpense();
  }, [id]);

  const handleSubmit = useCallback(async (data: ExpenseFormData) => {
    const res = await fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result.errors) {
        throw { errors: result.errors };
      }
      throw { errors: [{ field: 'general', message: 'Failed to update expense' }] };
    }

    setNotification({ message: 'Expense updated successfully', type: 'success' });
    notifyDashboardMutation();
    setTimeout(() => {
      router.push('/expenses');
    }, 1500);
  }, [id, router]);

  const handleCancel = useCallback(() => {
    router.push('/expenses');
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent" />
          <p className="mt-3 text-sm text-gray-500">Loading expense...</p>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">Expense Not Found</h3>
          <p className="mt-1.5 text-sm text-gray-500">The expense you are trying to edit does not exist.</p>
          <button
            onClick={handleCancel}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Back to Expenses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ExpenseForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Expense"
          cancelLabel="Cancel"
          onCancel={handleCancel}
        />
      </div>

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
