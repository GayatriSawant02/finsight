import { Globe, Palette, Moon, Sun, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function RegionThemeSection() {
  const { themeClasses, isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Regional Settings */}
      <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg`}>
        <div className="flex items-center gap-2 mb-6">
           <Globe className="text-blue-500" size={18} />
           <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Regional Settings</h3>
        </div>

        <div className="space-y-5">
           <div>
             <label className={`block text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-2`}>Default Currency</label>
             <div className="relative">
               <div className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-3 text-sm ${themeClasses.inputText} cursor-pointer flex justify-between items-center`}>
                 <span>₹ Indian Rupee (INR)</span>
                 <ChevronDown size={14} className={themeClasses.textMuted} />
               </div>
             </div>
           </div>
           
           <div>
             <label className={`block text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-2`}>Timezone</label>
             <div className="relative">
               <div className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-3 text-sm ${themeClasses.inputText} cursor-pointer flex justify-between items-center`}>
                 <span>(GMT+05:30) Mumbai, India</span>
                 <ChevronDown size={14} className={themeClasses.textMuted} />
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Interface Theme */}
      <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg`}>
        <div className="flex items-center gap-2 mb-6">
           <Palette className="text-blue-500" size={18} />
           <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Interface Theme</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {/* Dark Theme Button */}
           <div 
             onClick={() => {
               if (!isDarkMode) toggleTheme();
             }}
             className={`rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden border ${
               isDarkMode 
                 ? `${themeClasses.bgSecondary} ${themeClasses.cardBorder} ring-2 ring-blue-500`
                 : `${themeClasses.bgSecondary} ${themeClasses.cardBorder} hover:${themeClasses.bgTertiary}`
             }`}
           >
              <div className="flex items-center gap-2 mb-2">
                 <Moon className={isDarkMode ? 'text-blue-500' : 'text-gray-400'} size={16} />
                 <span className={`text-sm font-bold ${isDarkMode ? themeClasses.textPrimary : themeClasses.textSecondary}`}>Dark Theme</span>
                 {isDarkMode && <Check size={16} className="ml-auto text-blue-500" />}
              </div>
              <p className={`text-[10px] ${themeClasses.textMuted}`}>Default high-contrast UI</p>
           </div>

           {/* Light Theme Button */}
           <div 
             onClick={() => {
               if (isDarkMode) toggleTheme();
             }}
             className={`rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden border ${
               !isDarkMode 
                 ? `${themeClasses.bgSecondary} ${themeClasses.cardBorder} ring-2 ring-blue-500`
                 : `${themeClasses.bgSecondary} ${themeClasses.cardBorder} hover:${themeClasses.bgTertiary}`
             }`}
           >
              <div className="flex items-center gap-2 mb-2">
                 <Sun className={!isDarkMode ? 'text-yellow-500' : 'text-gray-400'} size={16} />
                 <span className={`text-sm font-bold ${!isDarkMode ? themeClasses.textPrimary : themeClasses.textSecondary}`}>Light Theme</span>
                 {!isDarkMode && <Check size={16} className="ml-auto text-blue-500" />}
              </div>
              <p className={`text-[10px] ${themeClasses.textMuted}`}>Bright workspace mode</p>
           </div>
        </div>

        <p className={`text-[10px] ${themeClasses.textMuted} mt-6 italic`}>
          * Automatically syncs with your system preferences if enabled.
        </p>
      </div>
    </div>
  );
}
