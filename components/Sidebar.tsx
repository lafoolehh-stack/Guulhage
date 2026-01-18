
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isPremium?: boolean;
  isConsultant?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isPremium, isConsultant }) => {
  const items = [
    { id: AppView.DASHBOARD, icon: 'fa-house', label: 'Dashboard' },
    { id: AppView.REELS, icon: 'fa-play', label: 'Shorts' },
    { id: AppView.CONSULTANTS, icon: 'fa-user-tie', label: 'Hub' },
    ...(isConsultant ? [{ id: AppView.CONSULTANT_DASHBOARD, icon: 'fa-chart-pie', label: 'Expert' }] : []),
    { id: AppView.MENTOR, icon: 'fa-robot', label: 'Mentor' },
    { id: AppView.LEADERBOARD, icon: 'fa-trophy', label: 'Tartanka' },
    { id: AppView.PREMIUM, icon: 'fa-gem', label: 'Premium', special: true },
    { id: AppView.ADMIN, icon: 'fa-user-gear', label: 'Admin', adminOnly: true },
    { id: AppView.LANDING, icon: 'fa-right-from-bracket', label: 'Ka bax' },
  ];

  return (
    <aside className="w-full md:w-20 lg:w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-8 hidden lg:block">
        <h1 className="text-2xl font-black text-yellow-500 uppercase tracking-tighter italic">GUULHAGE</h1>
        {isPremium && (
          <span className="text-[10px] font-black text-yellow-500/60 uppercase tracking-widest mt-1 block">
            <i className="fas fa-star mr-1"></i> Mastery Member
          </span>
        )}
      </div>
      <div className="p-4 flex md:flex-col items-center md:items-stretch justify-around md:justify-start gap-4 flex-1">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl transition-all relative group ${
                isActive 
                  ? 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20' 
                  : item.special && !isPremium
                    ? 'text-yellow-500 hover:bg-yellow-500/10 border border-yellow-500/20'
                    : item.adminOnly
                      ? 'text-red-400 hover:bg-red-500/10 border border-red-500/10'
                      : 'text-gray-500 hover:bg-gray-700 hover:text-gray-200'
              }`}
            >
              <i className={`fas ${item.icon} text-xl`}></i>
              <span className="hidden lg:inline font-black italic uppercase tracking-widest text-xs">{item.label}</span>
              {item.special && !isPremium && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
      <div className="p-8 hidden lg:block border-t border-gray-700">
        <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-widest">© 2026 Qaanuunka Guusha</p>
      </div>
    </aside>
  );
};

export default Sidebar;
