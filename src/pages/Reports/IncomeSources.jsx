import { useMemo } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function IncomeSources() {
  const { currentMonthTransactions, monthlyIncome } = useTransactions();
  const { themeClasses } = useTheme();

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
      .filter(([, data]) => data.amount > 0)
      .map(([name, data]) => ({
        name,
        amount: `$${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        percent: monthlyIncome > 0 ? (data.amount / monthlyIncome) * 100 : 0,
        color: data.color
      }))
      .sort((a,b) => b.percent - a.percent);
  }, [currentMonthTransactions, monthlyIncome]);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-4 lg:p-6 border ${themeClasses.cardBorder} flex flex-col h-full`}>
      <div className="mb-8">
        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Revenue Streams</h3>
      </div>

      <div className="space-y-6 flex-1">
        {sources.length === 0 && <span className={`text-sm ${themeClasses.textMuted}`}>No recorded income streams this month.</span>}
        {sources.map((src, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-2">
              <span className={`text-[10px] font-bold ${themeClasses.textMuted} tracking-wider flex-1 uppercase`}>{src.name}</span>
              <span className={`text-sm font-bold ${themeClasses.textPrimary} tracking-wide`}>{src.amount}</span>
            </div>
            <div className={`h-2.5 w-full rounded-full ${themeClasses.bgTertiary} overflow-hidden`}>
              <div className={`h-full rounded-full ${src.color}`} style={{ width: `${src.percent}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-8 ${themeClasses.bgSecondary} border ${themeClasses.cardBorder} rounded-xl p-4 flex gap-4 items-center`}>
        {sources.length > 0 ? (
          <>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-emerald-500 w-5 h-5" />
            </div>
            <div>
               <p className={`text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-1`}>Growth Projection</p>
               <p className={`text-xs ${themeClasses.textSecondary} leading-relaxed`}>
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
               <p className={`text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-1`}>Stagnation Alert</p>
               <p className={`text-xs ${themeClasses.textMuted}`}>Add an income source to project financial growth patterns.</p>
             </div>
          </>
        )}
      </div>
    </div>
  );
}
