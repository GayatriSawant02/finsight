import { Utensils, Plane, ShoppingCart, CreditCard, ArrowRight, ArrowLeft, Trash2, Edit2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useRole } from '../../context/RoleContext';

export default function TransactionsTable({ transactions, onDelete }) {
  const { themeClasses } = useTheme();
  const { userRole } = useRole();
  const getIcon = (category) => {
    switch(category) {
      case 'Food': return <Utensils size={16} className="text-orange-500" />;
      case 'Travel': return <Plane size={16} className="text-blue-500" />;
      case 'Shopping': return <ShoppingCart size={16} className="text-emerald-500" />;
      case 'Others': return <CreditCard size={16} className="text-violet-500" />;
      default: return <CreditCard size={16} className="text-gray-400" />;
    }
  };

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    const abs = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return isNegative ? `-$${abs}` : `+$${abs}`;
  };

  return (
    <div className={`hidden lg:block ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-xl overflow-hidden mb-6`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${themeClasses.cardBorder} ${themeClasses.bgSecondary}`}>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider w-[120px]`}>Date</th>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider`}>Merchant / Entity</th>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider w-[150px]`}>Category</th>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider w-[150px]`}>Type</th>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider w-[150px] text-right`}>Amount</th>
              <th className={`py-4 px-6 text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-wider w-[100px] text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan="6" className={`py-12 text-center ${themeClasses.textMuted} font-medium`}>No transactions found matching your criteria.</td>
              </tr>
            )}
            {transactions.map((t) => (
              <tr key={t.id} className={`border-b ${themeClasses.cardBorder} hover:${themeClasses.bgSecondary} transition-colors group`}>
                <td className={`py-4 px-6 text-sm ${themeClasses.textSecondary}`}>{t.date}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${themeClasses.bgSecondary} flex items-center justify-center`}>
                      {getIcon(t.category)}
                    </div>
                    <span className={`text-sm font-semibold ${themeClasses.textPrimary}`}>{t.merchant}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded ${themeClasses.bgSecondary} ${themeClasses.textPrimary} text-xs font-medium border ${themeClasses.cardBorder}`}>
                    {t.category}
                  </span>
                </td>
                <td className={`py-4 px-6 text-sm ${themeClasses.textSecondary}`}>{t.type}</td>
                <td className={`py-4 px-6 text-sm font-bold text-right tracking-wide ${t.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {formatAmount(t.amount)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {userRole === 'admin' && (
                      <>
                        <button className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors`} title="Edit (Static view)">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete(t.id)} 
                          className="text-gray-500 hover:text-red-500 transition-colors" 
                          title="Delete Transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                    {userRole === 'viewer' && (
                      <span className={`text-xs ${themeClasses.textMuted} font-medium`}>View Only</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length > 0 && (
        <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-gray-500">
          <span>Showing {transactions.length} of {transactions.length} transactions</span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:text-white disabled:opacity-50" disabled><ArrowLeft size={14}/></button>
            <button className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-medium">1</button>
            <button className="p-1 hover:text-white disabled:opacity-50" disabled><ArrowRight size={14}/></button>
          </div>
        </div>
      )}
    </div>
  );
}
