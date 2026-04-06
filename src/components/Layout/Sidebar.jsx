import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Lightbulb, Settings, Eye, TrendingUp } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col w-[260px] h-screen bg-[#070B14] border-r border-[#151C2C] fixed left-0 top-0 text-gray-400">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer">
          <img 
            src="/finsight_logo.png" 
            alt="FinSight Logo" 
            className="w-12 h-12 object-cover rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-600 uppercase">
              FinSight
            </span>
            <span className="text-[9px] font-semibold text-blue-500/80 uppercase tracking-[0.3em] -mt-1">
              Analytics
            </span>
          </div>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-500 font-medium'
                      : 'hover:bg-[#151C2C] hover:text-gray-200'
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-[#151C2C] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 overflow-hidden flex-shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="Julian Vane" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Julian Vane</p>
          <p className="text-xs text-gray-500">Premium Tier</p>
        </div>
      </div>
    </div>
  );
}
