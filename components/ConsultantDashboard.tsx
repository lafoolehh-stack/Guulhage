
import React from 'react';

interface ConsultantDashboardProps {
  onBack: () => void;
  onOpenChat: (clientName: string) => void;
}

const ConsultantDashboard: React.FC<ConsultantDashboardProps> = ({ onBack, onOpenChat }) => {
  const stats = {
    earnings: 1450.00,
    bookings: 12,
    unreadMessages: 3
  };

  const messages = [
    { id: 1, sender: "Zohaib", text: "Waan u baahanahay latalin maalgashi...", time: "2m ago", initial: "Z", color: "bg-blue-500" },
    { id: 2, sender: "Ahmed", text: "Goormaan bilaabi karnaa kalfadhiga?", time: "15m ago", initial: "A", color: "bg-purple-500" },
    { id: 3, sender: "Fartuun", text: "Mahadsanid macallin, aad baan u bogay.", time: "1h ago", initial: "F", color: "bg-green-500" }
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen p-5 animate-fade-in lg:max-w-4xl lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Ku soo dhowaad, Nur!</h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Expert Dashboard-kaaga maanta</p>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
            className="w-14 h-14 rounded-2xl object-cover border-2 border-yellow-500 shadow-xl"
            alt="Profile"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl group hover:border-yellow-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <i className="fas fa-wallet text-yellow-500 text-xs"></i>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Dakhliga (Earnings)</span>
          </div>
          <p className="text-2xl font-black text-yellow-500 italic tracking-tighter">${stats.earnings.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl group hover:border-white/20 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <i className="fas fa-calendar-check text-blue-500 text-xs"></i>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ballamaha (Bookings)</span>
          </div>
          <p className="text-2xl font-black text-white italic tracking-tighter">{stats.bookings} Cusub</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="text-white font-black italic uppercase tracking-tighter flex items-center text-lg">
            <span className="mr-3 text-yellow-500 underline decoration-2 underline-offset-4">Fariimaha Macaamiisha</span>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-lg shadow-red-500/20">{stats.unreadMessages}</span>
          </h3>
          <button className="text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition">Arag Dhammaan</button>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <button 
              key={msg.id}
              onClick={() => onOpenChat(msg.sender)}
              className="w-full flex items-center justify-between bg-gray-800 p-5 rounded-[2rem] border-l-4 border-yellow-500 hover:bg-gray-750 transition-all group shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${msg.color} rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-inner`}>
                  {msg.initial}
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-yellow-500 transition-colors">{msg.sender}</p>
                  <p className="text-[10px] text-gray-400 font-medium truncate w-40 md:w-64">"{msg.text}"</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{msg.time}</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 ml-auto"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Quick Tools */}
      <div className="mt-12 pt-10 border-t border-gray-800 grid grid-cols-2 gap-4">
        <button className="p-5 bg-gray-800 rounded-3xl border border-gray-700 text-left hover:border-yellow-500 transition-all">
          <i className="fas fa-gear text-gray-500 mb-2"></i>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Settings</p>
        </button>
        <button onClick={onBack} className="p-5 bg-gray-800 rounded-3xl border border-gray-700 text-left hover:border-gray-500 transition-all">
          <i className="fas fa-arrow-right-from-bracket text-gray-500 mb-2"></i>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">User Mode</p>
        </button>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
