const STORAGE_KEY = 'expenseflow:lastMutation';

export function notifyDashboardMutation() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }
}

export function getLastMutationTime(): number {
  if (typeof window === 'undefined') return 0;
  const val = localStorage.getItem(STORAGE_KEY);
  return val ? Number(val) : 0;
}
