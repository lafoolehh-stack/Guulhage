
import React, { useState, useEffect } from 'react';
import { AppView, UserProgress, Law, CustomTask } from './types';
import { SUCCESS_LAWS } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LawDetailView from './components/LawDetailView';
import MentorChat from './components/MentorChat';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLaws: [],
    checklist: {},
    lastActive: new Date().toISOString(),
    streak: 0,
    coins: 0,
    dailyTasks: {},
    customDailyTasks: []
  });

  // Load progress and calculate streak
  useEffect(() => {
    const saved = localStorage.getItem('qaanuunka_guusha_progress');
    const today = new Date().toDateString();
    
    if (saved) {
      const parsed: UserProgress = JSON.parse(saved);
      const now = new Date();
      const last = new Date(parsed.lastActive);
      
      const diffTime = Math.abs(now.getTime() - last.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = parsed.streak || 0;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 0;
      } else if (diffDays === 0 && newStreak === 0) {
        newStreak = 1;
      }

      // Reset daily tasks completion if date changed, but keep the custom task definitions
      const dailyTasks = parsed.dailyTasksDate === today ? (parsed.dailyTasks || {}) : {};

      setUserProgress({
        ...parsed,
        streak: newStreak,
        lastActive: now.toISOString(),
        dailyTasks,
        dailyTasksDate: today,
        customDailyTasks: parsed.customDailyTasks || [],
        checklist: parsed.checklist || {}
      });
    } else {
        setUserProgress(prev => ({...prev, dailyTasksDate: today, customDailyTasks: [], checklist: {}}));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('qaanuunka_guusha_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleStartJourney = () => {
    setView(AppView.DASHBOARD);
  };

  const handleSelectLaw = (law: Law) => {
    setSelectedLaw(law);
    setView(AppView.LAW_DETAIL);
  };

  const completeLaw = (id: number) => {
    if (!userProgress.completedLaws.includes(id)) {
      setUserProgress(prev => ({
        ...prev,
        completedLaws: [...prev.completedLaws, id],
        coins: prev.coins + 100
      }));
    }
  };

  const toggleDailyTask = (taskId: string) => {
    const isNowCompleted = !userProgress.dailyTasks[taskId];
    setUserProgress(prev => ({
      ...prev,
      dailyTasks: {
        ...prev.dailyTasks,
        [taskId]: isNowCompleted
      },
      coins: isNowCompleted ? prev.coins + 20 : Math.max(0, prev.coins - 20)
    }));
  };

  const toggleChallenge = (lawId: number, challengeIndex: number) => {
    const key = `law-${lawId}-challenge-${challengeIndex}`;
    setUserProgress(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [key]: !prev.checklist[key]
      }
    }));
  };

  const addCustomTask = (label: string) => {
    const newTask: CustomTask = {
      id: `custom-${Date.now()}`,
      label
    };
    setUserProgress(prev => ({
      ...prev,
      customDailyTasks: [...(prev.customDailyTasks || []), newTask]
    }));
  };

  const deleteCustomTask = (taskId: string) => {
    setUserProgress(prev => {
      const newCustomTasks = prev.customDailyTasks.filter(t => t.id !== taskId);
      const newDailyTasksStatus = { ...prev.dailyTasks };
      delete newDailyTasksStatus[taskId];
      
      return {
        ...prev,
        customDailyTasks: newCustomTasks,
        dailyTasks: newDailyTasksStatus
      };
    });
  };

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...updates }));
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={handleStartJourney} />;
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            laws={SUCCESS_LAWS} 
            progress={userProgress} 
            onSelectLaw={handleSelectLaw}
            onOpenMentor={() => setView(AppView.MENTOR)}
            onToggleDailyTask={toggleDailyTask}
            onAddCustomTask={addCustomTask}
            onDeleteCustomTask={deleteCustomTask}
            onUpdateProgress={updateProgress}
          />
        );
      case AppView.LAW_DETAIL:
        return selectedLaw ? (
          <LawDetailView 
            law={selectedLaw} 
            onBack={() => setView(AppView.DASHBOARD)} 
            onComplete={() => completeLaw(selectedLaw.id)}
            isCompleted={userProgress.completedLaws.includes(selectedLaw.id)}
            checklist={userProgress.checklist}
            onToggleChallenge={toggleChallenge}
          />
        ) : null;
      case AppView.MENTOR:
        return <MentorChat onBack={() => setView(AppView.DASHBOARD)} />;
      default:
        return <LandingPage onStart={handleStartJourney} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden">
      {view !== AppView.LANDING && (
        <Sidebar currentView={view} setView={setView} />
      )}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
