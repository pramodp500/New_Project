'use client';

import { useState, useEffect } from 'react';
import type { ExpenseFormData, ValidationError } from '@/lib/types';
import { CATEGORIES, PAYMENT_METHODS } from '@/lib/types';
import { validateExpense } from '@/lib/validations';

interface ExpenseFormProps {
  initialData?: ExpenseFormData;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  submitLabel: string;
  cancelLabel?: string;
  onCancel?: () => void;
  resetKey?: number;
  onSuccess?: () => void;
}

const EMPTY_FORM: ExpenseFormData = {
  amount: 0,
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  paymentMethod: '',
};

export default function ExpenseForm({
  initialData,
  onSubmit,
  submitLabel,
  cancelLabel = 'Cancel',
  onCancel,
  resetKey,
  onSuccess,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (resetKey !== undefined) {
      setFormData(initialData || { ...EMPTY_FORM, date: new Date().toISOString().split('T')[0] });
      setErrors([]);
      setTouched({});
    }
  }, [resetKey, initialData]);

  const getFieldError = (field: string) => {
    return errors.find((e) => e.field === field)?.message;
  };

  const hasError = (field: string) => !!getFieldError(field);

  const inputBase =
    'mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0';

  const inputNormal = `${inputBase} border-gray-200 bg-white hover:border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20`;
  const inputError = `${inputBase} border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? (value === '' ? 0 : Number(value)) : value,
    }));
    if (touched[name]) {
      setErrors((prev) => prev.filter((err) => err.field !== name));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const clientErrors = validateExpense(formData);
    const fieldError = clientErrors.find((e) => e.field === field);
    setErrors((prev) => {
      const withoutThisField = prev.filter((e) => e.field !== field);
      return fieldError ? [...withoutThisField, fieldError] : withoutThisField;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setTouched({
      amount: true,
      category: true,
      description: true,
      date: true,
      paymentMethod: true,
    });

    const clientErrors = validateExpense(formData);
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({ ...EMPTY_FORM, date: new Date().toISOString().split('T')[0] });
      setErrors([]);
      setTouched({});
      onSuccess?.();
    } catch (error) {
      if (error && typeof error === 'object' && 'errors' in error) {
        setErrors((error as { errors: ValidationError[] }).errors);
      } else {
        setErrors([{ field: 'general', message: 'Something went wrong. Please try again.' }]);
      }
    }

    setIsSubmitting(false);
  };

  const ErrorMsg = ({ field }: { field: string }) => {
    const msg = getFieldError(field);
    if (!msg) return null;
    return (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600" role="alert" data-testid={`error-${field}`}>
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        {msg}
      </p>
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400" aria-hidden="true">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              inputMode="decimal"
              value={formData.amount || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('amount')}
              className={`${hasError('amount') ? inputError : inputNormal} pl-8`}
              placeholder="0.00"
              aria-required="true"
              aria-invalid={hasError('amount')}
              aria-describedby={hasError('amount') ? 'amount-error' : undefined}
            />
          </div>
          {hasError('amount') && <ErrorMsg field="amount" />}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={() => handleBlur('category')}
            className={hasError('category') ? inputError : inputNormal}
            aria-required="true"
            aria-invalid={hasError('category')}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {hasError('category') && <ErrorMsg field="category" />}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={() => handleBlur('date')}
            className={hasError('date') ? inputError : inputNormal}
            aria-required="true"
            aria-invalid={hasError('date')}
          />
          {hasError('date') && <ErrorMsg field="date" />}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method <span className="text-red-500">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            onBlur={() => handleBlur('paymentMethod')}
            className={hasError('paymentMethod') ? inputError : inputNormal}
            aria-required="true"
            aria-invalid={hasError('paymentMethod')}
          >
            <option value="">Select payment method</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {hasError('paymentMethod') && <ErrorMsg field="paymentMethod" />}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur('description')}
          className={`${hasError('description') ? inputError : inputNormal} resize-none`}
          placeholder="Enter a detailed description of the expense..."
          aria-required="true"
          aria-invalid={hasError('description')}
        />
        {hasError('description') && <ErrorMsg field="description" />}
      </div>

      {hasError('general') && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3" role="alert">
          <p className="text-sm text-red-700">{getFieldError('general')}</p>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
