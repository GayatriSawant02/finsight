import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function CategoryBreakdown() {
  const { currentMonthTransactions, monthlyExpenses } = useTransactions();
  const { themeClasses } = useTheme();

  const data = useMemo(() => {
    if (monthlyExpenses === 0) return [];
    
    const totals = currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const colorMap = {
      'Food': '#10B981', // emerald
      'Travel': '#3B82F6', // blue
      'Shopping': '#F59E0B', // orange
      'Others': '#EC4899' // fuchsia
    };

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        amount: `$${value.toLocaleString('en-US')}`,
        percent: `${Math.round((value / monthlyExpenses) * 100)}%`,
        color: colorMap[name] || '#64748B',
        secondary: `text-[${colorMap[name] || '#64748B'}]`
      }))
      .sort((a,b) => b.value - a.value);
  }, [currentMonthTransactions, monthlyExpenses]);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-4 lg:p-6 border ${themeClasses.cardBorder} flex flex-col h-full relative`}>
      <div className="flex justify-between items-center mb-8">
        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Category-wise Breakdown</h3>
        <button className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary}`}>
           <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between flex-1 gap-6 lg:gap-8">
        {/* Chart Column */}
        <div className="relative w-full lg:w-1/2 h-[250px] lg:h-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                label={({ percent }) => percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : ''}
                labelStyle={{ fill: '#FFFFFF', fontSize: '12px', fontWeight: 'bold' }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-[10px] ${themeClasses.textMuted} font-bold uppercase tracking-wider mb-1`}>Total Spend</span>
            <span className={`text-2xl font-bold ${themeClasses.textPrimary}`}>${(monthlyExpenses / 1000).toFixed(1)}k</span>
          </div>
        </div>

        {/* Legend Column */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-4">
          {data.length === 0 && <span className={`text-sm ${themeClasses.textMuted}`}>No expenses found</span>}
          {data.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start">
               <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color }}>
               </div>
               <div className="flex flex-col">
                 <span className={`text-[10px] ${themeClasses.textMuted} tracking-wider mb-0.5`}>{item.name}</span>
                 <span className={`text-lg font-bold ${themeClasses.textPrimary} leading-tight`}>{item.percent}</span>
                 <span className={`text-[10px] ${themeClasses.textMuted} hidden lg:block mt-0.5`}>{item.amount}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
