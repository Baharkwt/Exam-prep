import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isYesterday, addDays, isSameDay } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'h:mm a')}`;
  } else if (isSameDay(date, addDays(new Date(), 1))) {
    return `Tomorrow, ${format(date, 'h:mm a')}`;
  } else {
    return format(date, 'MMM d, yyyy h:mm a');
  }
}

export function formatTimeRemaining(dueDate: Date): string {
  const now = new Date();
  const diffInMs = dueDate.getTime() - now.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffInDays > 0) {
    return `${diffInDays}d ${diffInHours}h remaining`;
  } else if (diffInHours > 0) {
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffInHours}h ${diffInMinutes}m remaining`;
  } else {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes > 0) {
      return `${diffInMinutes}m remaining`;
    } else {
      return 'Due now';
    }
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'text-red-500 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-500 bg-green-50 border-green-200';
    default:
      return 'text-gray-500 bg-gray-50 border-gray-200';
  }
}

export function getSubjectColor(subject: string) {
  const subjects: Record<string, string> = {
    'mathematics': 'bg-blue-100 text-blue-800',
    'physics': 'bg-purple-100 text-purple-800',
    'chemistry': 'bg-green-100 text-green-800',
    'biology': 'bg-red-100 text-red-800',
    'english': 'bg-yellow-100 text-yellow-800',
    'history': 'bg-orange-100 text-orange-800',
    'geography': 'bg-teal-100 text-teal-800',
    'computer science': 'bg-indigo-100 text-indigo-800',
    'economics': 'bg-pink-100 text-pink-800',
    'general knowledge': 'bg-gray-100 text-gray-800',
  };
  
  const lowerCaseSubject = subject.toLowerCase();
  return subjects[lowerCaseSubject] || 'bg-gray-100 text-gray-800';
}

export function calculateCompletionRate(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function generateTimeSlots() {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour % 12 || 12;
      const period = hour < 12 ? 'AM' : 'PM';
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute} ${period}`);
    }
  }
  return slots;
}