import { useMemo } from 'react';
import { Wallet, ShoppingCart, PiggyBank, Percent } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function ReportsSummaryCards() {
  const { transactions } = useTransactions();
  const { themeClasses } = useTheme();

  const metrics = useMemo(() => {
    const currentMonth = 2; // March 2026
    const currentYear = 2026;
    const lastMonth = 1; // Feb 2026

    const currTransactions = transactions.filter(t => {
      const d = new Date(t.rawDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const pastTransactions = transactions.filter(t => {
      const d = new Date(t.rawDate);
      return d.getMonth() === lastMonth && d.getFullYear() === currentYear;
    });

    const currIncome = currTransactions.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const currExpenses = currTransactions.filter(t => t.type === 'Expenses').reduce((s, t) => s + Math.abs(t.amount), 0);
    const currSavings = currIncome - currExpenses;
    const currSavingsRate = currIncome > 0 ? (currSavings / currIncome) * 100 : 0;

    const pastIncome = pastTransactions.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const pastExpenses = pastTransactions.filter(t => t.type === 'Expenses').reduce((s, t) => s + Math.abs(t.amount), 0);
    const pastSavings = pastIncome - pastExpenses;
    const pastSavingsRate = pastIncome > 0 ? (pastSavings / pastIncome) * 100 : 0;

    const incomeChange = pastIncome > 0 ? ((currIncome - pastIncome) / pastIncome) * 100 : 0;
    const expensesChange = pastExpenses > 0 ? ((currExpenses - pastExpenses) / pastExpenses) * 100 : 0;
    const savingsChange = pastSavings > 0 ? ((currSavings - pastSavings) / pastSavings) * 100 : 0;

    return {
      income: currIncome, pastIncome, incomeChange,
      expenses: currExpenses, pastExpenses, expensesChange,
      savings: currSavings, savingsChange,
      savingsRate: currSavingsRate, pastSavingsRate, rateChange: currSavingsRate - pastSavingsRate
    };
  }, [transactions]);

  const cards = [
    {
      title: 'TOTAL INCOME',
      value: `$${metrics.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `vs $${metrics.pastIncome.toLocaleString()} last month`,
      badge: `${metrics.incomeChange > 0 ? '+' : ''}${metrics.incomeChange.toFixed(1)}%`,
      isPositive: metrics.incomeChange >= 0,
      icon: Wallet,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10'
    },
    {
      title: 'TOTAL EXPENSES',
      value: `$${metrics.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `vs $${metrics.pastExpenses.toLocaleString()} last month`,
      badge: `${metrics.expensesChange > 0 ? '+' : ''}${metrics.expensesChange.toFixed(1)}%`,
      isPositive: metrics.expensesChange <= 0, // Lower expenses is positive
      icon: ShoppingCart,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500/10'
    },
    {
      title: 'NET SAVINGS',
      value: `$${metrics.savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Based on active timeframe',
      badge: `${metrics.savingsChange > 0 ? '+' : ''}${metrics.savingsChange.toFixed(1)}%`,
      isPositive: metrics.savingsChange >= 0,
      icon: PiggyBank,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-500/10'
    },
    {
      title: 'SAVINGS RATE',
      value: `${metrics.savingsRate.toFixed(1)}%`,
      subtitle: 'Target: 60.0% by Year End',
      badge: `${metrics.rateChange > 0 ? '+' : ''}${metrics.rateChange.toFixed(1)}%`,
      isPositive: metrics.rateChange >= 0,
      icon: Percent,
      iconColor: 'text-violet-500',
      iconBg: 'bg-violet-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`${themeClasses.cardBg} rounded-xl p-5 border ${themeClasses.cardBorder} flex flex-col justify-between h-[140px] lg:h-[150px]`}>
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className={card.iconColor} size={16} />
              </div>
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {card.badge}
              </div>
            </div>
            <div>
              <p className={`text-[10px] ${themeClasses.textMuted} font-semibold tracking-wider mb-1 uppercase`}>{card.title}</p>
              <h3 className={`text-xl lg:text-2xl font-bold ${themeClasses.textPrimary} mb-1`}>
                {card.value}
              </h3>
              <p className={`text-[10px] ${themeClasses.textSecondary}`}>{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
