import { PiggyBank, XCircle, ArrowLeftRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function SavingsOpportunities() {
  const { themeClasses } = useTheme();
  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 lg:p-8 border ${themeClasses.cardBorder} shadow-lg mt-6 w-full mb-10 overflow-hidden relative`}>
      <div className={`flex items-center gap-2 mb-8 border-b ${themeClasses.cardBorder} pb-4`}>
        <PiggyBank className="text-emerald-500" size={20} />
        <h3 className={`text-lg font-bold ${themeClasses.textPrimary} tracking-wide`}>Savings Opportunities</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        {/* Left Column blocks */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
               <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                 <XCircle className="text-blue-500 w-5 h-5" />
               </div>
               <div className="flex-1 flex justify-between items-center">
                 <span className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Unused Subscriptions</span>
                 <span className={`text-sm font-bold ${themeClasses.textPrimary}`}>$450/mo</span>
               </div>
            </div>
            {/* Visual alignment trick for text under the title line */}
            <div className="ml-14">
               <div className="flex gap-1 mb-2 h-1.5 w-full">
                 <div className="h-full bg-blue-600 rounded-l-full w-[20%]"></div>
                 <div className={`h-full ${themeClasses.bgTertiary} rounded-r-full w-[80%]`}></div>
               </div>
               <p className={`text-[10px] ${themeClasses.textMuted} leading-relaxed italic`}>
                 2 streaming services and 1 newsletter identified as "Ghost Services".
               </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-3">
               <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                 <ArrowLeftRight className="text-emerald-500 w-5 h-5" />
               </div>
               <div className="flex-1 flex justify-between items-center">
                 <span className={`text-sm font-semibold ${themeClasses.textPrimary}`}>High Recurring Costs</span>
                 <span className={`text-sm font-bold ${themeClasses.textPrimary}`}>$1,200/mo</span>
               </div>
            </div>
            <div className="ml-14">
               <div className="flex gap-1 mb-2 h-1.5 w-full">
                 <div className="h-full bg-emerald-500 rounded-l-full w-[60%]"></div>
                 <div className={`h-full ${themeClasses.bgTertiary} rounded-r-full w-[40%]`}></div>
               </div>
               <p className={`text-[10px] ${themeClasses.textMuted} leading-relaxed italic`}>
                 Premium bank locker fee exceeds market average by 45%.
               </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architect's Note */}
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} rounded-xl p-6 flex flex-col justify-center h-full`}>
           <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">Architect's Note</h4>
           <p className={`text-sm ${themeClasses.textSecondary} italic leading-loose font-serif`}>
             "Efficiency is the soul of capital. We have identified 3 overlapping service agreements that could be terminated today."
           </p>
        </div>
      </div>
    </div>
  );
}
