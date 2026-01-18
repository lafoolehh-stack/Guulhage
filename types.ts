
export interface Law {
  id: number;
  title: string;
  description: string;
  icon: string;
  content: string;
  challenges: string[];
  levelId: number;
}

export interface Level {
  id: number;
  title: string;
  lawIds: number[];
}

export interface CustomTask {
  id: string;
  label: string;
}

export interface Reel {
  id: string;
  lawTitle: string;
  description: string;
  videoUrl: string;
  likes: string;
  comments: string;
  createdAt?: string;
  xpValue?: number;
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  bio: string;
  imageUrl: string;
  isVerified: boolean;
}

export interface UserProgress {
  completedLaws: number[];
  checklist: Record<string, boolean>;
  lastActive: string;
  streak: number;
  coins: number;
  xp: number;
  rank: string;
  dailyTasks: Record<string, boolean>;
  customDailyTasks: CustomTask[];
  dailyTasksDate?: string;
  selectedGuidance?: 'finance' | 'productivity' | 'social';
  unlockedLevels: number[];
  isPremium?: boolean;
  isAdmin?: boolean;
  isConsultant?: boolean;
  isVerified?: boolean;
  badgeType?: string;
  role?: string;
  referralCode: string;
  referredCount: number;
  premiumExpiry?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  LAW_DETAIL = 'law_detail',
  MENTOR = 'mentor',
  PREMIUM = 'premium',
  ADMIN = 'admin',
  LEADERBOARD = 'leaderboard',
  SUCCESS_CELEBRATION = 'success_celebration',
  REELS = 'reels',
  CONSULTANTS = 'consultants',
  CONSULTANT_CHAT = 'consultant_chat',
  CONSULTANT_DASHBOARD = 'consultant_dashboard'
}
