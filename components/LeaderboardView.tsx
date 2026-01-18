
import React from 'react';
import { UserProgress } from '../types';

interface Performer {
  name: string;
  xp: number;
  rank: string;
  isPremium: boolean;
  isCurrentUser?: boolean;
}

interface LeaderboardViewProps {
  onBack: () => void;
  currentUser: UserProgress;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBack, currentUser }) => {
  // Mock data combined with current user
  const topPerformers: Performer[] = [
    { name: "Zohaib", xp: 1250, rank: "Guulhage Grand Master", isPremium: true },
    { name: "Ahmed", xp: 1100, rank: "Hogaamiye", isPremium: false },
    { name: "Fartuun", xp: 950, rank: "Hogaamiye", isPremium: true },
    { name: "Muna", xp: 800, rank: "Arday", isPremium: false },
    { name: "Yaxye", xp: 750, rank: "Arday", isPremium: false },
    { 
      name: "Adiga", 
      xp: currentUser.xp, 
      rank: currentUser.rank, 
      isPremium: !!currentUser.isPremium,
      isCurrentUser: true 
    }
  ].sort((a, b) => b.xp - a.xp);

  const podium = topPerformers.slice(0, 3);
  const others = topPerformers.slice(3);

  return (
    <div className="p-6 lg:p-12 max-w-4xl mx-auto space-y-12 animate-fade-in">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-yellow-500 font-black text-3xl tracking-tighter italic uppercase underline decoration-4 underline-offset-8">TARTANKA GUULHA</h1>
        </div>
        <div className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-4 py-2 rounded-full border border-yellow-500/20 uppercase tracking-widest">
          Todobaadkan
        </div>
      </header>

      {/* Podium Section */}
      <div className="flex justify-center items-end gap-2 md:gap-6 pt-10 pb-6">
        {/* 2nd Place */}
        {podium[1] && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full border-2 border-gray-600 flex items-center justify-center text-2xl relative mb-2">
               {podium[1].isPremium ? '💎' : '👤'}
               <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-900">2</span>
            </div>
            <p className="text-xs font-black italic text-gray-300 truncate w-20 text-center">{podium[1].name}</p>
            <p className="text-[10px] font-bold text-gray-500">{podium[1].xp} XP</p>
            <div className="w-16 md:w-24 h-24 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-xl mt-2"></div>
          </div>
        )}

        {/* 1st Place */}
        {podium[0] && (
          <div className="flex flex-col items-center transform -translate-y-4">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-800 rounded-full border-4 border-yellow-500 flex items-center justify-center text-4xl relative mb-2 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
               👑
               <span className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-xl">1</span>
            </div>
            <p className="text-sm font-black italic text-yellow-500 truncate w-24 text-center">{podium[0].name}</p>
            <p className="text-xs font-bold text-gray-400">{podium[0].xp} XP</p>
            <div className="w-20 md:w-32 h-32 bg-gradient-to-t from-yellow-600/20 to-yellow-500 rounded-t-xl mt-2 flex items-end justify-center pb-4">
               <i className="fas fa-trophy text-black text-2xl"></i>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {podium[2] && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full border-2 border-orange-800/50 flex items-center justify-center text-2xl relative mb-2">
               {podium[2].isPremium ? '💎' : '👤'}
               <span className="absolute -top-2 -right-2 bg-orange-800 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-900">3</span>
            </div>
            <p className="text-xs font-black italic text-gray-300 truncate w-20 text-center">{podium[2].name}</p>
            <p className="text-[10px] font-bold text-gray-500">{podium[2].xp} XP</p>
            <div className="w-16 md:w-24 h-16 bg-gradient-to-t from-gray-800 to-orange-900/20 rounded-t-xl mt-2"></div>
          </div>
        )}
      </div>

      {/* List Section */}
      <div className="bg-gray-800 rounded-[2.5rem] border-2 border-gray-700 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-700 bg-gray-800/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Kala Saraynta</h3>
          <span className="text-[10px] text-gray-600 font-bold uppercase">Maanta</span>
        </div>
        <div className="divide-y divide-gray-700">
          {topPerformers.map((user, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-5 transition-colors ${user.isCurrentUser ? 'bg-yellow-500/5 border-l-4 border-yellow-500' : 'hover:bg-gray-700/30'}`}
            >
              <div className="w-8 text-center font-black italic text-gray-500">#{index + 1}</div>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-lg border border-gray-700">
                {user.isPremium ? '💎' : '👤'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`font-black italic uppercase tracking-tighter truncate ${user.isCurrentUser ? 'text-yellow-500' : 'text-white'}`}>
                    {user.name}
                  </h4>
                  {user.isPremium && (
                    <span className="bg-yellow-500/10 text-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded border border-yellow-500/20">PRO</span>
                  )}
                </div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{user.rank}</p>
              </div>
              <div className="text-right">
                <p className="font-black italic text-yellow-500">{user.xp}</p>
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
        Dhamaystir qawaaniin badan si aad kor ugu soo kacdo!
      </p>
    </div>
  );
};

export default LeaderboardView;
