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

  if (isAuth === null) return <div className="min-h-screen bg-pastel-cream flex items-center justify-center">Loading...</div>;
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
              <Route path="/" element={<Home />} />
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