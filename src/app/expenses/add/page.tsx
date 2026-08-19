'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ExpenseForm from '@/components/ExpenseForm';
import Notification from '@/components/Notification';
import type { ExpenseFormData } from '@/lib/types';
import { notifyDashboardMutation } from '@/lib/mutations';

export default function AddExpensePage() {
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = useCallback(async (data: ExpenseFormData) => {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result.errors) {
        throw { errors: result.errors };
      }
      throw { errors: [{ field: 'general', message: 'Failed to create expense' }] };
    }

    setNotification({ message: 'Expense added successfully', type: 'success' });
    notifyDashboardMutation();
    setResetKey((k) => k + 1);
  }, []);

  const handleCancel = useCallback(() => {
    router.push('/expenses');
  }, [router]);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ExpenseForm
          onSubmit={handleSubmit}
          submitLabel="Add Expense"
          cancelLabel="Cancel"
          onCancel={handleCancel}
          resetKey={resetKey}
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
