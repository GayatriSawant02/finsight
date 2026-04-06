import { BarChart2, Utensils, PlaySquare } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function SpendingInsights() {
  const { currentMonthTransactions } = useTransactions();
  const { themeClasses } = useTheme();
  
  // Calculate specific dynamic data to ground the 'AI' statement
  const foodSpend = currentMonthTransactions
    .filter(t => t.category === 'Food')
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  
  let utilText = "You spent 25% more on food this month than your architecture allows.";
  if (foodSpend > 0) {
    utilText = `You spent $${foodSpend.toLocaleString()} on food recently, exceeding optimal architecture logic.`;
  }

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg mb-6`}>
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="text-blue-500" size={18} />
        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} tracking-wide`}>Spending Insights</h3>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <Utensils className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
          <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>{utilText}</p>
        </div>
        
        <div className="flex gap-4 items-start">
          <PlaySquare className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
          <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
            Your digital subscriptions increased by <strong className={`${themeClasses.textPrimary} font-semibold`}>$800</strong> without corresponding utility.
          </p>
        </div>
      </div>

      <div className={`mt-8 pt-6 border-t ${themeClasses.cardBorder}`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase`}>Budget Utilization</span>
          <span className={`text-[10px] font-bold ${themeClasses.textMuted}`}>72%</span>
        </div>
        <div className={`h-1.5 w-full rounded-full ${themeClasses.bgTertiary} overflow-hidden`}>
          <div className="h-full rounded-full bg-blue-600" style={{ width: '72%' }}></div>
        </div>
      </div>
    </div>
  );
}
