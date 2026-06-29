export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserProfile {
  id: number;
  nickname: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  nickname: string;
}

export interface Course {
  id: number;
  title: string;
  level: string;
  description: string;
  lessonCount: number;
  durationMinutes: number;
  coverUrl?: string;
}

export interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  exampleSentence: string;
  category: string;
  difficulty: number;
}

export interface Dashboard {
  todayMinutes: number;
  totalWords: number;
  weeklyLessons: number;
  learningTips: string[];
}

export interface AuthContextValue {
  token: string;
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}
