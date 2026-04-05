import { TrendingUp } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';

export default function MobileSummaryCard() {
  const { monthlyIncome } = useTransactions();

  return (
    <div className="lg:hidden bg-blue-600 rounded-xl p-5 mb-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
       
       <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1 relative z-10">Monthly Inflow</p>
       <h2 className="text-4xl font-bold mb-4 relative z-10">${monthlyIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
       
       <div className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold relative z-10 backdrop-blur-sm">
         <TrendingUp size={14} />
         +12% <span className="font-normal opacity-80">vs last month</span>
       </div>
    </div>
  );
}
