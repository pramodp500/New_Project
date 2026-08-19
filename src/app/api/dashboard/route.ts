import { getDashboardStats } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = getDashboardStats();
    return Response.json(stats);
  } catch {
    return Response.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
