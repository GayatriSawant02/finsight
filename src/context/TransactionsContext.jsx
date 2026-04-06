/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from 'react';
import { initialTransactions } from '../pages/Transactions/mockData';

const TransactionsContext = createContext();

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = (transaction) => {
  
    // In our logic, Income > 0, Expenses < 0.
    let amt = parseFloat(transaction.amount);
    if (transaction.type === 'Expenses' && amt > 0) amt = -amt;
    if (transaction.type === 'Income' && amt < 0) amt = Math.abs(amt);
    
    setTransactions(prev => [{ ...transaction, amount: amt }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Current month calculation fixed to March 2026
  const currentMonthTransactions = useMemo(() => {
    const currentMonth = 2; // March is 2 (0-indexed)
    const currentYear = 2026;
    return transactions.filter(t => {
      const d = new Date(t.rawDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  }, [transactions]);

  const monthlyIncome = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthTransactions]);

  const monthlyExpenses = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === 'Expenses')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [currentMonthTransactions]);

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    monthlyIncome,
    monthlyExpenses,
    currentMonthTransactions
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}
