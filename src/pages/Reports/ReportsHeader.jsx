import { Calendar, Share, FileText, ChevronDown } from 'lucide-react';

export default function ReportsHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Financial Reports</h1>
        <p className="text-gray-400 text-sm">Deep-dive performance analysis for your fiscal portfolio.</p>
      </div>

      {/* Desktop Controls */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center bg-[#0E1524] border border-[#1E293B] rounded-lg p-1">
          <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">This Week</button>
          <button className="px-4 py-1.5 text-xs font-medium bg-[#1A233A] text-white rounded-md shadow">This Month</button>
          <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">This Year</button>
          <div className="w-px h-4 bg-[#1E293B] mx-2"></div>
          <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <Calendar size={14} /> Custom
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20">
            <Share size={14} /> Share Report
          </button>
          <button className="bg-white text-black hover:bg-gray-100 transition-colors text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2">
            <FileText size={14} /> PDF
          </button>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex lg:hidden w-full justify-between items-center mt-2">
         <button className="bg-[#0E1524] border border-[#1E293B] text-gray-300 text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-2">
           <Calendar size={14} /> This Month <ChevronDown size={14} className="ml-1" />
         </button>
         <button className="bg-[#0E1524] border border-[#1E293B] text-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
            <Share size={16} />
         </button>
      </div>
    </div>
  );
}
