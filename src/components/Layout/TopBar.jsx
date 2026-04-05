import { Search, Bell, Moon, Settings } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="h-[80px] px-6 lg:px-8 flex items-center justify-between sticky top-0 bg-[#070B13]/90 backdrop-blur-md z-40">
      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search wealth data"
            className="w-full bg-[#111827] border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Mobile top bar just shows logo on left if we want, or nothing since we are mimicking design */}
      <div className="sm:hidden flex items-center gap-2">
        <img src="/logo.png" alt="FinSight Logo" className="h-6 object-contain filter brightness-0 invert" />
      </div>

      <div className="flex items-center gap-4 lg:gap-6 ml-auto">
        <div className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
          <Search className="sm:hidden" size={20} />
        </div>
        <div className="hidden sm:block cursor-pointer text-gray-400 hover:text-white transition-colors">
          <Moon size={20} />
        </div>
        <div className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black translate-x-1/3 -translate-y-1/3"></div>
        </div>
        <div className="hidden sm:block cursor-pointer text-gray-400 hover:text-white transition-colors">
          <Settings size={20} />
        </div>
        <div className="hidden lg:flex items-center gap-3 border-l border-gray-800 pl-6">
           <div className="text-right">
              <p className="text-sm font-medium text-white">Admin Role</p>
              <p className="text-xs text-gray-500">Managing Director</p>
           </div>
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-9 h-9 rounded-full bg-blue-600/20" />
        </div>
        {/* Mobile Profile Av */}
        <div className="lg:hidden ml-2 w-8 h-8 rounded-full bg-blue-600 overflow-hidden flex-shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="Julian" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
