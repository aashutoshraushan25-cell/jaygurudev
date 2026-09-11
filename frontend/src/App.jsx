import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SatsangListingPage } from './pages/SatsangListingPage';
import { StatesPage } from './pages/StatesPage';
import { DistrictsPage } from './pages/DistrictsPage';
import { SatsangDetailPage } from './pages/SatsangDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminSatsangManager } from './pages/AdminSatsangManager';
import { AdminLocationManager } from './pages/AdminLocationManager';
import { AdminYouTubeManager } from './pages/AdminYouTubeManager';
import { DailyBannerPage } from './pages/DailyBannerPage';
import { UserAuthPage } from './pages/UserAuthPage';
import { useAuth } from './context/AuthContext';
import { LoadingSpinner } from './components/LoadingSpinner';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner text="सत्र की जांच की जा रही है..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/daily-banner" element={<DailyBannerPage />} />
          <Route path="/login" element={<UserAuthPage />} />
          <Route path="/register" element={<UserAuthPage />} />
          <Route path="/satsang" element={<SatsangListingPage />} />
          <Route path="/satsang/:id" element={<SatsangDetailPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/states/:stateId" element={<DistrictsPage />} />
          <Route path="/states/:stateId/districts" element={<DistrictsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/satsangs"
            element={
              <ProtectedRoute>
                <AdminSatsangManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/locations"
            element={
              <ProtectedRoute>
                <AdminLocationManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/youtube"
            element={
              <ProtectedRoute>
                <AdminYouTubeManager />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
