
import React from 'react';
import { Law, UserProgress, AppView } from '../types';
import DailyWidget from './DailyWidget';
import FocusTimer from './FocusTimer';
import SocialProofTool from './SocialProofTool';
import ReferralWidget from './ReferralWidget';
import { LEVELS } from '../constants';

interface DashboardProps {
  laws: Law[];
  progress: UserProgress;
  onSelectLaw: (law: Law) => void;
  onOpenMentor: () => void;
  onOpenPremium: () => void;
  onToggleDailyTask: (id: string) => void;
  onAddCustomTask: (label: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  onApplyReferral: (code: string) => void;
  onAwardXP: (amount: number) => void;
}

const guidanceData = {
  finance: {
    mentorMsg: "Aad u fiican. Maanta aan diiradda saarno 'Qaanuunka Qiimaha'. Waa kuwan tallaabooyinkaaga:",
    tasks: [
      "Aqoonso hal xirfad oo aad 10-laab kordhin karto.",
      "Xal u raadi dhibaato hal macmiil haysata.",
      "Diiwaangeli dakhligaaga iyo kharashka maanta."
    ]
  },
  productivity: {
    mentorMsg: "Waa markii aan baabi'in lahayn dib-u-dhigashada. Maanta dib ha u dhigan:",
    tasks: [
      "Cun 'Rahii' ugu weyn (Hawsha ugu adag saaka).",
      "Dhis 5-minute momentum hawl aad necebtahay.",
      "Dami dhammaan notifications-ka inta aad shaqaynayso."
    ]
  },
  social: {
    mentorMsg: "Aan dhisno saamayntaada. Marqaatiga bulshadu waa furaha:",
    tasks: [
      "Weydiiso marqaati (Review) macmiil hore.",
      "La xiriir hal qof oo aad wax u qaban karto.",
      "Muuji natiijo muuqata oo aad hore u gaartay."
    ]
  }
};

const Dashboard: React.FC<DashboardProps> = ({ 
  laws, 
  progress, 
  onSelectLaw, 
  onOpenMentor, 
  onOpenPremium,
  onToggleDailyTask,
  onAddCustomTask,
  onDeleteTask,
  onUpdateProgress,
  onApplyReferral,
  onAwardXP
}) => {
  const currentGuidance = progress.selectedGuidance ? guidanceData[progress.selectedGuidance] : null;

  const handleStartGuidance = (category: 'finance' | 'productivity' | 'social') => {
    onUpdateProgress({ selectedGuidance: category });
  };

  const resetGuidance = () => {
    onUpdateProgress({ selectedGuidance: undefined });
  };

  const handleSessionComplete = (rewardCoins: number) => {
    onUpdateProgress({ coins: progress.coins + rewardCoins });
    onAwardXP(50);
  };

  // Gamification: Calculate next rank threshold
  const getNextThreshold = (xp: number) => {
    if (xp < 500) return 500;
    if (xp < 1000) return 1000;
    return xp; // Max rank reached
  };

  const nextThreshold = getNextThreshold(progress.xp);
  const xpProgress = nextThreshold > 0 ? (progress.xp / nextThreshold) * 100 : 100;

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* Guulhage Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-yellow-500 font-black text-3xl tracking-tighter italic uppercase">GUULHAGE</h1>
          {progress.isPremium && (
             <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-3 py-1 rounded-full border border-yellow-500/20 uppercase tracking-widest">
               MASTER
             </span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* XP & Rank Display (Condensed in header) */}
          <div className="bg-gray-800 p-4 rounded-3xl border border-gray-700 flex flex-col min-w-[180px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{progress.rank}</span>
              <span className="text-[10px] font-black text-yellow-500">{progress.xp} XP</span>
            </div>
            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-1000 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-800 px-4 py-2 rounded-2xl text-xs font-bold border border-gray-700 flex items-center gap-2">
            <span className="text-yellow-500">🏆</span> {progress.coins} Coins
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-2xl text-xs font-bold border border-gray-700 flex items-center gap-2">
            <span>🔥</span> {progress.streak || 0} Days
          </div>
        </div>
      </header>

      {/* Mentor Section */}
      <div className="mb-10">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg text-black font-black flex-shrink-0">
            G
          </div>
          <div className="bg-gray-800 p-6 rounded-3xl rounded-tl-none border-l-4 border-yellow-500 shadow-xl flex-1 max-w-3xl">
            <p className="text-lg font-medium leading-relaxed">
              {currentGuidance 
                ? currentGuidance.mentorMsg 
                : "Subax wanaagsan, Geesi! Maanta xaggee ayaan kugu hagaa?"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Premium Banner CTA */}
          {!progress.isPremium && (
            <button 
              onClick={onOpenPremium}
              className="w-full bg-gradient-to-r from-yellow-500/20 to-gray-800 p-8 rounded-[2.5rem] border border-yellow-500/30 text-left group flex justify-between items-center transition-all hover:border-yellow-500"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-yellow-500">Geli Heerka Sare</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Unlock Premium features and advanced mentorship.</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                <i className="fas fa-gem"></i>
              </div>
            </button>
          )}
          
          {/* Journey Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black mb-8 text-yellow-500 tracking-tighter italic uppercase">GUULHAGE JOURNEY</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {LEVELS.map((level) => {
                const isUnlocked = progress.unlockedLevels.includes(level.id);
                const levelLaws = laws.filter(l => level.lawIds.includes(l.id));
                const completedInLevel = levelLaws.filter(l => progress.completedLaws.includes(l.id)).length;

                return (
                  <div 
                    key={level.id} 
                    className={`relative p-8 bg-gray-800 rounded-[2.5rem] border-2 transition-all duration-300 ${
                      isUnlocked 
                        ? 'border-yellow-500 shadow-xl shadow-yellow-500/5' 
                        : 'border-gray-700 opacity-60 grayscale'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className={`${
                        isUnlocked ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-400'
                      } text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest`}>
                        Heerka {level.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs font-bold uppercase">{completedInLevel}/{levelLaws.length} Qaanuun</span>
                        {!isUnlocked && <i className="fas fa-lock text-gray-500 ml-2"></i>}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-3 italic">{level.title}</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-lg">
                      {level.id === 1 && "Dhis maskaxda guusha iyo garashada nafta."}
                      {level.id === 2 && "Ka guulaysato caajiska iyo dib-u-dhigashada."}
                      {level.id === 3 && "Dhis xiriirka iyo hoggaaminta."}
                      {level.id === 4 && "Ku gaar xornimo dhaqaale xirfado sare."}
                      {level.id === 5 && "Dhis dhaxal waara oo kaa dambeeya."}
                    </p>

                    {isUnlocked ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {levelLaws.map((law) => {
                            const isCompleted = progress.completedLaws.includes(law.id);
                            return (
                              <button
                                key={law.id}
                                onClick={() => onSelectLaw(law)}
                                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                                  isCompleted 
                                    ? 'bg-green-500/5 border-green-500/30' 
                                    : 'bg-gray-900 border-gray-700 hover:border-yellow-500/50'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-yellow-500'
                                }`}>
                                  <i className={`fas ${law.icon} text-sm`}></i>
                                </div>
                                <span className={`font-bold text-xs truncate ${isCompleted ? 'text-green-500' : 'text-gray-300'}`}>
                                  {law.title}
                                </span>
                                {isCompleted && <i className="fas fa-check-circle text-green-500 text-xs ml-auto"></i>}
                              </button>
                            );
                          })}
                        </div>
                        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 transition-all duration-1000" 
                            style={{ width: `${(completedInLevel / levelLaws.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button disabled className="w-full py-4 bg-gray-700 text-gray-500 font-black rounded-2xl cursor-not-allowed uppercase tracking-widest text-sm">
                        Wali waa xiranyahay
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Guidance Options (Condensed) */}
          <section className="bg-gray-800 p-8 rounded-[2.5rem] border-2 border-gray-700">
             <h3 className="text-xl font-black mb-6 italic text-gray-400">DOORO JIHA-HAGISTA</h3>
             {!progress.selectedGuidance ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => handleStartGuidance('finance')} className="flex-1 bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all group text-left">
                    <span className="block text-yellow-500 font-black italic mb-1">💰 MAALIYADDA</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Xirfadaha Lacagta</span>
                  </button>
                  <button onClick={() => handleStartGuidance('productivity')} className="flex-1 bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all group text-left">
                    <span className="block text-yellow-500 font-black italic mb-1">⚡ WAX-SOO-SAAR</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Awoodda Ficilka</span>
                  </button>
                  <button onClick={() => handleStartGuidance('social')} className="flex-1 bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all group text-left">
                    <span className="block text-yellow-500 font-black italic mb-1">🤝 SAAMAYN</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Dhisidda Sumcad</span>
                  </button>
                </div>
             ) : (
               <div className="animate-fade-in space-y-6">
                  {progress.selectedGuidance === 'social' && (
                    <div className="mb-6">
                       <SocialProofTool onAwardCoins={(amount) => {
                         handleSessionComplete(amount);
                         onAwardXP(30);
                       }} />
                    </div>
                  )}
                  <div className="space-y-3">
                    {currentGuidance?.tasks.map((task, index) => (
                      <label key={index} className="flex items-center bg-gray-900 p-4 rounded-2xl border border-gray-700 cursor-pointer hover:bg-gray-850 transition-colors">
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if (e.target.checked) onAwardXP(10);
                          }}
                          className="w-5 h-5 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 bg-gray-700" 
                        />
                        <span className="ml-4 text-sm font-bold text-gray-300">{task}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={resetGuidance} className="text-gray-500 text-xs font-bold hover:text-yellow-500 underline uppercase tracking-widest block mx-auto">
                    Beddel Jihada
                  </button>
               </div>
             )}
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <FocusTimer onSessionComplete={handleSessionComplete} />

          <DailyWidget 
            streak={progress.streak || 0} 
            coins={progress.coins || 0} 
            xp={progress.xp || 0}
            rank={progress.rank || "Arday"}
            completedTasks={progress.dailyTasks || {}}
            customTasks={progress.customDailyTasks || []}
            onToggleTask={onToggleDailyTask}
            onAddTask={onAddCustomTask}
            onDeleteTask={onDeleteTask}
          />

          {!progress.isPremium && (
            <ReferralWidget 
              referralCode={progress.referralCode}
              referredCount={progress.referredCount}
              onSimulateReferral={onApplyReferral}
            />
          )}
          
          <button 
            onClick={onOpenMentor}
            className="w-full bg-yellow-500 p-8 rounded-[2.5rem] text-black font-black text-left group overflow-hidden relative shadow-2xl shadow-yellow-500/20 hover:scale-[1.02] transition-all"
          >
            <div className="relative z-10">
              <h4 className="text-2xl italic mb-1 uppercase tracking-tighter">AI Success Mentor</h4>
              <p className="text-xs opacity-70 font-bold uppercase tracking-widest">Weydii wax kasta oo kugu adag...</p>
            </div>
            <i className="fas fa-robot absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
