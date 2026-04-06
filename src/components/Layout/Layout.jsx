import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import TopBar from './TopBar';
import { useTheme } from '../../context/ThemeContext';

export default function Layout() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${
      isDarkMode
        ? 'bg-[#070B13] text-gray-200'
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-[260px] pb-[72px] lg:pb-0 h-full">
        <TopBar />
        <main className={`flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto scrollbar-hide transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#070B13] text-gray-200'
            : 'bg-gray-50 text-gray-900'
        }`}>
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
