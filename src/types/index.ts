export interface User {
  id: string;
  name: string;
  email: string;
  learningPath?: LearningPath;
  progress: UserProgress;
}

export interface LearningPath {
  pathId: string;
  name: string;
  description: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  locked: boolean;
  chapters: Chapter[];
  progress: number;
}

export interface Chapter {
  id: string;
  title: string;
  intro: string;
  videoUrl: string;
  flashcards: Flashcard[];
  quiz: Quiz;
  completed: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  attempts: QuizAttempt[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  timestamp: Date;
  score: number;
  passed: boolean;
}

export interface UserProgress {
  completedChapters: string[];
  moduleProgress: { [moduleId: string]: number };
  globalProgress: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Not Started";
}

export interface OnboardingAnswer {
  questionId: string;
  answer: string | string[];
}
