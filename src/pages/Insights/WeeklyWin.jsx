import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function WeeklyWin() {
  const { themeClasses } = useTheme();
  return (
    <div className="bg-blue-600 rounded-xl p-6 shadow-xl shadow-blue-900/20 mb-6 lg:mb-0 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="text-white relative z-10" size={16} />
        <span className="text-[10px] font-bold text-white tracking-widest uppercase relative z-10">Weekly Win</span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 leading-tight relative z-10">
        You saved $1,200 this week <span role="img" aria-label="party">🎉</span>
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3 relative z-10 backdrop-blur-sm border border-white/10">
           <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mb-1.5 border-b border-white/10 pb-1.5 inline-block">Discipline Score</p>
           <p className="text-2xl font-black text-white">8.4<span className="text-sm text-blue-200 font-medium">/10</span></p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center text-xs text-blue-100 font-medium relative z-10">
         <span>Expenses vs Last Week</span>
         <span className="text-white font-semibold">-8%</span>
      </div>
      
      <div className="mt-2 h-1.5 w-full rounded-full bg-blue-800 overflow-hidden relative z-10 border border-blue-500/30">
        <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: '92%' }}></div>
      </div>
    </div>
  );
}
