import { Task, CalendarEvent, Subject, UserPreference, UserPerformance, AIRecommendation, TaskAnalytics, StudyAnalytics } from '@/types/calendar';
import { addDays, addHours, startOfDay, endOfDay, addMinutes, subDays, format } from 'date-fns';

// Mock subjects
export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', color: '#3b82f6' },
  { id: '2', name: 'Physics', color: '#8b5cf6' },
  { id: '3', name: 'Chemistry', color: '#10b981' },
  { id: '4', name: 'Biology', color: '#ef4444' },
  { id: '5', name: 'English', color: '#f59e0b' },
  { id: '6', name: 'History', color: '#f97316' },
  { id: '7', name: 'Geography', color: '#14b8a6' },
  { id: '8', name: 'Computer Science', color: '#6366f1' },
  { id: '9', name: 'Economics', color: '#ec4899' },
  { id: '10', name: 'General Knowledge', color: '#6b7280' },
];

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Calculus Assignment',
    subject: 'Mathematics',
    dueDate: addDays(new Date(), 2),
    priority: 'high',
    duration: 120,
    notes: 'Focus on integration by parts and substitution methods',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 3),
    updatedAt: subDays(new Date(), 3),
    userId: 'user1',
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: addDays(new Date(), 1),
    priority: 'medium',
    duration: 90,
    notes: 'Include all experimental data and error analysis',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 2),
    userId: 'user1',
  },
  {
    id: '3',
    title: 'English Literature Essay',
    subject: 'English',
    dueDate: addDays(new Date(), 5),
    priority: 'medium',
    duration: 180,
    notes: 'Compare themes in Hamlet and Macbeth',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 7),
    updatedAt: subDays(new Date(), 7),
    userId: 'user1',
  },
  {
    id: '4',
    title: 'Daily Vocabulary Review',
    subject: 'English',
    dueDate: addDays(startOfDay(new Date()), 0),
    priority: 'low',
    duration: 30,
    notes: 'Focus on SAT vocabulary list',
    completed: true,
    recurring: 'daily',
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 1),
    userId: 'user1',
  },
  {
    id: '5',
    title: 'Chemistry Quiz Preparation',
    subject: 'Chemistry',
    dueDate: addHours(new Date(), 5),
    priority: 'high',
    duration: 60,
    notes: 'Review chapters 5-7 on organic chemistry',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    userId: 'user1',
  },
  {
    id: '6',
    title: 'Weekly Math Practice',
    subject: 'Mathematics',
    dueDate: addDays(new Date(), 3),
    priority: 'medium',
    duration: 45,
    notes: 'Complete practice problems from textbook',
    completed: false,
    recurring: 'weekly',
    createdAt: subDays(new Date(), 14),
    updatedAt: subDays(new Date(), 7),
    userId: 'user1',
  },
  {
    id: '7',
    title: 'Computer Science Project',
    subject: 'Computer Science',
    dueDate: addDays(new Date(), 10),
    priority: 'high',
    duration: 240,
    notes: 'Implement sorting algorithms and analyze time complexity',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 5),
    updatedAt: subDays(new Date(), 5),
    userId: 'user1',
  },
  {
    id: '8',
    title: 'Biology Flashcards Review',
    subject: 'Biology',
    dueDate: addDays(new Date(), 1),
    priority: 'medium',
    duration: 45,
    notes: 'Focus on cell structure and function',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 4),
    updatedAt: subDays(new Date(), 4),
    userId: 'user1',
    aiGenerated: true,
  },
  {
    id: '9',
    title: 'Economics Reading',
    subject: 'Economics',
    dueDate: addDays(new Date(), 2),
    priority: 'low',
    duration: 60,
    notes: 'Read chapter on market structures',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 3),
    updatedAt: subDays(new Date(), 3),
    userId: 'user1',
  },
  {
    id: '10',
    title: 'History Documentary',
    subject: 'History',
    dueDate: addDays(new Date(), 4),
    priority: 'low',
    duration: 120,
    notes: 'Watch documentary on World War II',
    completed: false,
    recurring: null,
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 2),
    userId: 'user1',
    aiGenerated: true,
  },
];

// Convert tasks to calendar events
export const mockEvents: CalendarEvent[] = mockTasks.map(task => ({
  id: task.id,
  title: task.title,
  start: task.dueDate,
  end: addMinutes(task.dueDate, task.duration),
  subject: task.subject,
  priority: task.priority,
  completed: task.completed,
  taskId: task.id,
}));

// Add some additional events
export const additionalEvents: CalendarEvent[] = [
  {
    id: 'event1',
    title: 'Math Exam',
    start: addDays(startOfDay(new Date()), 7),
    end: addHours(addDays(startOfDay(new Date()), 7), 2),
    subject: 'Mathematics',
  },
  {
    id: 'event2',
    title: 'Physics Lab',
    start: addDays(startOfDay(new Date()), 3),
    end: addHours(addDays(startOfDay(new Date()), 3), 3),
    subject: 'Physics',
  },
  {
    id: 'event3',
    title: 'Study Group',
    start: addDays(startOfDay(new Date()), 2),
    end: addHours(addDays(startOfDay(new Date()), 2), 2),
    allDay: false,
  },
];

// Combine all events
export const allEvents: CalendarEvent[] = [...mockEvents, ...additionalEvents];

// User preferences
export const mockUserPreference: UserPreference = {
  id: 'pref1',
  userId: 'user1',
  productiveHoursStart: '09:00',
  productiveHoursEnd: '17:00',
  preferredStudyDuration: 60,
  breakDuration: 15,
  weeklyGoalHours: 20,
  subjects: mockSubjects,
};

// User performance data
export const mockUserPerformance: UserPerformance[] = [
  { id: 'perf1', userId: 'user1', subject: 'Mathematics', score: 85, date: subDays(new Date(), 10) },
  { id: 'perf2', userId: 'user1', subject: 'Physics', score: 78, date: subDays(new Date(), 15) },
  { id: 'perf3', userId: 'user1', subject: 'Chemistry', score: 92, date: subDays(new Date(), 20) },
  { id: 'perf4', userId: 'user1', subject: 'Biology', score: 88, date: subDays(new Date(), 25) },
  { id: 'perf5', userId: 'user1', subject: 'English', score: 95, date: subDays(new Date(), 30) },
  { id: 'perf6', userId: 'user1', subject: 'Mathematics', score: 90, date: subDays(new Date(), 5) },
];

// AI recommendations
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec1',
    userId: 'user1',
    recommendationType: 'task',
    recommendation: 'Review calculus concepts before your upcoming exam',
    reason: 'Based on your recent performance in Mathematics, additional review would be beneficial',
    applied: false,
    createdAt: new Date(),
  },
  {
    id: 'rec2',
    userId: 'user1',
    recommendationType: 'schedule',
    recommendation: 'Allocate more time to Physics study sessions',
    reason: 'Your Physics scores are lower than other subjects',
    applied: true,
    createdAt: subDays(new Date(), 2),
  },
  {
    id: 'rec3',
    userId: 'user1',
    recommendationType: 'subject',
    recommendation: 'Focus on organic chemistry concepts',
    reason: 'You have an upcoming Chemistry quiz',
    applied: false,
    createdAt: subDays(new Date(), 1),
  },
];

// Task analytics
export const mockTaskAnalytics: TaskAnalytics = {
  totalTasks: mockTasks.length,
  completedTasks: mockTasks.filter(task => task.completed).length,
  pendingTasks: mockTasks.filter(task => !task.completed).length,
  overdueTasks: mockTasks.filter(task => !task.completed && task.dueDate < new Date()).length,
  completionRate: (mockTasks.filter(task => task.completed).length / mockTasks.length) * 100,
  tasksByPriority: {
    high: mockTasks.filter(task => task.priority === 'high').length,
    medium: mockTasks.filter(task => task.priority === 'medium').length,
    low: mockTasks.filter(task => task.priority === 'low').length,
  },
  tasksBySubject: mockTasks.reduce((acc, task) => {
    acc[task.subject] = (acc[task.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};

// Study analytics
export const mockStudyAnalytics: StudyAnalytics = {
  totalStudyTime: mockTasks.reduce((acc, task) => acc + task.duration, 0),
  averageDailyStudyTime: Math.round(mockTasks.reduce((acc, task) => acc + task.duration, 0) / 7),
  studyTimeBySubject: mockTasks.reduce((acc, task) => {
    acc[task.subject] = (acc[task.subject] || 0) + task.duration;
    return acc;
  }, {} as Record<string, number>),
  productivityScore: 85,
  weeklyProgress: 75,
};

// Generate dates for the weekly study schedule
export function generateWeeklySchedule() {
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  
  return weekDays.map(day => ({
    date: day,
    dayName: format(day, 'EEEE'),
    shortDate: format(day, 'MMM d'),
    tasks: mockTasks
      .filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= startOfDay(day) && taskDate <= endOfDay(day);
      })
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()),
  }));
}