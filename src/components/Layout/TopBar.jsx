import { Search, Bell, Moon, Sun, Settings, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useRole } from '../../context/RoleContext';
import { useState, useEffect, useRef } from 'react';

export default function TopBar() {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const { userRole, switchRole } = useRole();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const notificationRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    };

    if (showNotifications || showRoleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showRoleDropdown]);

  return (
    <div className={`h-[80px] px-6 lg:px-8 flex items-center justify-between sticky top-0 backdrop-blur-md z-40 transition-colors duration-300 ${
      isDarkMode
        ? 'bg-[#070B13]/90'
        : 'bg-white/90 border-b border-gray-200'
    }`}>
      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Ask FinSight AI..."
            className={`w-full ${themeClasses.inputBg} ${themeClasses.inputBorder} rounded-full py-2.5 pl-11 pr-4 text-sm ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:outline-none focus:ring-1 focus:ring-blue-500`}
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
        <div
          className={`hidden sm:block cursor-pointer transition-colors ${themeClasses.iconPrimary}`}
          onClick={toggleTheme}
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </div>
        <div 
          className={`relative cursor-pointer transition-colors ${themeClasses.iconPrimary}`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black translate-x-1/3 -translate-y-1/3"></div>
        </div>
        <div className={`sm:hidden cursor-pointer transition-colors ${themeClasses.iconPrimary}`}>
          <Settings size={20} />
        </div>
        <div ref={roleRef} className={`hidden lg:flex items-center gap-3 ${isDarkMode ? 'border-l border-gray-800' : 'border-l border-gray-300'} pl-6 relative`}>
           <div 
             className="text-right cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => setShowRoleDropdown(!showRoleDropdown)}
           >
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                {userRole === 'admin' ? 'Admin Panel' : 'Viewer Panel'}
                <ChevronDown size={16} className={`transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                {userRole === 'admin' ? 'Full Access' : 'View Only'}
              </p>
           </div>
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-9 h-9 rounded-full bg-blue-600/20" />

           {/* Role Dropdown Menu */}
           {showRoleDropdown && (
             <div className={`absolute top-full right-0 mt-2 w-48 ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-lg shadow-lg z-50`}>
               <button
                 onClick={() => {
                   switchRole('admin');
                   setShowRoleDropdown(false);
                 }}
                 className={`w-full text-left px-4 py-3 flex items-center justify-between hover:${themeClasses.bgSecondary} transition-colors ${userRole === 'admin' ? `${themeClasses.bgSecondary} border-l-2 border-blue-500` : ''}`}
               >
                 <div>
                   <p className={`text-sm font-medium ${themeClasses.textPrimary}`}>Admin Panel</p>
                   <p className={`text-xs ${themeClasses.textSecondary}`}>Full Access</p>
                 </div>
                 {userRole === 'admin' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
               </button>
               <button
                 onClick={() => {
                   switchRole('viewer');
                   setShowRoleDropdown(false);
                 }}
                 className={`w-full text-left px-4 py-3 flex items-center justify-between hover:${themeClasses.bgSecondary} transition-colors border-t ${themeClasses.cardBorder} ${userRole === 'viewer' ? `${themeClasses.bgSecondary} border-l-2 border-blue-500` : ''}`}
               >
                 <div>
                   <p className={`text-sm font-medium ${themeClasses.textPrimary}`}>Viewer Panel</p>
                   <p className={`text-xs ${themeClasses.textSecondary}`}>View Only</p>
                 </div>
                 {userRole === 'viewer' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
               </button>
             </div>
           )}
        </div>
        {/* Mobile Profile Av */}
        <div className="lg:hidden ml-2 w-8 h-8 rounded-full bg-blue-600 overflow-hidden flex-shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="Julian" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div ref={notificationRef} className={`absolute top-[80px] right-4 lg:right-8 w-80 ${themeClasses.cardBg} rounded-xl border ${themeClasses.cardBorder} shadow-xl z-50`}>
          <div className={`p-4 border-b ${themeClasses.cardBorder} flex items-center justify-between`}>
            <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>Notifications</h3>
            <button 
              onClick={() => setShowNotifications(false)}
              className={`p-1 rounded-lg hover:${themeClasses.bgSecondary} transition-colors`}
            >
              <X size={16} className={themeClasses.textMuted} />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {/* Upcoming Bills Notification */}
            <div className={`p-4 border-b ${themeClasses.cardBorder} hover:${themeClasses.bgSecondary} cursor-pointer transition-colors`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${themeClasses.textPrimary} mb-1`}>Upcoming Bill Due</p>
                  <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>Rent payment of $12,000 is due in 2 days</p>
                  <span className="text-xs text-red-500 font-medium">Action Required</span>
                </div>
              </div>
            </div>

            {/* Savings Opportunity */}
            <div className={`p-4 border-b ${themeClasses.cardBorder} hover:${themeClasses.bgSecondary} cursor-pointer transition-colors`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-500 text-xs font-bold">$</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${themeClasses.textPrimary} mb-1`}>Savings Opportunity</p>
                  <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>You could save $450/mo by canceling unused subscriptions</p>
                  <span className="text-xs text-emerald-500 font-medium">View Details</span>
                </div>
              </div>
            </div>

            {/* Transaction Alert */}
            <div className={`p-4 hover:${themeClasses.bgSecondary} cursor-pointer transition-colors`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 text-xs font-bold">T</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${themeClasses.textPrimary} mb-1`}>Large Transaction</p>
                  <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>$5,000 shopping expense detected</p>
                  <span className="text-xs text-blue-500 font-medium">Review Transaction</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`p-3 border-t ${themeClasses.cardBorder} text-center`}>
            <button className={`text-xs ${themeClasses.textMuted} hover:${themeClasses.textPrimary} font-medium`}>
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
