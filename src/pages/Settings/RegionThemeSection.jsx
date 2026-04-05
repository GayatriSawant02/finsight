import { Globe, Palette, Moon, Sun, ChevronDown } from 'lucide-react';

export default function RegionThemeSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Regional Settings */}
      <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] shadow-lg">
        <div className="flex items-center gap-2 mb-6">
           <Globe className="text-blue-500" size={18} />
           <h3 className="text-sm font-semibold text-white">Regional Settings</h3>
        </div>

        <div className="space-y-5">
           <div>
             <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">Default Currency</label>
             <div className="relative">
               <div className="w-full bg-[#0B101A] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-gray-200 cursor-pointer flex justify-between items-center">
                 <span>₹ Indian Rupee (INR)</span>
                 <ChevronDown size={14} className="text-gray-500" />
               </div>
             </div>
           </div>
           
           <div>
             <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">Timezone</label>
             <div className="relative">
               <div className="w-full bg-[#0B101A] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-gray-200 cursor-pointer flex justify-between items-center">
                 <span>(GMT+05:30) Mumbai, India</span>
                 <ChevronDown size={14} className="text-gray-500" />
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Interface Theme */}
      <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] shadow-lg">
        <div className="flex items-center gap-2 mb-6">
           <Palette className="text-blue-500" size={18} />
           <h3 className="text-sm font-semibold text-white">Interface Theme</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {/* Dark Theme Button */}
           <div className="bg-[#0B101A] border border-blue-500 rounded-xl p-4 cursor-pointer hover:bg-[#111827] transition-colors relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                 <Moon className="text-blue-500" size={16} />
                 <span className="text-sm font-bold text-white">Dark Theme</span>
              </div>
              <p className="text-[10px] text-gray-400">Default high-contrast UI</p>
           </div>

           {/* Light Theme Button */}
           <div className="bg-[#0B101A] border border-[#1E293B] rounded-xl p-4 cursor-pointer hover:bg-[#111827] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                 <Sun className="text-gray-500" size={16} />
                 <span className="text-sm font-bold text-gray-400">Light Theme</span>
              </div>
              <p className="text-[10px] text-gray-500">Bright workspace mode</p>
           </div>
        </div>

        <p className="text-[10px] text-gray-500 mt-6 italic">
          * Automatically syncs with your system preferences if enabled.
        </p>
      </div>
    </div>
  );
}
