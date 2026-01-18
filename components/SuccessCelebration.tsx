
import React from 'react';

interface SuccessCelebrationProps {
  onContinue: () => void;
  xpBonus: number;
}

const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({ onContinue, xpBonus }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="max-w-md w-full">
        <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-6xl shadow-2xl relative">
                👑
            </div>
        </div>

        <h1 className="text-4xl font-black text-white italic mb-4 tracking-tighter uppercase">HAMBALYO, GUULHAGE!</h1>
        <p className="text-gray-400 text-sm mb-10 px-4 leading-relaxed font-medium">
            Hadda waxaad tahay xubin <strong className="text-yellow-500">PRO</strong> ah. Albaabadii aqoonta iyo xornimada maaliyadda waa kuu furan yihiin. Safarkaagu hadda ayuu dhab u bilowday.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-12">
            <div className="bg-gray-800 p-6 rounded-3xl border border-yellow-500/30 shadow-xl">
                <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Bonus XP</span>
                <span className="text-2xl font-black text-yellow-500">+{xpBonus}</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-3xl border border-yellow-500/30 shadow-xl">
                <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Status</span>
                <span className="text-2xl font-black text-yellow-500 italic">PRO</span>
            </div>
        </div>

        <button 
          onClick={onContinue}
          className="w-full py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition transform hover:scale-105 shadow-2xl shadow-yellow-500/30 uppercase tracking-widest text-sm"
        >
            BILOW HEERKA 2AAD <i className="fas fa-rocket ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default SuccessCelebration;
