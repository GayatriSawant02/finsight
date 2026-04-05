import { Receipt, PieChart, LineChart } from 'lucide-react';

export default function NotificationsSection() {
  const notifs = [
    {
      title: 'Bill Reminders',
      desc: 'Get notified 2 days before upcoming subscription renewals.',
      icon: Receipt,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500/10',
      active: true,
      toggleColor: 'bg-emerald-500'
    },
    {
      title: 'Spending Alerts',
      desc: 'Instant alerts when a single transaction exceeds $10,000.',
      icon: PieChart,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      active: true,
      toggleColor: 'bg-blue-500'
    },
    {
      title: 'Weekly Reports',
      desc: 'Receive a detailed PDF summary of your financial health every Monday.',
      icon: LineChart,
      iconColor: 'text-gray-400',
      iconBg: 'bg-[#1A233A]',
      active: false,
      toggleColor: 'bg-gray-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {notifs.map((item, idx) => (
        <div key={idx} className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
             <div className={`p-2 rounded-lg ${item.iconBg}`}>
               <item.icon size={16} className={item.iconColor} />
             </div>
             
             {/* Toggle Switch */}
             <div className={`w-10 h-5 rounded-full relative cursor-pointer shadow-inner transition-colors ${item.active ? item.toggleColor : 'bg-[#151C2C] border border-[#1E293B]'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
             </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-1.5">{item.title}</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
