'use client';

interface MonthlyChartProps {
  data: { month: string; total: number }[];
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-400">
        No monthly data available
      </div>
    );
  }

  const maxTotal = Math.max(...data.map((item) => item.total));

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const percentage = maxTotal > 0 ? (item.total / maxTotal) * 100 : 0;
        const monthDate = new Date(item.month + '-01');
        const monthLabel = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const isCurrentMonth = item.month === new Date().toISOString().slice(0, 7);

        return (
          <div key={item.month} className="group flex items-center gap-4">
            <span className={`w-20 text-xs font-medium ${isCurrentMonth ? 'text-indigo-600' : 'text-gray-500'}`}>
              {monthLabel}
            </span>
            <div className="flex-1">
              <div className="h-7 w-full overflow-hidden rounded-md bg-gray-100/80">
                <div
                  className={`h-full rounded-md transition-all duration-500 ${
                    isCurrentMonth
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-400'
                      : 'bg-gradient-to-r from-gray-300 to-gray-200 group-hover:from-indigo-400 group-hover:to-indigo-300'
                  }`}
                  style={{ width: `${Math.max(percentage, 2)}%` }}
                />
              </div>
            </div>
            <span className={`w-24 text-right text-xs font-semibold ${isCurrentMonth ? 'text-indigo-600' : 'text-gray-700'}`}>
              ${item.total.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
