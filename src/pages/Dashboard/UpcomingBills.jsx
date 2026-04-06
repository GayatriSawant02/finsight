import { Home, CreditCard, MonitorPlay, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function UpcomingBills() {
  const { themeClasses } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleProcessPayments = () => {
    setShowSuccess(true);
  };
  const bills = [
    {
      id: 1,
      title: 'Rent',
      icon: Home,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-500/10',
      subtitle: 'Due in 2 days',
      amount: '$12,000',
      status: 'PAY NOW',
      statusColor: 'text-blue-500'
    },
    {
      id: 2,
      title: 'Credit Card Due',
      icon: CreditCard,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      subtitle: 'Due in 5 days',
      amount: '$42,150',
      status: 'AUTO-PAY ON',
      statusColor: 'text-gray-500'
    },
    {
      id: 3,
      title: 'Netflix',
      icon: MonitorPlay,
      iconColor: 'text-gray-400',
      iconBg: 'bg-gray-800',
      subtitle: 'Dec 24, 2026',
      amount: '$499',
      status: 'SCHEDULED',
      statusColor: 'text-emerald-500'
    }
  ];

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 border ${themeClasses.cardBorder} flex flex-col h-[350px]`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className={`font-semibold ${themeClasses.textPrimary} flex items-center gap-2`}>
            Upcoming Bills
            <span className="text-[9px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-bold tracking-wide">ACTION REQUIRED</span>
          </h3>
          <p className={`text-xs ${themeClasses.textSecondary}`}>Priority obligations</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {bills.map((bill) => {
          const Icon = bill.icon;
          return (
            <div key={bill.id} className={`flex items-center justify-between p-3 rounded-lg ${themeClasses.bgSecondary} border ${themeClasses.cardBorder}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${bill.iconBg}`}>
                  <Icon size={16} className={bill.iconColor} />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>{bill.title}</h4>
                  <p className={`text-[11px] ${themeClasses.textMuted}`}>{bill.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${themeClasses.textPrimary} mb-0.5`}>{bill.amount}</p>
                <p className={`text-[9px] font-bold ${bill.statusColor}`}>{bill.status}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 text-center">
        <button 
          onClick={handleProcessPayments}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Process All Payments
        </button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-xl">
            <Check size={20} className="flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Payment Successful!</p>
              <p className="text-xs opacity-90">All pending payments have been processed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
