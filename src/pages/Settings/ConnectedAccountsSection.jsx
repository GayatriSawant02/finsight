import { CreditCard, Landmark, Wallet } from 'lucide-react';

export default function ConnectedAccountsSection() {
  const accounts = [
    { name: 'HDFC Bank Primary', desc: 'Current Account •••• 8829', icon: Landmark },
    { name: 'VISA Infinite Card', desc: 'Credit Card •••• 1002', icon: CreditCard },
    { name: 'Digital Wallet', desc: 'Connected via UPI', icon: Wallet }
  ];

  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-white">Connected Accounts</h3>
        <button className="text-blue-500 font-bold text-xs hover:text-blue-400 transition-colors uppercase tracking-wider">
          + Add New
        </button>
      </div>

      <div className="space-y-3">
         {accounts.map((acc, idx) => (
           <div key={idx} className="bg-[#0B101A] border border-[#1E293B] rounded-xl p-4 flex justify-between items-center group hover:border-[#2A344A] transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#151C2C] flex items-center justify-center border border-[#1E293B]">
                    <acc.icon className="text-gray-400" size={16} />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-200">{acc.name}</p>
                   <p className="text-[10px] text-gray-500">{acc.desc}</p>
                 </div>
              </div>
              <button className="text-[10px] text-blue-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Manage
              </button>
           </div>
         ))}
      </div>
    </div>
  );
}
