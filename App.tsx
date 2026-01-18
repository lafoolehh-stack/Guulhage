
import React, { useState, useEffect } from 'react';
import { AppView, UserProgress, Law, CustomTask, Consultant, Reel } from './types';
import { SUCCESS_LAWS, LEVELS } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LawDetailView from './components/LawDetailView';
import MentorChat from './components/MentorChat';
import Sidebar from './components/Sidebar';
import SubscriptionView from './components/SubscriptionView';
import AdminDashboard from './components/AdminDashboard';
import LeaderboardView from './components/LeaderboardView';
import SuccessCelebration from './components/SuccessCelebration';
import ReelsView, { SAMPLE_REELS } from './components/ReelsView';
import ConsultantsHub, { SAMPLE_CONSULTANTS } from './components/ConsultantsHub';
import ConsultantChat from './components/ConsultantChat';
import ConsultantDashboard from './components/ConsultantDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [reels, setReels] = useState<Reel[]>(SAMPLE_REELS);

  const generateReferralCode = () => {
    return 'GUUL-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const calculateRank = (xp: number): string => {
    if (xp >= 1000) return "Guulhage Grand Master";
    if (xp >= 500) return "Hogaamiye";
    return "Arday";
  };

  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLaws: [],
    checklist: {},
    lastActive: new Date().toISOString(),
    streak: 0,
    coins: 0,
    xp: 0,
    rank: "Arday",
    dailyTasks: {},
    customDailyTasks: [],
    unlockedLevels: [1],
    isPremium: false,
    isAdmin: true, // Defaulting to true for demo access. In real Firebase, this would be a custom claim.
    isConsultant: false,
    referralCode: generateReferralCode(),
    referredCount: 0
  });

  // Simulated Admin Access Protection (Simulating the firebase.auth().onAuthStateChanged logic)
  useEffect(() => {
    if (view === AppView.ADMIN && !userProgress.isAdmin) {
      alert("Unauthorized Access: Only Admins can view this section.");
      setView(AppView.DASHBOARD);
    }
  }, [view, userProgress.isAdmin]);

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
      }

      const dailyTasks = parsed.dailyTasksDate === today ? (parsed.dailyTasks || {}) : {};

      setUserProgress({
        ...parsed,
        streak: newStreak,
        lastActive: now.toISOString(),
        dailyTasks,
        dailyTasksDate: today,
        customDailyTasks: parsed.customDailyTasks || [],
        checklist: parsed.checklist || {},
        unlockedLevels: parsed.unlockedLevels || [1],
        isPremium: parsed.isPremium || false,
        isAdmin: parsed.isAdmin !== undefined ? parsed.isAdmin : true,
        isConsultant: parsed.isConsultant !== undefined ? parsed.isConsultant : false,
        isVerified: parsed.isVerified || false,
        badgeType: parsed.badgeType || '',
        role: parsed.role || '',
        referralCode: parsed.referralCode || generateReferralCode(),
        referredCount: parsed.referredCount || 0,
        xp: parsed.xp || 0,
        rank: calculateRank(parsed.xp || 0)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('qaanuunka_guusha_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleAddReel = (newReel: Reel) => {
    setReels(prev => [newReel, ...prev]);
  };

  const handleAdminUpdateUser = (userId: string, action: 'GIVE_PRO' | 'VERIFY_CONSULTANT' | 'RESET_STREAK') => {
    // Logic for individual user updates, simulating Firestore database writes
    setUserProgress(prev => {
      // If we are updating ourselves for the demo
      if (userId === 'curr-user' || userId === 'id123' || userId === 'id124') {
        const updates: Partial<UserProgress> = {};
        switch (action) {
          case 'GIVE_PRO':
            updates.isPremium = true;
            updates.premiumExpiry = '2026-12-31';
            alert(`ADMIN: User ${userId} upgraded to Mastery Pro!`);
            break;
          case 'VERIFY_CONSULTANT':
            updates.isVerified = true;
            updates.badgeType = 'BlueCheck';
            updates.role = 'Consultant';
            updates.isConsultant = true;
            alert(`ADMIN: Consultant ${userId} verified and granted BlueCheck.`);
            break;
          case 'RESET_STREAK':
            updates.streak = 0;
            alert(`ADMIN: User ${userId} streak has been reset.`);
            break;
        }
        return { ...prev, ...updates };
      }
      return prev;
    });
  };

  const awardXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      const newRank = calculateRank(newXP);
      return { ...prev, xp: newXP, rank: newRank };
    });
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setView(AppView.DASHBOARD)} />;
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            laws={SUCCESS_LAWS} 
            progress={userProgress} 
            onSelectLaw={(law) => { setSelectedLaw(law); setView(AppView.LAW_DETAIL); }}
            onOpenMentor={() => setView(AppView.MENTOR)}
            onOpenPremium={() => setView(AppView.PREMIUM)}
            onToggleDailyTask={(id) => {
               const isNowCompleted = !userProgress.dailyTasks[id];
               setUserProgress(prev => ({
                 ...prev,
                 dailyTasks: { ...prev.dailyTasks, [id]: isNowCompleted },
                 coins: isNowCompleted ? prev.coins + 20 : Math.max(0, prev.coins - 20)
               }));
               if (isNowCompleted) awardXP(20);
            }}
            onAddCustomTask={(label) => {
              const newTask: CustomTask = { id: `custom-${Date.now()}`, label };
              setUserProgress(prev => ({ ...prev, customDailyTasks: [...(prev.customDailyTasks || []), newTask] }));
            }}
            onDeleteTask={(id) => {
              setUserProgress(prev => {
                const { [id]: _, ...remainingTasks } = prev.dailyTasks;
                return {
                  ...prev,
                  customDailyTasks: prev.customDailyTasks.filter(t => t.id !== id),
                  dailyTasks: remainingTasks
                };
              });
            }}
            onUpdateProgress={(updates) => setUserProgress(prev => ({ ...prev, ...updates }))}
            onApplyReferral={(code) => {
              const newCount = userProgress.referredCount + 1;
              setUserProgress(prev => ({ ...prev, referredCount: newCount, isPremium: newCount >= 3 ? true : prev.isPremium }));
              awardXP(50);
            }}
            onAwardXP={awardXP}
          />
        );
      case AppView.ADMIN:
        return <AdminDashboard 
          onBack={() => setView(AppView.DASHBOARD)} 
          onAdminUpdateUser={handleAdminUpdateUser}
          onAddReel={handleAddReel}
        />;
      case AppView.REELS:
        return <ReelsView onAwardXP={awardXP} reels={reels} />;
      case AppView.LAW_DETAIL:
        return selectedLaw ? (
          <LawDetailView 
            law={selectedLaw} 
            onBack={() => setView(AppView.DASHBOARD)} 
            onComplete={() => {
              if (!userProgress.completedLaws.includes(selectedLaw.id)) {
                setUserProgress(prev => ({
                  ...prev,
                  completedLaws: [...prev.completedLaws, selectedLaw.id],
                  coins: prev.coins + 100
                }));
                awardXP(100);
              }
            }}
            isCompleted={userProgress.completedLaws.includes(selectedLaw.id)}
            checklist={userProgress.checklist}
            onToggleChallenge={(lawId, index) => {
              const key = `law-${lawId}-challenge-${index}`;
              const isNowDone = !userProgress.checklist[key];
              setUserProgress(prev => ({ ...prev, checklist: { ...prev.checklist, [key]: isNowDone } }));
              if (isNowDone) awardXP(10);
            }}
          />
        ) : null;
      case AppView.MENTOR:
        return <MentorChat onBack={() => setView(AppView.DASHBOARD)} userLevel={Math.max(...userProgress.unlockedLevels)} />;
      case AppView.PREMIUM:
        return <SubscriptionView onBack={() => setView(AppView.DASHBOARD)} onSubscribe={() => { setUserProgress(prev => ({ ...prev, isPremium: true })); awardXP(200); setView(AppView.SUCCESS_CELEBRATION); }} />;
      case AppView.LEADERBOARD:
        return <LeaderboardView onBack={() => setView(AppView.DASHBOARD)} currentUser={userProgress} />;
      case AppView.SUCCESS_CELEBRATION:
        return <SuccessCelebration onContinue={() => setView(AppView.DASHBOARD)} xpBonus={200} />;
      case AppView.CONSULTANTS:
        return <ConsultantsHub onBack={() => setView(AppView.DASHBOARD)} onMessage={(c) => { setSelectedConsultant(c); setView(AppView.CONSULTANT_CHAT); }} />;
      case AppView.CONSULTANT_CHAT:
        return selectedConsultant ? <ConsultantChat consultant={selectedConsultant} onBack={() => setView(AppView.CONSULTANTS)} /> : null;
      case AppView.CONSULTANT_DASHBOARD:
        return <ConsultantDashboard onBack={() => setView(AppView.DASHBOARD)} onOpenChat={(name) => { setView(AppView.CONSULTANT_CHAT); }} />;
      default:
        return <LandingPage onStart={() => setView(AppView.DASHBOARD)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden">
      {view !== AppView.LANDING && view !== AppView.SUCCESS_CELEBRATION && (
        <Sidebar currentView={view} setView={setView} isPremium={userProgress.isPremium} isConsultant={userProgress.isConsultant} />
      )}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
