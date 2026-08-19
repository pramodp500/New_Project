'use client';

interface CategoryChartProps {
  data: { category: string; total: number }[];
}

const COLORS = ['#f97316', '#6366f1', '#8b5cf6', '#ef4444', '#ec4899', '#10b981', '#4f46e5', '#64748b'];
const CATEGORY_ICONS: Record<string, string> = {
  Food: '🍽',
  Travel: '✈️',
  Shopping: '🛍',
  Bills: '📄',
  Entertainment: '🎬',
  Healthcare: '🏥',
  Education: '📚',
  Other: '📦',
};

export default function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-400">
        No category data available
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-5">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-100">
        {(() => {
          let accumulated = 0;
          return data.map((item, index) => {
            const percentage = (item.total / total) * 100;
            const left = accumulated;
            accumulated += percentage;
            return (
              <div
                key={item.category}
                className="absolute top-0 h-full transition-all duration-500"
                style={{
                  left: `${left}%`,
                  width: `${percentage}%`,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
                title={`${item.category}: $${item.total.toFixed(2)} (${percentage.toFixed(1)}%)`}
              />
            );
          });
        })()}
      </div>
      <div className="space-y-2.5">
        {data.map((item, index) => {
          const percentage = ((item.total / total) * 100).toFixed(1);
          return (
            <div key={item.category} className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-700 truncate">
                  {CATEGORY_ICONS[item.category] || '📦'} {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-gray-900">${item.total.toFixed(2)}</span>
                <span className="text-xs font-medium text-gray-400 w-12 text-right">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
