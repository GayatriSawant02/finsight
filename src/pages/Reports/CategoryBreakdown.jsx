import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';

export default function CategoryBreakdown() {
  const { currentMonthTransactions, monthlyExpenses } = useTransactions();

  const data = useMemo(() => {
    if (monthlyExpenses === 0) return [];
    
    const totals = currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const colorMap = {
      'Food': 'text-emerald-500',
      'Travel': 'text-blue-500',
      'Shopping': 'text-orange-500',
      'Others': 'text-fuchsia-400'
    };

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        amount: `$${value.toLocaleString('en-US')}`,
        percent: `${Math.round((value / monthlyExpenses) * 100)}%`,
        secondary: colorMap[name] || 'text-gray-400'
      }))
      .sort((a,b) => b.value - a.value);
  }, [currentMonthTransactions, monthlyExpenses]);

  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] flex flex-col h-full col-span-1 lg:col-span-5 relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-semibold text-white">Category-wise Breakdown</h3>
        <button className="text-gray-500 hover:text-white">
           <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between flex-1 gap-8">
        {/* Chart Column */}
        <div className="relative w-full lg:w-1/2 h-[200px] lg:h-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#A855F7" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total Spend</span>
            <span className="text-2xl font-bold text-white">${(monthlyExpenses / 1000).toFixed(1)}k</span>
          </div>
        </div>

        {/* Legend Column */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-y-6 gap-x-4">
          {data.length === 0 && <span className="text-gray-500 text-sm">No expenses found</span>}
          {data.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start">
               <div className={`w-6 h-6 rounded bg-[#1A233A] flex items-center justify-center flex-shrink-0 border border-[#2A344A]`}>
                  <div className={`w-2 h-2 rounded-full bg-current ${item.secondary}`}></div>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-400 tracking-wider mb-0.5">{item.name}</span>
                 <span className="text-lg font-bold text-white leading-tight">{item.percent}</span>
                 <span className="text-[10px] text-gray-500 hidden lg:block mt-0.5">({item.amount})</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
