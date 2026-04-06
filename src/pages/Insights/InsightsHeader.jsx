import { useTheme } from '../../context/ThemeContext';

export default function InsightsHeader() {
  const { themeClasses } = useTheme();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
      <div className="max-w-2xl">
        <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>AI Intelligence & Insights</h1>
        <p className={`text-sm italic ${themeClasses.textSecondary}`}>
          "Julian, your financial trajectory is currently leaning toward 'enthusiastic consumer' rather than 'principled architect'."
        </p>
      </div>

      <div className="flex flex-col lg:items-end">
        <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase mb-1">Status Report</span>
        <h3 className={`font-bold tracking-wide ${themeClasses.textPrimary}`}>Q4 Precision Analysis</h3>
      </div>
    </div>
  );
}
