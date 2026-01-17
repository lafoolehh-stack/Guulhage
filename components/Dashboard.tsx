
import React from 'react';
import { Law, UserProgress } from '../types';
import DailyWidget from './DailyWidget';

interface DashboardProps {
  laws: Law[];
  progress: UserProgress;
  onSelectLaw: (law: Law) => void;
  onOpenMentor: () => void;
  onToggleDailyTask: (id: string) => void;
  onAddCustomTask: (label: string) => void;
  onDeleteCustomTask: (id: string) => void;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
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
  onToggleDailyTask,
  onAddCustomTask,
  onDeleteCustomTask,
  onUpdateProgress
}) => {
  const completionRate = Math.round((progress.completedLaws.length / laws.length) * 100);

  const handleStartGuidance = (category: 'finance' | 'productivity' | 'social') => {
    onUpdateProgress({ selectedGuidance: category });
  };

  const resetGuidance = () => {
    onUpdateProgress({ selectedGuidance: undefined });
  };

  const currentGuidance = progress.selectedGuidance ? guidanceData[progress.selectedGuidance] : null;

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto space-y-10 animate-fade-in">
      {/* Guulhage Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-yellow-500 font-bold text-xl tracking-widest uppercase">Guulhage</h1>
        <div className="bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">
          🔥 {progress.streak || 0} Days
        </div>
      </header>

      {/* Mentor Section */}
      <div className="mb-10">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl shadow-lg text-black font-black">
            G
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none border-l-4 border-yellow-500 shadow-xl flex-1 max-w-2xl">
            <p className="text-lg font-medium leading-tight">
              {currentGuidance 
                ? currentGuidance.mentorMsg 
                : "Subax wanaagsan, Geesi! Maanta xaggee ayaan kugu hagaa?"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {!progress.selectedGuidance ? (
            /* Direction Options */
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleStartGuidance('finance')} 
                className="w-full text-left bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all group"
              >
                <span className="block text-yellow-500 font-bold group-hover:scale-105 transition origin-left">💰 Maaliyadda & Ganacsiga</span>
                <span className="text-xs text-gray-400 font-light">Kordhi dakhligaaga iyo qiimahaaga.</span>
              </button>
              <button 
                onClick={() => handleStartGuidance('productivity')} 
                className="w-full text-left bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all group"
              >
                <span className="block text-yellow-500 font-bold group-hover:scale-105 transition origin-left">⚡ Wax-soo-saarka & Hiraalka</span>
                <span className="text-xs text-gray-400 font-light">Dagaal la gal dib-u-dhigashada.</span>
              </button>
              <button 
                onClick={() => handleStartGuidance('social')} 
                className="w-full text-left bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all group"
              >
                <span className="block text-yellow-500 font-bold group-hover:scale-105 transition origin-left">🤝 Saamaynta & Social Proof</span>
                <span className="text-xs text-gray-400 font-light">Dhis sumcad iyo dad ku soo xirma.</span>
              </button>
            </div>
          ) : (
            /* Active Guidance Checklist */
            <div className="animate-fade-in">
              <h3 className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-widest">Hagaha Maanta: Checklist-gaaga</h3>
              <div className="space-y-3">
                {currentGuidance?.tasks.map((task, index) => (
                  <label 
                    key={index} 
                    className="flex items-center bg-gray-800 p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 bg-gray-700" 
                    />
                    <span className="ml-4 text-sm font-medium text-gray-200">{task}</span>
                  </label>
                ))}
              </div>
              <button 
                onClick={resetGuidance} 
                className="mt-8 text-gray-500 text-sm hover:text-yellow-500 underline w-full text-center"
              >
                Beddel jihada hagista
              </button>
            </div>
          )}

          {/* Laws Explorer Section */}
          <section className="pt-10 border-t border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Maktabadda 12-ka Qaanuun</h2>
              <div className="text-xs font-bold text-yellow-500">{completionRate}% Dhameystiran</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {laws.map((law) => {
                const isCompleted = progress.completedLaws.includes(law.id);
                return (
                  <button
                    key={law.id}
                    onClick={() => onSelectLaw(law)}
                    className={`p-5 rounded-2xl border text-left transition-all hover:scale-[1.02] flex items-center gap-4 ${
                      isCompleted 
                        ? 'bg-gray-800/30 border-green-500/30 opacity-70' 
                        : 'bg-gray-800 border-gray-700 hover:border-yellow-500/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-gray-700 text-yellow-500'
                    }`}>
                      <i className={`fas ${law.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate text-sm">{law.title}</h3>
                      <p className="text-gray-500 text-[10px] truncate">{law.description}</p>
                    </div>
                    {isCompleted && <i className="fas fa-check-circle text-green-500 text-sm"></i>}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <DailyWidget 
            streak={progress.streak || 0} 
            coins={progress.coins || 0} 
            completedTasks={progress.dailyTasks || {}}
            customTasks={progress.customDailyTasks || []}
            onToggleTask={onToggleDailyTask}
            onAddTask={onAddCustomTask}
            onDeleteTask={onDeleteCustomTask}
          />
          
          <button 
            onClick={onOpenMentor}
            className="w-full bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-3xl text-black font-black text-left group overflow-hidden relative shadow-xl hover:shadow-yellow-500/20 transition-all"
          >
            <div className="relative z-10">
              <h4 className="text-lg mb-1">AI Success Mentor</h4>
              <p className="text-xs opacity-80 font-bold">Weydii wax kasta oo kugu adag...</p>
            </div>
            <i className="fas fa-robot absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
