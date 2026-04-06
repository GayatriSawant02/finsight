import { Zap, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function SmartSuggestions() {
  const { themeClasses } = useTheme();
  const suggestions = [
    {
      title: 'Reduce dining out',
      benefitText: 'Potential monthly savings:',
      highlight: '$2,000',
      color: 'text-emerald-500'
    },
    {
      title: 'Optimize savings rate',
      benefitText: 'Increase by ',
      highlight: '15%',
      suffix: ' to reach retirement goals by 2045.',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg mb-6 lg:mb-0`}>
      <div className="flex items-center gap-2 mb-6">
        <Zap className="text-blue-500" size={18} />
        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} tracking-wide`}>Smart Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((item, idx) => (
          <div key={idx} className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} rounded-xl p-4 flex justify-between items-center group cursor-pointer hover:border-blue-500/50 transition-colors`}>
            <div>
              <h4 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-1`}>{item.title}</h4>
              <p className={`text-[11px] ${themeClasses.textMuted}`}>
                {item.benefitText} <span className={`font-semibold ${item.color}`}>{item.highlight}</span>{item.suffix}
              </p>
            </div>
            <ChevronRight className={`${themeClasses.textMuted} group-hover:text-blue-500 transition-colors`} size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}
