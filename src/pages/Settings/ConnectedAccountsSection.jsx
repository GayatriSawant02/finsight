import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ConnectedAccountsSection() {
  const { themeClasses } = useTheme();
  const accounts = [
    { name: 'HDFC Bank Primary', desc: 'Current Account •••• 8829', icon: Landmark },
    { name: 'VISA Infinite Card', desc: 'Credit Card •••• 1002', icon: CreditCard },
    { name: 'Digital Wallet', desc: 'Connected via UPI', icon: Wallet }
  ];

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} shadow-lg mt-6`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Connected Accounts</h3>
        <button className="text-blue-500 font-bold text-xs hover:text-blue-400 transition-colors uppercase tracking-wider">
          + Add New
        </button>
      </div>

      <div className="space-y-3">
         {accounts.map((acc, idx) => (
           <div key={idx} className={`${themeClasses.bgSecondary} border ${themeClasses.cardBorder} rounded-xl p-4 flex justify-between items-center group hover:${themeClasses.bgTertiary} transition-colors cursor-pointer`}>
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-full ${themeClasses.bgSecondary} flex items-center justify-center border ${themeClasses.cardBorder}`}>
                    <acc.icon className={themeClasses.textMuted} size={16} />
                 </div>
                 <div>
                   <p className={`text-sm font-bold ${themeClasses.textPrimary}`}>{acc.name}</p>
                   <p className={`text-[10px] ${themeClasses.textMuted}`}>{acc.desc}</p>
                 </div>
              </div>
              <button className="text-[10px] text-blue-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Manage
              </button>
           </div>
         ))}
      </div>
    </div>
  );
}
