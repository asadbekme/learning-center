import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeMockData } from '@/data/mockData';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import { PublicLayout } from '@/layouts/PublicLayout';
import { HomePage } from '@/pages/public/HomePage';
import { CoursesPage } from '@/pages/public/CoursesPage';
import { EventsPage } from '@/pages/public/EventsPage';
import { VacanciesPage } from '@/pages/public/VacanciesPage';
import { ResultsPage } from '@/pages/public/ResultsPage';
import { ContactPage } from '@/pages/public/ContactPage';

// Admin Pages
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminCourses } from '@/pages/admin/AdminCourses';
import { AdminEvents } from '@/pages/admin/AdminEvents';
import { AdminVacancies } from '@/pages/admin/AdminVacancies';
import { AdminResults } from '@/pages/admin/AdminResults';
import { AdminHomeSections } from '@/pages/admin/AdminHomeSections';
import { AdminSettings } from '@/pages/admin/AdminSettings';

// Protected Route
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="vacancies" element={<VacanciesPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="vacancies" element={<AdminVacancies />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="home-sections" element={<AdminHomeSections />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
