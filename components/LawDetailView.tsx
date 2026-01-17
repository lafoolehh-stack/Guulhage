
import React from 'react';
import { Law } from '../types';

interface LawDetailViewProps {
  law: Law;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  checklist: Record<string, boolean>;
  onToggleChallenge: (lawId: number, index: number) => void;
}

const LawDetailView: React.FC<LawDetailViewProps> = ({ 
  law, 
  onBack, 
  onComplete, 
  isCompleted, 
  checklist, 
  onToggleChallenge 
}) => {
  const completedCount = law.challenges.filter((_, idx) => checklist[`law-${law.id}-challenge-${idx}`]).length;
  const progressPercent = Math.round((completedCount / law.challenges.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12">
      <button 
        onClick={onBack}
        className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition"
      >
        <i className="fas fa-arrow-left"></i> Ku laabo Dashboard
      </button>

      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-6 flex-1">
            <div className="w-20 h-20 bg-yellow-500 text-black rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-yellow-500/20">
              <i className={`fas ${law.icon}`}></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-black">{law.title}</h1>
          </div>
          
          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
              <span>Horumarka Tallaabooyinka</span>
              <span className="text-yellow-500">{completedCount}/{law.challenges.length}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div 
                className="h-full bg-yellow-500 transition-all duration-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-400 leading-relaxed">{law.description}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <i className="fas fa-info-circle text-yellow-500"></i> Sharraxaad Dheer
            </h2>
            <div className="text-gray-300 leading-loose text-lg whitespace-pre-line">
              {law.content}
            </div>
          </section>

          <section className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <i className="fas fa-bolt text-yellow-500"></i> Caqabadaha Maanta (Tasks)
            </h2>
            <div className="space-y-4">
              {law.challenges.map((challenge, i) => {
                const isChallengeDone = !!checklist[`law-${law.id}-challenge-${i}`];
                return (
                  <button
                    key={i}
                    onClick={() => onToggleChallenge(law.id, i)}
                    className={`w-full flex gap-4 p-5 rounded-2xl border items-start text-left transition-all ${
                      isChallengeDone 
                      ? 'bg-green-500/5 border-green-500/30' 
                      : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold transition-all ${
                      isChallengeDone 
                      ? 'bg-green-500 text-black' 
                      : 'bg-gray-800 text-yellow-500 border border-gray-700'
                    }`}>
                      {isChallengeDone ? <i className="fas fa-check"></i> : i + 1}
                    </div>
                    <p className={`flex-1 font-medium transition-colors ${
                      isChallengeDone ? 'text-green-500' : 'text-gray-300'
                    }`}>
                      {challenge}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 text-center sticky top-12">
            <h3 className="text-xl font-bold mb-6">Ma dhameystirtay?</h3>
            <p className="text-gray-400 text-sm mb-8">
              Haddii aad fahamto casharkan oo aad u diyaar tahay hirgelintiisa, calaamadi inay kuu dhamaatay.
            </p>
            <button
              onClick={onComplete}
              disabled={isCompleted}
              className={`w-full py-5 rounded-2xl font-black transition-all ${
                isCompleted 
                  ? 'bg-green-500 text-black cursor-default' 
                  : 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl shadow-yellow-500/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <i className="fas fa-check-circle mr-2"></i> Waa Dhamaaday
                </>
              ) : 'Calaamadi inuu Dhamaaday'}
            </button>
            
            {progressPercent < 100 && !isCompleted && (
              <p className="mt-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                Dhamaystir dhammaan caqabadaha si aad u hesho dhibco dheeraad ah
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LawDetailView;
