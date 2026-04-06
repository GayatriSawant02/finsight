import { CATEGORIES, TYPES } from './mockData';
import { useTheme } from '../../context/ThemeContext';

export default function DesktopFilters({ 
  filterType, setFilterType, 
  filterCategory, setFilterCategory,
  onClearFilters
}) {
  const { themeClasses } = useTheme();
  return (
    <div className="hidden lg:flex items-end gap-4 mb-6">
      <div className="flex-1 max-w-[200px]">
        <label className={`block text-[10px] ${themeClasses.textMuted} font-bold tracking-wider mb-2 uppercase`}>Type</label>
        <select 
          className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-2.5 text-sm ${themeClasses.inputText} focus:outline-none focus:border-blue-500 appearance-none`}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex-1 max-w-[200px]">
        <label className={`block text-[10px] ${themeClasses.textMuted} font-bold tracking-wider mb-2 uppercase`}>Category</label>
        <select 
          className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-2.5 text-sm ${themeClasses.inputText} focus:outline-none focus:border-blue-500 appearance-none`}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex-1 max-w-[240px]">
        <label className={`block text-[10px] ${themeClasses.textMuted} font-bold tracking-wider mb-2 uppercase`}>Date Range</label>
        <div className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-2.5 text-sm ${themeClasses.inputText} flex items-center justify-between pointer-events-none opacity-50`}>
           <span>Sept 2025 - Mar 2026</span>
        </div>
      </div>

      <div className="ml-auto">
        <button 
          onClick={onClearFilters}
          className={`${themeClasses.cardBg} hover:${themeClasses.bgSecondary} transition-colors border ${themeClasses.cardBorder} text-blue-500 text-sm font-medium px-6 py-2.5 rounded-lg`}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
