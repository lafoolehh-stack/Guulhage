
import React, { useState } from 'react';
import { CustomTask } from '../types';

interface Task {
    id: string;
    label: string;
    isCustom?: boolean;
}

interface DailyWidgetProps {
  streak: number;
  coins: number;
  xp: number;
  rank: string;
  completedTasks: Record<string, boolean>;
  customTasks: CustomTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (label: string) => void;
  onDeleteTask: (id: string) => void;
}

const DEFAULT_TASKS: Task[] = [
    { id: 'frog', label: 'Cun "Rahii" ugu weyn (Eat the Frog)' },
    { id: 'read', label: 'Akhri ugu yaraan 10 bog oo buug ah' },
    { id: 'journal', label: 'Qor dhibcahaaga ugu muhiimsan maanta' }
];

const DailyWidget: React.FC<DailyWidgetProps> = ({ 
  streak, 
  coins, 
  xp,
  rank,
  completedTasks, 
  customTasks, 
  onToggleTask, 
  onAddTask,
  onDeleteTask
}) => {
  const [newTaskLabel, setNewTaskLabel] = useState('');
  
  const allTasks: Task[] = [...DEFAULT_TASKS, ...customTasks.map(t => ({ ...t, isCustom: true }))];
  const completedCount = allTasks.filter(task => completedTasks[task.id]).length;
  const progressPercent = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskLabel.trim()) {
      onAddTask(newTaskLabel.trim());
      setNewTaskLabel('');
    }
  };

  // Gamification thresholds
  const getNextThreshold = (currentXp: number) => {
    if (currentXp < 500) return 500;
    if (currentXp < 1000) return 1000;
    return currentXp;
  };

  const nextThreshold = getNextThreshold(xp);
  const xpToLevelUp = nextThreshold - xp;
  const xpBarPercent = nextThreshold > 0 ? Math.min((xp / nextThreshold) * 100, 100) : 100;

  return (
    <div className="w-full space-y-6">
      {/* Gamification Stats Snippet UI */}
      <div className="max-w-md mx-auto bg-gray-900 p-5 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/50">
                  <span className="text-lg">🔥</span>
                  <span className="font-bold text-orange-500">{streak} Day Streak</span>
              </div>
              
              <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Darajadaada</p>
                  <p className="text-yellow-500 font-black italic uppercase">{rank}</p>
              </div>
          </div>

          <div className="mb-6">
              <div className="flex justify-between text-[10px] mb-1 font-bold">
                  <span>XP: {xp} / {nextThreshold}</span>
                  <span className="text-gray-500">{xpToLevelUp > 0 ? `${xpToLevelUp} XP to Level Up` : 'Max Rank Reached'}</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full border border-gray-700 overflow-hidden p-[1px]">
                  <div 
                    className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(234,179,8,0.5)] rounded-full" 
                    style={{ width: `${xpBarPercent}%` }}
                  ></div>
              </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
              <div className={`aspect-square bg-gray-800 rounded-xl flex items-center justify-center border transition-all ${xp >= 100 ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-30'}`}>🏆</div>
              <div className={`aspect-square bg-gray-800 rounded-xl flex items-center justify-center border transition-all ${coins >= 500 ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-30'}`}>💰</div>
              <div className={`aspect-square bg-gray-800 rounded-xl flex items-center justify-center border transition-all ${streak >= 7 ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-30'}`}>🚀</div>
              <div className={`aspect-square bg-gray-800 rounded-xl flex items-center justify-center border transition-all ${rank === 'Guulhage Grand Master' ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-30'}`}>💎</div>
          </div>
      </div>

      {/* Task List Section */}
      <div className="bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border-2 border-gray-700">
        <div className="bg-gray-900 p-6 rounded-3xl mb-6">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">Horumarka Maanta</h3>
              <span className="text-yellow-500 text-sm font-black italic">{progressPercent}%</span>
          </div>
          
          <div className="w-full bg-gray-800 h-2.5 rounded-full mb-8 overflow-hidden border border-gray-700">
            <div 
              className="bg-yellow-500 h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="space-y-3 mb-8">
              {allTasks.map((task) => (
                  <div key={task.id} className="flex gap-2 group">
                    <button
                        onClick={() => onToggleTask(task.id)}
                        className={`flex-1 flex items-center p-4 rounded-2xl border transition-all text-left ${
                            completedTasks[task.id] 
                            ? 'bg-yellow-500 border-yellow-500 text-black' 
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                    >
                        <div className={`w-5 h-5 rounded flex items-center justify-center border-2 mr-4 transition-colors flex-shrink-0 ${
                            completedTasks[task.id] 
                            ? 'bg-black border-black text-yellow-500' 
                            : 'border-gray-600'
                        }`}>
                            {completedTasks[task.id] && <i className="fas fa-check text-[10px]"></i>}
                        </div>
                        <span className="text-xs font-bold flex-1 line-clamp-1">{task.label}</span>
                    </button>
                    {task.isCustom && (
                      <button 
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-600 hover:text-red-500 px-2 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    )}
                  </div>
              ))}
          </div>

          <form onSubmit={handleAddSubmit} className="relative">
            <input
              type="text"
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
              placeholder="Ku dar hawl gaar ah..."
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-xs text-gray-300 focus:outline-none focus:border-yellow-500 transition-all pr-12 font-bold"
            />
            <button 
              type="submit"
              disabled={!newTaskLabel.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 disabled:opacity-30 p-2"
            >
              <i className="fas fa-plus-circle text-xl"></i>
            </button>
          </form>
        </div>

        <div className="text-center p-6 border-2 border-dashed border-gray-700 rounded-3xl">
          <p className="text-gray-500 text-xs font-bold uppercase mb-3 tracking-widest">Ma dareemaysaa caajis?</p>
          <button className="text-yellow-500 font-black italic underline hover:text-yellow-400 transition text-sm">KALIYA 5 DAQIIQO BILAW</button>
        </div>
      </div>
    </div>
  );
};

export default DailyWidget;
