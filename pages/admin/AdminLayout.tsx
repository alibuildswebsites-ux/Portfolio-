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

  // Fixed dark background for sidebar
  const sidebarBg = "bg-[#2D2D2D] text-white";

  return (
    <div className="min-h-screen bg-pastel-cream flex flex-col md:flex-row font-sans text-pastel-charcoal transition-colors duration-500 relative">
      
      {/* Mobile Header */}
      <div className={`md:hidden ${sidebarBg} p-4 flex justify-between items-center shadow-md z-50 sticky top-0`}>
          <span className="font-pixel text-xl text-pastel-blue">ADMIN PANEL</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-pastel-blue transition-colors">
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-14 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        ${sidebarBg} flex flex-col z-40
        fixed md:sticky top-14 md:top-0 left-0 w-64 h-[calc(100vh-56px)] md:h-screen
        transition-transform duration-300 ease-in-out md:translate-x-0 shadow-xl md:shadow-none
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
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full md:ml-0">
        <div className="max-w-6xl mx-auto">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;