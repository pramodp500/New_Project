import { NextRequest } from 'next/server';
import { getAllExpenses, createExpense } from '@/lib/db';
import { validateExpense } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;
  const dateFrom = searchParams.get('dateFrom') || undefined;
  const dateTo = searchParams.get('dateTo') || undefined;
  const sortBy = searchParams.get('sortBy') || undefined;
  const sortOrder = searchParams.get('sortOrder') || undefined;

  const expenses = getAllExpenses({ search, category, dateFrom, dateTo, sortBy, sortOrder });
  return Response.json(expenses);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors = validateExpense(body);

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const expense = createExpense({
      amount: Number(body.amount),
      category: body.category,
      description: body.description.trim(),
      date: body.date,
      paymentMethod: body.paymentMethod,
    });

    return Response.json(expense, { status: 201 });
  } catch {
    return Response.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}
