import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#070B13] text-gray-200 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-[260px] pb-[72px] lg:pb-0 h-full">
        <TopBar />
        <main className="flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto scrollbar-hide">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
