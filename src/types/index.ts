import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string,              // Firebase Auth UID
  role: 'mentor' | 'mentee',
  name: string,
  email: string,
  profileImage?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export type Mentee = User & { 
  level?: 'beginner' | 'intermediate' | 'advanced',
  completedMantorship?: number,
  dob?: Timestamp, // Date of Birth
  phoneNumber?: string,
  skills?: string[], // Optional skills for mentees
  goal?: string, // Optional goal for mentorship
}

export type Mentor = User & {
  bio?: string,
  skills: string[],
  sessionsCompleted?: number,
  yearsOfExperience: number;
  rating?: number,
  hourlyRate?: number, // Optional hourly rate for tutoring
  phoneNumber?: string,
  pricePerSession?: number,
  availability?: {
    days: string[], // e.g., ['Monday', 'Wednesday']
    timeSlots: { start: string, end: string }[] // e.g., [{ start: '10:00', end: '12:00' }]
  },
  location?: string, // Optional location for in-person sessions
  reviews?: {
    reviewerName: string,
    rating: number,
    comment: string,
    date: Timestamp
  }[],
}

