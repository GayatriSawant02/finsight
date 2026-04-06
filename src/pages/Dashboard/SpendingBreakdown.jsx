import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function SpendingBreakdown() {
  const { currentMonthTransactions, monthlyExpenses } = useTransactions();
  const { themeClasses } = useTheme();

  const data = useMemo(() => {
    if (monthlyExpenses === 0) return [];
    
    // Group only expenses by category
    const totals = currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const colors = {
      'Food': '#F97316', // orange-500
      'Travel': '#3B82F6', // blue-500
      'Shopping': '#10B981', // emerald-500
      'Others': '#8B5CF6' // violet-500
    };

    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || '#6B7280'
    }));
  }, [currentMonthTransactions, monthlyExpenses]);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} flex flex-col h-[350px]`}>
      <div className="mb-2">
        <h3 className={`font-semibold ${themeClasses.textPrimary}`}>Spending Breakdown</h3>
        <p className={`text-xs ${themeClasses.textSecondary}`}>Capital allocation by type</p>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            ${(monthlyExpenses / 1000).toFixed(1)}k
          </span>
          <span className={`text-[10px] ${themeClasses.textMuted} font-medium uppercase tracking-wider`}>Current Month</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
            <span className={themeClasses.textSecondary}>{item.name} ({Math.round(item.value / monthlyExpenses * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
