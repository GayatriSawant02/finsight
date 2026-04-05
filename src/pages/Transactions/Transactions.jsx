import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import DesktopFilters from './DesktopFilters';
import TransactionsTable from './TransactionsTable';
import MetricsCards from './MetricsCards';
import MobileSummaryCard from './MobileSummaryCard';
import MobileTransactionsList from './MobileTransactionsList';
import AddTransactionModal from './AddTransactionModal';

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [filterType, setFilterType] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1 className="text-2xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-gray-400 text-sm">Monitor and manage all fiscal movements across your portfolios.</p>
        </div>
        
        {/* Buttons shared across modes depending on UI mockup structure */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} />
          Add Transaction
        </button>
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
    </div>
  );
}
