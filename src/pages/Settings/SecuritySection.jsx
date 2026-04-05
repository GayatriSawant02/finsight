import { LogOut } from 'lucide-react';

export default function SecuritySection() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Blue Security Card */}
      <div className="bg-blue-600 rounded-xl p-6 border border-blue-500 shadow-xl shadow-blue-900/20 flex-1">
        <h3 className="text-white font-bold mb-6">Account Security</h3>
        
        <button className="w-full bg-blue-500 hover:bg-blue-400 border border-blue-400 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors mb-4 text-center">
          Change Password
        </button>

        <div className="bg-blue-700/50 border border-blue-500/50 rounded-lg p-3 flex justify-between items-center">
          <span className="text-sm font-medium text-white">2FA Security</span>
          {/* Custom Toggle Switch stylized for Blue bg */}
          <div className="w-10 h-5 bg-blue-400 rounded-full relative cursor-pointer shadow-inner">
             <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"></div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-[#0E1524] hover:bg-[#151C2C] border border-[#1E293B] transition-colors rounded-xl p-4 flex items-center justify-center gap-2 group">
        <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Sign out of all sessions</span>
      </button>
    </div>
  );
}
