import { useState, useMemo } from 'react';
import { Plus, Lock } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';
import { useRole } from '../../context/RoleContext';
import DesktopFilters from './DesktopFilters';
import TransactionsTable from './TransactionsTable';
import MetricsCards from './MetricsCards';
import MobileSummaryCard from './MobileSummaryCard';
import MobileTransactionsList from './MobileTransactionsList';
import AddTransactionModal from './AddTransactionModal';

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const { themeClasses } = useTheme();
  const { userRole } = useRole();
  const [filterType, setFilterType] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewerMessage, setShowViewerMessage] = useState(false);

  // Live filtering engine over state mock data
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Mobile search filter
      if (searchQuery && !t.merchant.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Desktop dropdown filters
      if (filterType !== 'All Types' && t.type !== filterType) return false;
      if (filterCategory !== 'All Categories' && t.category !== filterCategory) return false;
      
      return true;
    }).sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate)); // Keep newest on top
  }, [transactions, filterType, filterCategory, searchQuery]);

  const handleClearFilters = () => {
    setFilterType('All Types');
    setFilterCategory('All Categories');
    setSearchQuery('');
  };

  return (
    <div className="p-4 lg:p-8 lg:pt-8 w-full max-w-[1200px] mx-auto pb-20 lg:pb-8">
      {/* Header logic adjusts for Mobile/Desktop slightly */}
      <div className="flex justify-between items-start lg:items-center mb-6 lg:mb-8">
        <div className="hidden lg:block">
          <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>Transactions</h1>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Monitor and manage all fiscal movements across your portfolios.</p>
        </div>
        
        {/* Buttons shared across modes depending on UI mockup structure */}
        {userRole === 'admin' ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        ) : (
          <button 
            onClick={() => setShowViewerMessage(true)}
            className="w-full lg:w-auto bg-gray-400 cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <Lock size={18} />
            Add Transaction
          </button>
        )}
      </div>

      {/* MOBILE SPECIFIC UI */}
      <MobileSummaryCard />
      <MobileTransactionsList 
        transactions={filteredTransactions} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onDelete={deleteTransaction}
      />

      {/* DESKTOP SPECIFIC UI */}
      <DesktopFilters 
        filterType={filterType} setFilterType={setFilterType}
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        onClearFilters={handleClearFilters}
      />
      <TransactionsTable 
        transactions={filteredTransactions} 
        onDelete={deleteTransaction}
      />
      <MetricsCards />

      {/* MODAL Overlay */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTransaction} 
      />

      {/* Viewer Mode Message */}
      {showViewerMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300 p-4">
          <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-300`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Lock className="text-blue-500" size={24} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2`}>Viewer Mode</h3>
                <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                  You're in Viewer Mode and can only view transactions. To add, edit, or delete transactions, switch to Admin Panel in the top right corner.
                </p>
                <button
                  onClick={() => setShowViewerMessage(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
