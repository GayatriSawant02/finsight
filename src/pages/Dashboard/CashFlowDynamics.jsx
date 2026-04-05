import { useMemo } from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useTransactions } from '../../context/TransactionsContext';

export default function CashFlowDynamics() {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    
    const monthlyBuckets = {
       'Sep': { name: 'Sep', income: 0, expenses: 0, order: 0 },
       'Oct': { name: 'Oct', income: 0, expenses: 0, order: 1 },
       'Nov': { name: 'Nov', income: 0, expenses: 0, order: 2 },
       'Dec': { name: 'Dec', income: 0, expenses: 0, order: 3 },
       'Jan': { name: 'Jan', income: 0, expenses: 0, order: 4 },
       'Feb': { name: 'Feb', income: 0, expenses: 0, order: 5 },
       'Mar': { name: 'Mar', income: 0, expenses: 0, order: 6 }
    };

    transactions.forEach(t => {
      const d = new Date(t.rawDate);
      const monthPrefix = d.toLocaleString('en-US', { month: 'short' });
      if (monthlyBuckets[monthPrefix]) {
         if (t.type === 'Income') monthlyBuckets[monthPrefix].income += t.amount;
         if (t.type === 'Expenses') monthlyBuckets[monthPrefix].expenses += Math.abs(t.amount);
      }
    });

    return Object.values(monthlyBuckets).sort((a,b) => a.order - b.order);
  }, [transactions]);

  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#151C2C] w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
        <div>
          <h3 className="font-semibold text-white">Cash Flow Dynamics</h3>
          <p className="text-xs text-gray-400">7-month rolling analysis of income vs liquidity retention</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-blue-600 rounded"></div>
            <span className="text-gray-400 font-medium tracking-wide">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-red-500 rounded"></div>
            <span className="text-gray-400 font-medium tracking-wide">Expenses</span>
          </div>
          <div className="bg-[#111827] px-2 py-1 rounded text-gray-400 text-[10px] ml-2">
            Sep 25 - Mar 26 ▼
          </div>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6B7280' }}
              dy={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#2563EB" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
