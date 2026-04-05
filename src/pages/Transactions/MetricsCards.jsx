import { useTransactions } from '../../context/TransactionsContext';

export default function MetricsCards() {
  const { monthlyIncome, currentMonthTransactions } = useTransactions();

  // Compute top category loosely
  const categoryTotals = currentMonthTransactions.reduce((acc, t) => {
    if (t.type === 'Expenses' && t.category !== 'Others') {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    }
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0] || ['N/A', 0];

  return (
    <div className="hidden lg:grid grid-cols-3 gap-6">
      <div className="bg-[#0c1838] border border-blue-900/50 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute right-[-20%] top-[-20%] w-[150px] h-[150px] bg-blue-600/20 blur-3xl rounded-full"></div>
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-2">Monthly Inflow</p>
        <h3 className="text-3xl font-bold text-white mb-2">${monthlyIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}</h3>
        <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
          ↑ 12% increase from Sept
        </p>
      </div>

      <div className="bg-[#0E1524] border border-[#1E293B] rounded-xl p-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Pending Clearances</p>
        <h3 className="text-3xl font-bold text-white mb-2">08</h3>
        <p className="text-xs text-gray-400">Estimated value: $3,210.00</p>
      </div>

      <div className="bg-[#0E1524] border border-[#1E293B] rounded-xl p-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Top Category</p>
        <h3 className="text-3xl font-bold text-white mb-2">{topCategory[0]}</h3>
        <p className="text-xs text-gray-400 uppercase">Est. spend volume</p>
      </div>
    </div>
  );
}
