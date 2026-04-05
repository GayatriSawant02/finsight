import { AlertTriangle, Eye } from 'lucide-react';

export default function AnomalyCard() {
  return (
    <div className="bg-[#18111A] relative overflow-hidden rounded-xl p-6 border border-red-900/30 shadow-lg mb-6">
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
          <h2 className="text-xl font-bold text-white leading-snug mb-1">
            Unusual high expense<br/>
            <span className="text-3xl font-black text-white">$5,000</span> <span className="text-gray-400 text-lg font-medium">on Shopping</span>
          </h2>
        </div>
        <button className="bg-[#0B101A] border border-[#1E293B] p-3 rounded-full text-blue-500 hover:bg-[#1E293B] transition-colors">
          <Eye size={18} />
        </button>
      </div>

      <div className="pl-2 grid grid-cols-3 gap-2">
        <div className="bg-[#0B101A] border border-[#1E293B] border-opacity-50 rounded-lg p-3">
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mb-1">Source</p>
           <p className="text-xs text-white font-medium truncate">Apple Store</p>
        </div>
        <div className="bg-[#0B101A] border border-[#1E293B] border-opacity-50 rounded-lg p-3">
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mb-1">Comparison</p>
           <p className="text-xs font-medium text-white">+312% vs. Avg</p>
        </div>
        <div className="bg-[#0B101A] border border-[#1E293B] border-opacity-50 rounded-lg p-3">
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
           <p className="text-xs font-semibold text-orange-400">Review Req.</p>
        </div>
      </div>
    </div>
  );
}
