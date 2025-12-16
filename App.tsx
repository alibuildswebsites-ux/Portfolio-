import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import Testimonials from './pages/admin/Testimonials';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';
import ScrollToTop from './components/ui/ScrollToTop';
import Preloader from './components/ui/Preloader';
import * as db from './services/storage';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    db.checkSession().then(auth => setIsAuth(auth));
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-pastel-cream flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-10 w-10 text-pastel-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-pixel text-xl text-pastel-charcoal tracking-wide animate-pulse">Verifying Access...</span>
      </div>
    );
  }
  
  if (!isAuth) return <Navigate to="/admin" replace />;

  return <>{children}</>;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <AudioProvider>
         <HashRouter>
            <ScrollToTop />
            <AnimatePresence>
               {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            <Routes>
              <Route path="/" element={<Home startTypewriter={!loading} />} />
              <Route path="/admin" element={<Login />} />

              <Route path="/dashboard" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </HashRouter>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default App;