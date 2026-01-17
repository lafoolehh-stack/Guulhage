
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

  return (
    <div className="max-w-md w-full bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-2xl">🔥</span>
          <span className="text-xl font-bold">{streak} Day Streak</span>
        </div>
        <div className="bg-gray-900 px-4 py-1 rounded-full border border-yellow-500">
          <span className="text-yellow-500 font-bold">${coins} Coins</span>
        </div>
      </div>

      <div className="bg-gray-900 p-5 rounded-2xl mb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-400 text-xs uppercase font-bold tracking-widest">Horumarka Maanta</h3>
            <span className="text-yellow-500 text-xs font-bold">{progressPercent}%</span>
        </div>
        
        <div className="w-full bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="space-y-3 mb-6">
            {allTasks.map((task) => (
                <div key={task.id} className="flex gap-2 group">
                  <button
                      onClick={() => onToggleTask(task.id)}
                      className={`flex-1 flex items-center p-3 rounded-xl border transition-all text-left ${
                          completedTasks[task.id] 
                          ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                  >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 mr-3 transition-colors flex-shrink-0 ${
                          completedTasks[task.id] 
                          ? 'bg-green-500 border-green-500 text-black' 
                          : 'border-gray-600'
                      }`}>
                          {completedTasks[task.id] && <i className="fas fa-check text-[10px]"></i>}
                      </div>
                      <span className="text-sm font-semibold flex-1 line-clamp-1">{task.label}</span>
                      {completedTasks[task.id] && <span className="text-[10px] font-bold">+20</span>}
                  </button>
                  {task.isCustom && (
                    <button 
                      onClick={() => onDeleteTask(task.id)}
                      className="text-gray-600 hover:text-red-500 px-2 transition-colors opacity-0 group-hover:opacity-100"
                      title="Tirtir"
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
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-yellow-500 transition-all pr-10"
          />
          <button 
            type="submit"
            disabled={!newTaskLabel.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 disabled:opacity-30 p-1"
          >
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>

      <div className="text-center p-4 border border-dashed border-gray-700 rounded-2xl">
        <p className="text-gray-400 text-sm mb-2">Ma dareemaysaa caajis?</p>
        <button className="text-yellow-500 font-bold underline hover:text-yellow-400 transition">Kaliya 5 daqiiqo bilaaw</button>
      </div>
    </div>
  );
};

export default DailyWidget;
