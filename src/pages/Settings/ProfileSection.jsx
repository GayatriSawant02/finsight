export default function ProfileSection() {
  return (
    <div className="bg-[#0E1524] rounded-xl p-6 border border-[#1E293B] flex flex-col md:flex-row gap-8 items-start h-full">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#1E293B] border-2 border-[#2A344A] p-1 mb-3">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" 
            alt="Julian Vane" 
            className="w-full h-full object-cover rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500"
          />
        </div>
        <button className="text-[10px] text-gray-400 hover:text-white uppercase tracking-wider font-bold transition-colors">
          Update Photo
        </button>
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-lg font-bold text-white mb-6">Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue="Julian Vane" 
              className="w-full bg-[#0B101A] border border-[#1E293B] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue="julian.v@finsight.com" 
              className="w-full bg-[#0B101A] border border-[#1E293B] rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          Save Changes
        </button>
      </div>
    </div>
  );
}
