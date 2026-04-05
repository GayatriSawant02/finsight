import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, BarChart3, Lightbulb } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Insights', href: '/insights', icon: Lightbulb }
];

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[#070B14] border-t border-[#151C2C] flex items-center justify-around px-4 z-50">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 transition-all duration-200 ${
                isActive ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
