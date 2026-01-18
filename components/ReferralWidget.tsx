
import React, { useState } from 'react';

interface ReferralWidgetProps {
  referralCode: string;
  referredCount: number;
  onSimulateReferral: (code: string) => void;
}

const ReferralWidget: React.FC<ReferralWidgetProps> = ({ referralCode, referredCount, onSimulateReferral }) => {
  const [friendCode, setFriendCode] = useState('');
  const [copied, setCopied] = useState(false);
  const progress = Math.min((referredCount / 3) * 100, 100);

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyFriendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendCode.trim()) return;
    onSimulateReferral(friendCode);
    setFriendCode('');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-3xl border border-yellow-500/30 shadow-xl text-white">
      <h3 className="text-lg font-bold mb-4 italic text-yellow-500">Kala qaybso Guusha!</h3>
      <p className="text-xs text-gray-400 mb-6">Soo xiri 3 saaxiib oo cusub, waxaadna heli doontaa 1 bil oo Premium ah oo bilaash ah.</p>

      <div className="bg-gray-800 p-4 rounded-2xl flex justify-between items-center mb-6 border border-gray-700">
        <div>
          <span className="text-[10px] text-gray-500 block uppercase">Koodkaaga:</span>
          <span className="text-xl font-black tracking-widest text-white">{referralCode}</span>
        </div>
        <button 
          onClick={copyCode}
          className={`${copied ? 'bg-green-500' : 'bg-yellow-500'} text-black px-4 py-2 rounded-xl font-bold text-sm transition-colors`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Horumarkaaga</span>
          <span className="font-bold text-yellow-500">{referredCount} / 3 Saaxiib</span>
        </div>
        <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-yellow-500 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(234,179,8,0.3)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-center text-gray-500 italic">
        Markaad 3 gaarto, Premium-ka si otomaatig ah ayuu kuugu furmayaa.
      </p>

      {/* Demo Simulation Tool */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <form onSubmit={handleApplyFriendCode} className="space-y-2">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Ma haysaa koodka saaxiib? (Test Demo)</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Geli koodka..."
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-xs text-gray-300 focus:border-yellow-500 outline-none font-bold"
            />
            <button 
              type="submit"
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-600 transition"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralWidget;
