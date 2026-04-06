import { useState } from 'react';
import jsPDF from 'jspdf';
import { useTransactions } from '../context/TransactionsContext';

export const usePDFExport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { transactions } = useTransactions();

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      console.log('Starting PDF generation...');

      // Create PDF with better error handling
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Add header background
      pdf.setFillColor(14, 21, 36); // #0E1524
      pdf.rect(0, 0, pageWidth, 30, 'F');

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.text('FinSight Financial Report', 20, 20);

      // Add date
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 27);

      yPosition = 45;

      // Calculate comprehensive data
      const currentMonth = 2; // March (0-indexed)
      const currentYear = 2026;
      const lastMonth = 1; // February
      const lastYear = 2026;

      // Current month data
      const currentMonthTransactions = transactions.filter(t => {
        const tDate = new Date(t.rawDate);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      });

      // Last month data for comparison
      const lastMonthTransactions = transactions.filter(t => {
        const tDate = new Date(t.rawDate);
        return tDate.getMonth() === lastMonth && tDate.getFullYear() === lastYear;
      });

      // Calculate metrics
      const currentIncome = currentMonthTransactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

      const currentExpenses = currentMonthTransactions
        .filter(t => t.type === 'Expenses')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const currentSavings = currentIncome - currentExpenses;
      const currentSavingsRate = currentIncome > 0 ? (currentSavings / currentIncome) * 100 : 0;

      const lastIncome = lastMonthTransactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

      const lastExpenses = lastMonthTransactions
        .filter(t => t.type === 'Expenses')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      // Add Summary Section
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Monthly Summary - March 2026', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.text(`Total Income: $${currentIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Total Expenses: $${currentExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Net Savings: $${currentSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Savings Rate: ${currentSavingsRate.toFixed(1)}%`, 25, yPosition);
      yPosition += 15;

      // Month-over-month comparison
      const incomeChange = lastIncome > 0 ? ((currentIncome - lastIncome) / lastIncome) * 100 : 0;
      const expenseChange = lastExpenses > 0 ? ((currentExpenses - lastExpenses) / lastExpenses) * 100 : 0;

      pdf.setFontSize(14);
      pdf.text('Month-over-Month Comparison', 20, yPosition);
      yPosition += 12;

      pdf.setFontSize(11);
      pdf.text(`Income Change: ${incomeChange >= 0 ? '+' : ''}${incomeChange.toFixed(1)}% from February`, 25, yPosition);
      yPosition += 7;
      pdf.text(`Expense Change: ${expenseChange >= 0 ? '+' : ''}${expenseChange.toFixed(1)}% from February`, 25, yPosition);
      yPosition += 15;

      // Add Expense Categories Breakdown
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.text('Expense Categories - March 2026', 20, yPosition);
      yPosition += 15;

      const categoryTotals = currentMonthTransactions
        .filter(t => t.type === 'Expenses')
        .reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
          return acc;
        }, {});

      const sortedCategories = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a);

      pdf.setFontSize(11);
      sortedCategories.forEach(([category, amount]) => {
        const percentage = currentExpenses > 0 ? (amount / currentExpenses * 100).toFixed(1) : 0;
        pdf.text(`${category}: $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)`, 25, yPosition);
        yPosition += 7;
      });

      yPosition += 10;

      // Add Income Sources Breakdown
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.text('Income Sources - March 2026', 20, yPosition);
      yPosition += 15;

      const incomeSources = currentMonthTransactions
        .filter(t => t.type === 'Income')
        .reduce((acc, t) => {
          // Group by merchant for income sources
          acc[t.merchant] = (acc[t.merchant] || 0) + t.amount;
          return acc;
        }, {});

      const sortedIncomeSources = Object.entries(incomeSources)
        .sort(([,a], [,b]) => b - a);

      pdf.setFontSize(11);
      sortedIncomeSources.forEach(([source, amount]) => {
        const percentage = currentIncome > 0 ? (amount / currentIncome * 100).toFixed(1) : 0;
        pdf.text(`${source}: $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)`, 25, yPosition);
        yPosition += 7;
      });

      yPosition += 10;

      // Add Recent Transactions
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.text('Recent Transactions - March 2026', 20, yPosition);
      yPosition += 15;

      const recentTransactions = currentMonthTransactions
        .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
        .slice(0, 15); // Show more transactions

      pdf.setFontSize(9);
      recentTransactions.forEach((transaction) => {
        const date = new Date(transaction.rawDate).toLocaleDateString();
        const amount = transaction.type === 'Income' ?
          `+$${transaction.amount.toFixed(2)}` :
          `-$${Math.abs(transaction.amount).toFixed(2)}`;

        const text = `${date} - ${transaction.merchant} (${transaction.category}) - ${amount}`;
        pdf.text(text, 25, yPosition);
        yPosition += 5;

        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
      });

      // Add 3-Month Trend Summary
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      pdf.setFontSize(16);
      pdf.text('3-Month Financial Trend', 20, yPosition);
      yPosition += 15;

      // Calculate 3-month data
      const months = [
        { name: 'January 2026', month: 0, year: 2026 },
        { name: 'February 2026', month: 1, year: 2026 },
        { name: 'March 2026', month: 2, year: 2026 }
      ];

      pdf.setFontSize(10);
      months.forEach(({ name, month, year }) => {
        const monthTransactions = transactions.filter(t => {
          const tDate = new Date(t.rawDate);
          return tDate.getMonth() === month && tDate.getFullYear() === year;
        });

        const monthIncome = monthTransactions
          .filter(t => t.type === 'Income')
          .reduce((sum, t) => sum + t.amount, 0);

        const monthExpenses = monthTransactions
          .filter(t => t.type === 'Expenses')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const monthSavings = monthIncome - monthExpenses;

        pdf.text(`${name}: Income: $${monthIncome.toLocaleString()}, Expenses: $${monthExpenses.toLocaleString()}, Savings: $${monthSavings.toLocaleString()}`, 25, yPosition);
        yPosition += 6;
      });

      // Add footer to all pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFillColor(14, 21, 36);
        pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Generated by FinSight - Your Personal Finance Companion', 20, pageHeight - 5);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 5);
      }

      // Save the PDF
      const fileName = `FinSight_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      console.log('PDF generated successfully');
      alert('PDF report generated successfully!');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate PDF: ${error.message}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating };
};