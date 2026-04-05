import { FileText } from 'lucide-react';

export default function MobileExportCard() {
  return (
    <div className="lg:hidden mt-6 mb-24 bg-[#0E1524] rounded-xl p-5 border border-[#1E293B] shadow-xl shadow-black/20 flex items-center justify-between">
      <div>
         <h4 className="text-sm font-semibold text-white mb-0.5">Export Analysis</h4>
         <p className="text-[10px] text-gray-500">Generate deep-dive PDF report</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2">
        <FileText size={14} /> PDF
      </button>
    </div>
  );
}
