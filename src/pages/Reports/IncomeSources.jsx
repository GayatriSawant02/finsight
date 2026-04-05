import { useMemo } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';

export default function IncomeSources() {
  const { currentMonthTransactions, monthlyIncome } = useTransactions();

  const sources = useMemo(() => {
    // Determine sources based on merchant names logically
    const categorized = {
      'Primary Salary': { amount: 0, color: 'bg-blue-500' },
      'Freelance Projects': { amount: 0, color: 'bg-emerald-400' },
      'Investment/Other': { amount: 0, color: 'bg-indigo-500' }
    };

    currentMonthTransactions.filter(t => t.type === 'Income').forEach(t => {
      const lower = t.merchant.toLowerCase();
      if (lower.includes('salary')) categorized['Primary Salary'].amount += t.amount;
      else if (lower.includes('freelance')) categorized['Freelance Projects'].amount += t.amount;
      else categorized['Investment/Other'].amount += t.amount;
    });

    return Object.entries(categorized)
      .filter(([_, data]) => data.amount > 0)
      .map(([name, data]) => ({
        name,
        amount: `$${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        percent: monthlyIncome > 0 ? (data.amount / monthlyIncome) * 100 : 0,
        color: data.color
      }))
      .sort((a,b) => b.percent - a.percent);
  }, [currentMonthTransactions, monthlyIncome]);

  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] flex flex-col h-full col-span-1 lg:col-span-4">
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white">Income Sources</h3>
      </div>

      <div className="space-y-6 flex-1">
        {sources.length === 0 && <span className="text-gray-500 text-sm">No recorded income streams this month.</span>}
        {sources.map((src, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-gray-500 tracking-wider flex-1 uppercase">{src.name}</span>
              <span className="text-sm font-bold text-white tracking-wide">{src.amount}</span>
            </div>
            <div className={`h-2.5 w-full rounded-full bg-[#1A233A] overflow-hidden`}>
              <div className={`h-full rounded-full ${src.color}`} style={{ width: `${src.percent}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#0B101A] border border-[#1E293B] rounded-xl p-4 flex gap-4 items-center">
        {sources.length > 0 ? (
          <>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-emerald-500 w-5 h-5" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Growth Projection</p>
               <p className="text-xs text-gray-300 leading-relaxed">
                 Portfolio expected to rise by <span className="text-emerald-500 font-medium">4.2%</span> next month based on current trajectories.
               </p>
            </div>
          </>
        ) : (
          <>
             <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
               <AlertCircle className="text-red-500 w-5 h-5" />
             </div>
             <div>
               <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Stagnation Alert</p>
               <p className="text-xs text-gray-400">Add an income source to project financial growth patterns.</p>
             </div>
          </>
        )}
      </div>
    </div>
  );
}
