import { useState, useEffect, useCallback } from 'react';
import type { Course, Event, Vacancy, Result, HomeSection } from '@/types';

export function useLocalStorageState<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  // Custom setter that handles function updates
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  }, [key]);

  // Reset to initial value
  const reset = useCallback(() => {
    setStoredValue(initialValue);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  }, [key, initialValue]);

  return [storedValue, setValue, reset];
}

interface AppData {
  courses: Course[];
  events: Event[];
  vacancies: Vacancy[];
  results: Result[];
  homeSections: HomeSection[];
  stats: {
    graduates: number;
    completionRate: number;
    partnerCompanies: number;
    coursesCount: number;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      facebook?: string;
    };
  };
}

// Hook for managing the entire app data
export function useAppData() {
  const [data, setData] = useLocalStorageState<AppData>('learningCenterData', {
    courses: [],
    events: [],
    vacancies: [],
    results: [],
    homeSections: [],
    stats: {
      graduates: 12400,
      completionRate: 94,
      partnerCompanies: 180,
      coursesCount: 45
    },
    contactInfo: {
      email: 'hello@learningcenter.studio',
      phone: '+1 (555) 014-2230',
      address: '123 Studio Lane, Design District',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        instagram: '#',
        facebook: '#'
      }
    }
  });

  // Helper functions for CRUD operations
  const addItem = useCallback((collection: keyof typeof data, item: any) => {
    setData(prev => ({
      ...prev,
      [collection]: [...(prev[collection] as any[]), { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
    }));
  }, [setData]);

  const updateItem = useCallback((collection: keyof typeof data, id: string, updates: any) => {
    setData(prev => ({
      ...prev,
      [collection]: (prev[collection] as any[]).map(item => 
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      )
    }));
  }, [setData]);

  const deleteItem = useCallback((collection: keyof typeof data, id: string) => {
    setData(prev => ({
      ...prev,
      [collection]: (prev[collection] as any[]).filter(item => item.id !== id)
    }));
  }, [setData]);

  const reorderItems = useCallback((collection: keyof typeof data, items: any[]) => {
    setData(prev => ({
      ...prev,
      [collection]: items.map((item, index) => ({ ...item, order: index }))
    }));
  }, [setData]);

  const updateStats = useCallback((stats: Partial<typeof data.stats>) => {
    setData(prev => ({
      ...prev,
      stats: { ...prev.stats, ...stats }
    }));
  }, [setData]);

  const updateContactInfo = useCallback((contactInfo: Partial<typeof data.contactInfo>) => {
    setData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...contactInfo }
    }));
  }, [setData]);

  return {
    data,
    setData,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
    updateStats,
    updateContactInfo
  };
}

// Hook for admin authentication
export function useAdminAuth() {
  const [auth, setAuth] = useLocalStorageState('adminAuth', {
    isAuthenticated: false,
    loginTime: null as string | null
  });

  const login = useCallback((password: string): boolean => {
    // Hardcoded password for demo
    if (password === 'admin123') {
      setAuth({
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      });
      return true;
    }
    return false;
  }, [setAuth]);

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      loginTime: null
    });
  }, [setAuth]);

  const checkAuth = useCallback((): boolean => {
    if (!auth.isAuthenticated || !auth.loginTime) return false;
    
    // Check if session is still valid (24 hours)
    const loginTime = new Date(auth.loginTime).getTime();
    const now = new Date().getTime();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      logout();
      return false;
    }
    
    return true;
  }, [auth, logout]);

  return {
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
    checkAuth
  };
}
