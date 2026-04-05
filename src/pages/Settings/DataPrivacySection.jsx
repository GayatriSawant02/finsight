import { AlertTriangle, Download, Trash2 } from 'lucide-react';

export default function DataPrivacySection() {
  return (
    <div className="mt-8 mb-16 lg:mb-12 border border-red-900/30 rounded-xl p-6 bg-[#18111A] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-red-500" size={18} />
          <h3 className="text-sm font-bold text-red-500 tracking-wide">Data & Privacy</h3>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Control your data footprint. You can export your financial history or permanently delete your account and all associated insights.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <button className="bg-[#0E1524] hover:bg-[#151C2C] border border-[#1E293B] text-gray-300 text-xs font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Download size={14} /> Export My Data
        </button>
        <button className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-red-900/20 transition-colors flex items-center justify-center gap-2">
          <Trash2 size={14} /> Delete Account
        </button>
      </div>
    </div>
  );
}
