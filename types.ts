
export interface Law {
  id: number;
  title: string;
  description: string;
  icon: string;
  content: string;
  challenges: string[];
}

export interface CustomTask {
  id: string;
  label: string;
}

export interface UserProgress {
  completedLaws: number[];
  checklist: Record<string, boolean>;
  lastActive: string;
  streak: number;
  coins: number;
  dailyTasks: Record<string, boolean>; // Task completion status
  customDailyTasks: CustomTask[]; // List of user-added tasks
  dailyTasksDate?: string;
  selectedGuidance?: 'finance' | 'productivity' | 'social';
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  LAW_DETAIL = 'law_detail',
  MENTOR = 'mentor'
}
