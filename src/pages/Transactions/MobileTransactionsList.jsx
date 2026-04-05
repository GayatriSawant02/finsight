import { Utensils, Plane, ShoppingCart, CreditCard, Search, Trash2 } from 'lucide-react';

export default function MobileTransactionsList({ transactions, searchQuery, setSearchQuery, onDelete }) {
  const getIcon = (category) => {
    switch(category) {
      case 'Food': return <Utensils size={20} className="text-orange-500" />;
      case 'Travel': return <Plane size={20} className="text-blue-500" />;
      case 'Shopping': return <ShoppingCart size={20} className="text-emerald-500" />;
      case 'Others': return <CreditCard size={20} className="text-violet-500" />;
      default: return <CreditCard size={20} className="text-gray-400" />;
    }
  };

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    const abs = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return isNegative ? `-$${abs}` : `+$${abs}`;
  };

  return (
    <div className="lg:hidden">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full bg-[#111827] border border-[#1e293b] rounded-xl py-3 pl-12 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">Recent Transactions</h3>
        <button className="text-sm font-medium text-blue-500">See All</button>
      </div>

      <div className="space-y-3 pb-6">
        {transactions.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No transactions found.
          </div>
        )}
        {transactions.map((t) => (
          <div key={t.id} className="bg-[#111827] p-4 rounded-xl flex items-center justify-between border border-[#1e293b] shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A233A] flex items-center justify-center flex-shrink-0">
                {getIcon(t.category)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-200 mb-1 leading-tight">{t.merchant}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1e293b] text-gray-300 text-[10px] font-medium border border-[#2a344a]">
                    {t.category}
                  </span>
                  <span className="text-[10px] text-gray-500">{t.date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 ml-2">
               <span className={`text-sm font-bold tracking-wide whitespace-nowrap ${t.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                 {formatAmount(t.amount)}
               </span>
               <button 
                 onClick={() => onDelete(t.id)} 
                 className="text-gray-600 hover:text-red-500 transition-colors p-1"
               >
                 <Trash2 size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
