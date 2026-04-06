import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';

export default function SpendingTrends() {
  const { transactions } = useTransactions();
  const { themeClasses } = useTheme();

  const data = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        fullDate: date,
        expenses: 0,
        income: 0
      });
    }

    transactions.forEach(t => {
      const tDate = new Date(t.rawDate);
      const monthIndex = months.findIndex(m => 
        m.fullDate.getMonth() === tDate.getMonth() && 
        m.fullDate.getFullYear() === tDate.getFullYear()
      );
      if (monthIndex !== -1) {
        if (t.type === 'Expenses') {
          months[monthIndex].expenses += Math.abs(t.amount);
        } else if (t.type === 'Income') {
          months[monthIndex].income += t.amount;
        }
      }
    });

    return months.map(m => ({
      month: m.month,
      expenses: Math.round(m.expenses),
      income: Math.round(m.income),
      savings: Math.round(m.income - m.expenses)
    }));
  }, [transactions]);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-4 lg:p-6 border ${themeClasses.cardBorder}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={20} />
          <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Spending Trends</h3>
        </div>
        <span className="text-sm text-gray-400">Last 6 months</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis 
              dataKey="month" 
              stroke="#64748B" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0E1524',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
              formatter={(value, name) => [
                `$${value.toLocaleString()}`,
                name === 'expenses' ? 'Expenses' : name === 'income' ? 'Income' : 'Savings'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-400">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-400">Savings</span>
        </div>
      </div>
    </div>
  );
}