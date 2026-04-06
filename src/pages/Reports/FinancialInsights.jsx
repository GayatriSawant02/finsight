import { useMemo } from 'react';
import { Lightbulb, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function FinancialInsights() {
  const { transactions, currentMonthTransactions, monthlyIncome, monthlyExpenses } = useTransactions();
  const { themeClasses } = useTheme();

  const insights = useMemo(() => {
    const insights = [];

    // Calculate savings rate
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

    // Check savings rate
    if (savingsRate < 20) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Low Savings Rate',
        message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Aim for at least 20% of your income.`,
        color: 'text-yellow-500'
      });
    } else {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Great Savings Rate!',
        message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
        color: 'text-green-500'
      });
    }

    // Analyze spending categories
    const categoryTotals = currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const topCategory = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)[0];

    if (topCategory && topCategory[1] > monthlyExpenses * 0.3) {
      insights.push({
        type: 'info',
        icon: Target,
        title: 'High Spending Category',
        message: `${topCategory[0]} accounts for ${(topCategory[1] / monthlyExpenses * 100).toFixed(1)}% of your expenses. Consider optimizing this area.`,
        color: 'text-blue-500'
      });
    }

    // Check for consistent income
    const incomeTransactions = transactions.filter(t => t.type === 'Income');
    const uniqueMonths = new Set(incomeTransactions.map(t => {
      const d = new Date(t.rawDate);
      return `${d.getFullYear()}-${d.getMonth()}`;
    }));

    if (uniqueMonths.size >= 3) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Consistent Income',
        message: 'You have steady income over the past few months. Great foundation for financial planning!',
        color: 'text-green-500'
      });
    }

    // Budget vs actual (assuming 50/30/20 rule)
    const needsBudget = monthlyIncome * 0.5;

    const foodShopping = (categoryTotals['Food'] || 0) + (categoryTotals['Shopping'] || 0);
    const needs = foodShopping + (categoryTotals['Others'] || 0); // Assuming Others are needs

    if (needs > needsBudget) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Needs Overspending',
        message: `Your essential expenses are ${(needs / needsBudget * 100).toFixed(1)}% of your needs budget.`,
        color: 'text-yellow-500'
      });
    }

    return insights.slice(0, 3); // Limit to 3 insights
  }, [transactions, currentMonthTransactions, monthlyIncome, monthlyExpenses]);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-4 lg:p-6 border ${themeClasses.cardBorder}`}>
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-yellow-500" size={20} />
        <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Financial Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className={`flex items-start gap-3 p-4 ${themeClasses.bgSecondary} rounded-lg`}>
              <Icon className={`${insight.color} mt-0.5 flex-shrink-0`} size={18} />
              <div>
                <h4 className={`${themeClasses.textPrimary} font-medium mb-1`}>{insight.title}</h4>
                <p className={`text-sm ${themeClasses.textSecondary}`}>{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}