import { useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, TYPES } from './mockData';

export default function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    merchant: '',
    date: '',
    amount: '',
    category: CATEGORIES[1],
    type: TYPES[1]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.merchant || !formData.date || !formData.amount) return;

    // Formatting date safely
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    onAdd({
      id: Date.now(),
      merchant: formData.merchant,
      date: formattedDate,
      rawDate: formData.date,
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount)
    });
    
    // Reset and close
    setFormData({ merchant: '', date: '', amount: '', category: CATEGORIES[1], type: TYPES[1] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0E1524] border border-[#1E293B] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#1E293B] bg-[#0A0F1D]">
          <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium tracking-wider">Merchant / Entity Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-[#111827] border border-[#1E293B] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. Apex Holdings"
              value={formData.merchant}
              onChange={(e) => setFormData({...formData, merchant: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium tracking-wider">Date</label>
              <input 
                required
                type="date" 
                className="w-full bg-[#111827] border border-[#1E293B] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium tracking-wider">Amount ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full bg-[#111827] border border-[#1E293B] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="-500.00 or 1200"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium tracking-wider">Category</label>
              <select 
                className="w-full bg-[#111827] border border-[#1E293B] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-blue-500 appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium tracking-wider">Type</label>
              <select 
                className="w-full bg-[#111827] border border-[#1E293B] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-blue-500 appearance-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {TYPES.slice(1).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#1E293B] flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
