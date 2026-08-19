import { NextRequest } from 'next/server';
import { getExpenseById, updateExpense, deleteExpense } from '@/lib/db';
import { validateExpense } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const expense = getExpenseById(Number(id));

  if (!expense) {
    return Response.json({ error: 'Expense not found' }, { status: 404 });
  }

  return Response.json(expense);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const errors = validateExpense(body);

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const expense = updateExpense(Number(id), {
      amount: Number(body.amount),
      category: body.category,
      description: body.description.trim(),
      date: body.date,
      paymentMethod: body.paymentMethod,
    });

    if (!expense) {
      return Response.json({ error: 'Expense not found' }, { status: 404 });
    }

    return Response.json(expense);
  } catch {
    return Response.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteExpense(Number(id));

  if (!deleted) {
    return Response.json({ error: 'Expense not found' }, { status: 404 });
  }

  return Response.json({ success: true });
}
