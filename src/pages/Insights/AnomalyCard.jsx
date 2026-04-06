import { AlertTriangle, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AnomalyCard() {
  const { themeClasses } = useTheme();
  return (
    <div className={`${themeClasses.cardBg} relative overflow-hidden rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg mb-6`}>
      {/* Decorative red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
      
      <div className="flex justify-between items-center mb-6 pl-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={16} />
          <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">Anomaly Detected</span>
        </div>
        <span className="text-[10px] font-bold text-red-500/50 tracking-wider">JUST NOW</span>
      </div>

      <div className="pl-2 mb-6 flex justify-between items-start">
        <div className="max-w-[80%]">
          <h2 className={`text-xl font-bold ${themeClasses.textPrimary} leading-snug mb-1`}>
            Unusual high expense<br/>
            <span className="text-3xl font-black text-white">$5,000</span> <span className={`${themeClasses.textSecondary} text-lg font-medium`}>on Shopping</span>
          </h2>
        </div>
        <button className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} p-3 rounded-full text-blue-500 hover:${themeClasses.bgTertiary} transition-colors`}>
          <Eye size={18} />
        </button>
      </div>

      <div className="pl-2 grid grid-cols-3 gap-2">
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} border-opacity-50 rounded-lg p-3`}>
           <p className={`text-[8px] ${themeClasses.textMuted} font-bold uppercase tracking-wider mb-1`}>Source</p>
           <p className={`text-xs ${themeClasses.textPrimary} font-medium truncate`}>Apple Store</p>
        </div>
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} border-opacity-50 rounded-lg p-3`}>
           <p className={`text-[8px] ${themeClasses.textMuted} font-bold uppercase tracking-wider mb-1`}>Comparison</p>
           <p className={`text-xs font-medium ${themeClasses.textPrimary}`}>+312% vs. Avg</p>
        </div>
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} border-opacity-50 rounded-lg p-3`}>
           <p className={`text-[8px] ${themeClasses.textMuted} font-bold uppercase tracking-wider mb-1`}>Status</p>
           <p className="text-xs font-semibold text-orange-400">Review Req.</p>
        </div>
      </div>
    </div>
  );
}
