import { useTheme } from '../../context/ThemeContext';

export default function ProfileSection() {
  const { themeClasses } = useTheme();
  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} flex flex-col md:flex-row gap-8 items-start h-full`}>
      <div className="flex flex-col items-center">
        <div className={`w-24 h-24 rounded-2xl overflow-hidden ${themeClasses.bgSecondary} border-2 ${themeClasses.cardBorder} p-1 mb-3`}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" 
            alt="Julian Vane" 
            className="w-full h-full object-cover rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500"
          />
        </div>
        <button className={`text-[10px] ${themeClasses.textMuted} hover:${themeClasses.textPrimary} uppercase tracking-wider font-bold transition-colors`}>
          Update Photo
        </button>
      </div>

      <div className="flex-1 w-full">
        <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-6`}>Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-2`}>Full Name</label>
            <input 
              type="text" 
              defaultValue="Julian Vane" 
              className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-2.5 text-sm ${themeClasses.inputText} focus:outline-none focus:border-blue-500 transition-colors`}
            />
          </div>
          <div>
            <label className={`block text-[10px] font-bold ${themeClasses.textMuted} tracking-wider uppercase mb-2`}>Email Address</label>
            <input 
              type="email" 
              defaultValue="julian.v@finsight.com" 
              className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-2.5 text-sm ${themeClasses.inputText} focus:outline-none focus:border-blue-500 transition-colors`}
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          Save Changes
        </button>
      </div>
    </div>
  );
}
