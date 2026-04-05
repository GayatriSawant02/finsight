import { useMemo } from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';

export default function ComparisonTable() {
  const { transactions } = useTransactions();

  const tableData = useMemo(() => {
    const currentMonth = 2; // March 2026
    const currentYear = 2026;
    const lastMonth = 1; // Feb 2026

    const calcGroup = (month) => {
      const txs = transactions.filter(t => {
        const d = new Date(t.rawDate);
        return d.getMonth() === month && d.getFullYear() === currentYear;
      });
      
      const income = txs.filter(t => t.type === 'Income').reduce((s,t) => s + t.amount, 0);
      const expenses = txs.filter(t => t.type === 'Expenses');
      
      // Variable = Shopping, Food, Travel. Fixed = Others (or anything categorized as recurring).
      const variableExp = expenses.filter(t => ['Food', 'Shopping', 'Travel'].includes(t.category)).reduce((s,t) => s + Math.abs(t.amount), 0);
      const fixedExp = expenses.filter(t => !['Food', 'Shopping', 'Travel'].includes(t.category)).reduce((s,t) => s + Math.abs(t.amount), 0);

      return { disp: income - fixedExp, fixed: fixedExp, variable: variableExp };
    };

    const curr = calcGroup(currentMonth);
    const past = calcGroup(lastMonth);

    const makeRow = (metric, c, p, inversePositivity = false) => {
      const diff = c - p;
      const trend = p > 0 ? (Math.abs(diff) / p) * 100 : 0;
      // For expenses, a reduction is positive.
      const isPositive = inversePositivity ? diff <= 0 : diff >= 0;
      
      return {
        metric,
        current: `$${c.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
        past: `$${p.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
        change: `${diff >= 0 ? '+' : '-'}$${Math.abs(diff).toLocaleString('en-US', {minimumFractionDigits: 2})}`,
        trend: `${trend.toFixed(2)}%`,
        isPositive,
        rawDiff: diff
      };
    };

    return [
      makeRow('Disposable Income', curr.disp, past.disp, false),
      makeRow('Fixed Liabilities', curr.fixed, past.fixed, true), // lowering is good
      makeRow('Variable Expenditures', curr.variable, past.variable, true) // lowering is good
    ];
  }, [transactions]);

  return (
    <div className="bg-[#0E1524] rounded-xl border border-[#1E293B] overflow-hidden mt-6 mb-20 lg:mb-8">
      <div className="p-6 border-b border-[#1E293B] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
           <h3 className="text-sm font-semibold text-white">Comparison with Last Month</h3>
           <p className="text-xs text-gray-500">Tracking historical delta across core metrics.</p>
        </div>
        <button className="text-blue-500 hover:text-blue-400 text-xs font-semibold flex items-center gap-1 mt-4 md:mt-0 transition-colors">
          Detailed Ledger <ArrowRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#0A0F1D]/50">
              <th className="py-4 px-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Performance Metric</th>
              <th className="py-4 px-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="py-4 px-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Last Month</th>
              <th className="py-4 px-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Absolute Change</th>
              <th className="py-4 px-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider text-right">Trend</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => {
               const trendColor = row.isPositive ? 'text-emerald-500' : 'text-red-500';
               let icon = row.rawDiff > 0 ? <TrendingUp size={14} /> : (row.rawDiff < 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} className="opacity-0" />);
               
               // Match specific visual quirks of the design for bad upward trend (like high liabilities)
               if (row.rawDiff > 0 && !row.isPositive) {
                  icon = <TrendingUp size={14} className="transform rotate-90" />; 
               }

               return (
                <tr key={idx} className="border-b border-[#1E293B]/50 hover:bg-[#111827] transition-colors">
                  <td className="py-4 px-6 text-sm font-semibold text-gray-300">{row.metric}</td>
                  <td className="py-4 px-6 text-sm text-gray-400">{row.current}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{row.past}</td>
                  <td className={`py-4 px-6 text-sm font-bold tracking-wide ${row.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {row.change}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
                       ~ {icon} {row.trend}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
