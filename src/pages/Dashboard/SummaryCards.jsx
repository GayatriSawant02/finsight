import { Building2, Landmark, ShoppingBag, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactions } from '../../context/TransactionsContext';

export default function SummaryCards() {
  const { monthlyIncome, monthlyExpenses, transactions } = useTransactions();
  
  // Basic mock static total balance base PLUS net income over full period
  const allTimeNet = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = 1240582.00 + allTimeNet;

  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  const cards = [
    {
      title: 'TOTAL BALANCE',
      value: `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+2.4%', // Keeping mock percent
      isPositive: true,
      icon: Building2,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'MONTHLY INCOME',
      value: `$${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+1.2%',
      isPositive: true,
      icon: Landmark,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'MONTHLY EXPENSES',
      value: `$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '-4%',
      isPositive: false,
      icon: ShoppingBag,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    {
      title: 'SAVINGS RATE',
      value: `${savingsRate.toFixed(1)}%`,
      change: '',
      isPositive: null,
      icon: PiggyBank,
      color: 'text-gray-400',
      bg: 'bg-gray-800',
      progress: true,
      progressVal: savingsRate
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-[#0E1524] rounded-xl p-5 border border-[#151C2C] flex flex-col justify-between h-[120px]">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={card.color} size={16} />
              </div>
              {card.change && (
                <div className={`text-xs font-semibold flex items-center gap-1 ${card.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {card.change}
                </div>
              )}
              {card.progress && (
                <div className="w-12 h-1.5 bg-[#151C2C] rounded-full overflow-hidden border border-[#1E293B]">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.max(0, card.progressVal)}%` }}></div>
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wider mb-1 uppercase">{card.title}</p>
              <h3 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
