import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, LogOut, Star, Menu, X } from 'lucide-react';
import * as db from '../../services/storage';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await db.logoutUser();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', exact: true },
    { to: '/dashboard/projects', icon: <FolderOpen size={20} />, label: 'Projects' },
    { to: '/dashboard/testimonials', icon: <Star size={20} />, label: 'Testimonials' },
    { to: '/dashboard/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-pastel-charcoal text-white p-4 flex justify-between items-center shadow-md z-20 sticky top-0">
          <span className="font-pixel text-xl text-pastel-blue">ADMIN PANEL</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        bg-pastel-charcoal text-white flex flex-col z-10
        fixed md:sticky top-14 md:top-0 left-0 w-full md:w-64 h-[calc(100vh-56px)] md:h-screen
        transition-transform duration-300 md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-700 hidden md:block">
          <h1 className="font-pixel text-2xl text-pastel-blue">ADMIN PANEL</h1>
          <p className="text-xs text-gray-400 mt-1">Manage Portfolio</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.exact 
                ? location.pathname === item.to 
                : location.pathname.startsWith(item.to);
                
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-none transition-all border-l-4 no-underline
                  ${isActive 
                    ? 'bg-gray-800 border-pastel-blue text-pastel-blue' 
                    : 'hover:bg-gray-800 border-transparent text-gray-300'}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
           {/* Renders the child route components */}
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;