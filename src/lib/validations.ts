import { CATEGORIES, PAYMENT_METHODS } from './types';
import type { ExpenseFormData } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateExpense(data: ExpenseFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.amount === undefined || data.amount === null || isNaN(data.amount)) {
    errors.push({ field: 'amount', message: 'Amount is required' });
  } else if (data.amount <= 0) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' });
  }

  if (!data.category || data.category.trim() === '') {
    errors.push({ field: 'category', message: 'Category is required' });
  } else if (!CATEGORIES.includes(data.category as typeof CATEGORIES[number])) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  if (!data.description || data.description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (data.description.trim().length < 3) {
    errors.push({ field: 'description', message: 'Description must contain at least 3 characters' });
  }

  if (!data.date || data.date.trim() === '') {
    errors.push({ field: 'date', message: 'Date is required' });
  }

  if (!data.paymentMethod || data.paymentMethod.trim() === '') {
    errors.push({ field: 'paymentMethod', message: 'Payment method is required' });
  } else if (!PAYMENT_METHODS.includes(data.paymentMethod as typeof PAYMENT_METHODS[number])) {
    errors.push({ field: 'paymentMethod', message: 'Payment method is required' });
  }

  return errors;
}
