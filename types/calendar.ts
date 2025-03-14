export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  duration: number; // in minutes
  notes?: string;
  completed: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly' | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  aiGenerated?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  subject?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  taskId?: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface StudySession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  completed: boolean;
  userId: string;
}

export interface UserPreference {
  id: string;
  userId: string;
  productiveHoursStart: string; // e.g., "09:00"
  productiveHoursEnd: string; // e.g., "17:00"
  preferredStudyDuration: number; // in minutes
  breakDuration: number; // in minutes
  weeklyGoalHours: number;
  subjects: Subject[];
}

export interface UserPerformance {
  id: string;
  userId: string;
  subject: string;
  score: number; // 0-100
  date: Date;
  examId?: string;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  recommendationType: 'task' | 'schedule' | 'subject';
  recommendation: string;
  reason: string;
  applied: boolean;
  createdAt: Date;
}

export interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  tasksByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  tasksBySubject: Record<string, number>;
}

export interface StudyAnalytics {
  totalStudyTime: number; // in minutes
  averageDailyStudyTime: number; // in minutes
  studyTimeBySubject: Record<string, number>;
  productivityScore: number; // 0-100
  weeklyProgress: number; // percentage of weekly goal
}