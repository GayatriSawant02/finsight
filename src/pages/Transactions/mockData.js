export const CATEGORIES = ['All Categories', 'Food', 'Travel', 'Shopping', 'Others'];
export const TYPES = ['All Types', 'Income', 'Expenses'];

export const initialTransactions = [
  // Current Month (March 2026)
  { id: 1, date: 'Mar 28, 2026', rawDate: '2026-03-28', merchant: 'Whole Foods Market', category: 'Food', type: 'Expenses', amount: -420.00 },
  { id: 2, date: 'Mar 25, 2026', rawDate: '2026-03-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 3, date: 'Mar 19, 2026', rawDate: '2026-03-19', merchant: 'Delta Airlines', category: 'Travel', type: 'Expenses', amount: -650.00 },
  { id: 4, date: 'Mar 15, 2026', rawDate: '2026-03-15', merchant: 'Apple Store', category: 'Shopping', type: 'Expenses', amount: -1150.00 },
  
  // Previous months
  { id: 5, date: 'Feb 25, 2026', rawDate: '2026-02-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 6, date: 'Feb 12, 2026', rawDate: '2026-02-12', merchant: 'Uber Rides', category: 'Travel', type: 'Expenses', amount: -140.00 },
  { id: 7, date: 'Feb 05, 2026', rawDate: '2026-02-05', merchant: 'Freelance Project', category: 'Others', type: 'Income', amount: 2400.00 },
  
  { id: 8, date: 'Jan 25, 2026', rawDate: '2026-01-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 9, date: 'Jan 02, 2026', rawDate: '2026-01-02', merchant: 'Target Shopping', category: 'Shopping', type: 'Expenses', amount: -210.00 },
  
  { id: 10, date: 'Dec 25, 2025', rawDate: '2025-12-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 11, date: 'Dec 20, 2025', rawDate: '2025-12-20', merchant: 'Trader Joes', category: 'Food', type: 'Expenses', amount: -380.00 },
  
  { id: 12, date: 'Nov 25, 2025', rawDate: '2025-11-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 13, date: 'Nov 15, 2025', rawDate: '2025-11-15', merchant: 'Amazon Shopping', category: 'Shopping', type: 'Expenses', amount: -450.00 },

  // Expanded to include Oct and Sept 2025
  { id: 14, date: 'Oct 25, 2025', rawDate: '2025-10-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 15, date: 'Oct 12, 2025', rawDate: '2025-10-12', merchant: 'Netflix', category: 'Others', type: 'Expenses', amount: -15.00 },
  
  { id: 16, date: 'Sep 25, 2025', rawDate: '2025-09-25', merchant: 'TechCorp Salary', category: 'Others', type: 'Income', amount: 8500.00 },
  { id: 17, date: 'Sep 05, 2025', rawDate: '2025-09-05', merchant: 'Restaurant', category: 'Food', type: 'Expenses', amount: -150.00 }
];
