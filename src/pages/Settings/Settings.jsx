import ProfileSection from './ProfileSection';
import SecuritySection from './SecuritySection';
import NotificationsSection from './NotificationsSection';
import RegionThemeSection from './RegionThemeSection';
import ConnectedAccountsSection from './ConnectedAccountsSection';
import DataPrivacySection from './DataPrivacySection';

export default function Settings() {
  return (
    <div className="p-4 lg:p-8 lg:pt-8 w-full max-w-[1000px] mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your financial workspace and security preferences.</p>
      </div>

      {/* Row 1: Profile & Security (60/40 split on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
           <ProfileSection />
        </div>
        <div className="lg:col-span-2">
           <SecuritySection />
        </div>
      </div>

      <NotificationsSection />
      
      <RegionThemeSection />
      
      <ConnectedAccountsSection />
      
      <DataPrivacySection />

      {/* Footer / Copyright block matching the design bottom */}
      <div className="border-t border-[#1E293B] pt-6 pb-20 lg:pb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500">
         <div className="flex items-center gap-2">
           <div className="w-4 h-4 rounded bg-blue-600"></div>
           <span className="font-bold text-white text-sm tracking-wider uppercase">FinSight</span>
         </div>
         
         <div className="flex gap-4 md:gap-8 flex-wrap justify-center font-medium">
           <a href="#" className="hover:text-blue-400 text-gray-400 transition-colors">Documentation</a>
           <a href="#" className="hover:text-blue-400 text-gray-400 transition-colors">API Reference</a>
           <a href="#" className="hover:text-blue-400 text-gray-400 transition-colors">Compliance</a>
           <a href="#" className="hover:text-blue-400 text-gray-400 transition-colors">Terms of Service</a>
         </div>

         <p>© 2024 FinSight Intelligence. All rights reserved.</p>
      </div>
    </div>
  );
}
