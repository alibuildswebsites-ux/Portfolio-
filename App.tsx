
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import Testimonials from './pages/admin/Testimonials';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';
import ScrollToTop from './components/ui/ScrollToTop';
import Preloader from './components/ui/Preloader'; // Import Preloader
import * as db from './services/storage';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { AnimatePresence } from 'framer-motion';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!db.checkSession()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // You can optionally use sessionStorage to show preloader only once per session
  useEffect(() => {
      // const hasLoaded = sessionStorage.getItem('hasLoaded');
      // if (hasLoaded) { setIsLoading(false); }
  }, []);

  const handlePreloaderComplete = () => {
      setIsLoading(false);
      // sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <ThemeProvider>
      <AudioProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
             <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          ) : (
             <HashRouter>
                {/* Global Components */}
                <ScrollToTop />
                
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/admin-login" element={<Login />} />

                  {/* Protected Admin Routes */}
                  <Route 
                    path="/admin-dashboard-secure-2024" 
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="testimonials" element={<Testimonials />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* Catch all - Redirect to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
             </HashRouter>
          )}
        </AnimatePresence>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default App;
