import { Building2, Landmark, ShoppingBag, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function FinancialReport() {
  const { transactions, monthlyIncome, monthlyExpenses } = useTransactions();
  const { themeClasses, isDarkMode } = useTheme();

  const allTimeNet = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = 1240582.0 + allTimeNet;
  const netFlow = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  const cards = [
    {
      title: 'TOTAL BALANCE',
      value: `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Building2,
      accent: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'TOTAL INCOME',
      value: `$${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Landmark,
      accent: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'TOTAL EXPENSES',
      value: `$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: ShoppingBag,
      accent: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      title: 'NET CASH FLOW',
      value: `${netFlow >= 0 ? '+' : '-'}$${Math.abs(netFlow).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      detail: `${savingsRate.toFixed(1)}% savings rate`,
      icon: Sparkles,
      accent: netFlow >= 0 ? 'text-emerald-500' : 'text-red-500',
      bg: netFlow >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
    },
  ];

  return (
    <div className={`${themeClasses.cardBg} rounded-3xl p-6 border ${themeClasses.cardBorder} shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <p className={`text-sm font-semibold tracking-wide uppercase ${themeClasses.textMuted}`}>Financial Report</p>
          <h2 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Snapshot of your current cash position</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`${themeClasses.cardBg} rounded-3xl border ${themeClasses.cardBorder} p-5`}> 
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-2xl ${card.bg}`}>
                  <Icon className={card.accent} size={18} />
                </div>
                {card.detail && (
                  <span className={`text-xs font-semibold ${themeClasses.textSecondary}`}>
                    {card.detail}
                  </span>
                )}
              </div>
              <p className={`text-[10px] tracking-wide uppercase font-semibold mb-2 ${themeClasses.textMuted}`}>{card.title}</p>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
