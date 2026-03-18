// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  mode: 'online' | 'offline' | 'hybrid';
  category: string;
  image: string;
  price?: string;
  instructor?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  image?: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Vacancy Types
export interface Vacancy {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract';
  location: 'remote' | 'hybrid' | 'on-site';
  description: string;
  requirements: string[];
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Result Types
export interface Result {
  id: string;
  studentName: string;
  projectTitle: string;
  category: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Home Section Types
export interface HomeSection {
  id: string;
  type: 'hero' | 'stats' | 'courses' | 'events' | 'results' | 'cta';
  title: string;
  subtitle?: string;
  content?: string;
  isVisible: boolean;
  order: number;
  settings?: Record<string, any>;
}

// Admin Types
export interface AdminUser {
  isAuthenticated: boolean;
  loginTime?: string;
}

// Stats Types
export interface SiteStats {
  graduates: number;
  completionRate: number;
  partnerCompanies: number;
  coursesCount: number;
}

// Contact Types
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

// LocalStorage Data Structure
export interface AppData {
  courses: Course[];
  events: Event[];
  vacancies: Vacancy[];
  results: Result[];
  homeSections: HomeSection[];
  stats: SiteStats;
  contactInfo: ContactInfo;
}
