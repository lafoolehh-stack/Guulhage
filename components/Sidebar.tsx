
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: AppView.DASHBOARD, icon: 'fa-house', label: 'Dashboard' },
    { id: AppView.MENTOR, icon: 'fa-robot', label: 'Mentor' },
    { id: AppView.LANDING, icon: 'fa-right-from-bracket', label: 'Ka bax' },
  ];

  return (
    <aside className="w-full md:w-20 lg:w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 hidden lg:block">
        <h1 className="text-xl font-bold text-yellow-500 uppercase tracking-widest">Qaanuunka Guusha</h1>
      </div>
      <div className="p-4 flex md:flex-col items-center md:items-stretch justify-around md:justify-start gap-4 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <i className={`fas ${item.icon} text-xl`}></i>
            <span className="hidden lg:inline font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-6 hidden lg:block border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">© 2026 Qaanuunka Guusha</p>
      </div>
    </aside>
  );
};

export default Sidebar;
