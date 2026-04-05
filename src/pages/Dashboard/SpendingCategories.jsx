import { useMemo } from 'react';
import { useTransactions } from '../../context/TransactionsContext';

export default function SpendingCategories() {
  const { currentMonthTransactions, monthlyExpenses } = useTransactions();

  const categoriesData = useMemo(() => {
    const totals = currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const mapping = {
      'Food': { emoji: '🍔', color: 'bg-orange-500', barBg: 'bg-orange-950/30' },
      'Travel': { emoji: '🚗', color: 'bg-blue-500', barBg: 'bg-blue-950/30' },
      'Shopping': { emoji: '🛒', color: 'bg-emerald-500', barBg: 'bg-emerald-950/30' },
      'Others': { emoji: '✨', color: 'bg-violet-500', barBg: 'bg-violet-950/30' }
    };

    const formatted = Object.entries(totals)
      .map(([name, amount]) => {
        const percent = monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0;
        return {
          name,
          amount: `$${amount.toLocaleString('en-US')}`,
          percent,
          ...mapping[name]
        };
      })
      .sort((a,b) => b.percent - a.percent)
      .slice(0, 3); // Top 3

    return formatted;
  }, [currentMonthTransactions, monthlyExpenses]);

  // Exclude "Others" or just display overall for discretionary
  const discretionary = monthlyExpenses;

  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#151C2C] flex flex-col h-[350px]">
      <div className="mb-6">
        <h3 className="font-semibold text-white">Top Spending Categories</h3>
        <p className="text-xs text-gray-400">Capital leakage analysis</p>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {categoriesData.length === 0 ? (
           <div className="text-center text-gray-500 text-sm">No expense data found.</div>
        ) : categoriesData.map((cat, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-300">{cat.name} {cat.emoji}</span>
              <span className="text-white">{cat.amount}</span>
            </div>
            <div className={`h-1.5 w-full rounded-full ${cat.barBg} overflow-hidden`}>
              <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-[#1a233a]">
        <p className="text-[10px] font-semibold text-gray-500 tracking-wider">TOTAL DISCRETIONARY: ${discretionary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}
