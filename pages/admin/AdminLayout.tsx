import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, LogOut, Star } from 'lucide-react';
import * as db from '../../services/storage';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    db.setSession(false);
    navigate('/admin-login');
  };

  const navItems = [
    { to: '/admin-dashboard-secure-2024', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/admin-dashboard-secure-2024/projects', icon: <FolderOpen size={20} />, label: 'Projects' },
    { to: '/admin-dashboard-secure-2024/testimonials', icon: <Star size={20} />, label: 'Testimonials' },
    { to: '/admin-dashboard-secure-2024/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { to: '/admin-dashboard-secure-2024/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-pastel-charcoal text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-pixel text-2xl text-pastel-blue">ADMIN PANEL</h1>
          <p className="text-xs text-gray-400 mt-1">Manage Portfolio</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-none transition-all border-l-4
                ${isActive 
                  ? 'bg-gray-800 border-pastel-blue text-pastel-blue' 
                  : 'hover:bg-gray-800 border-transparent text-gray-300'}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
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
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;