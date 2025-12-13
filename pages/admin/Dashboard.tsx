
import React, { useEffect, useState } from 'react';
import { Folder, Star, Mail, Clock, Plus, MessageSquare } from 'lucide-react';
import * as db from '../../services/storage';
import PixelButton from '../../components/ui/PixelButton';
import { useNavigate } from 'react-router-dom';

// Extracted Component
const Card = ({ title, count, icon, color }: { title: string, count: number | string, icon: React.ReactNode, color: string }) => (
  <div className={`bg-white border-2 border-pastel-charcoal p-6 shadow-pixel relative overflow-hidden group`}>
     <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 ${color}`}>
        {icon}
     </div>
     <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">{title}</h3>
     <p className="font-pixel text-5xl text-pastel-charcoal">{count}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ p: 0, t: 0, m: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const p = await db.getProjects();
      const t = await db.getTestimonials();
      const m = await db.getMessages();
      setStats({ p: p.length, t: t.length, m: m.filter(msg => msg.status === 'unread').length });
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="font-pixel text-3xl mb-8 text-pastel-charcoal">Dashboard Overview</h2>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
         <PixelButton onClick={() => navigate('/dashboard/projects')} className="w-full">
            <Plus size={18} className="inline mr-2" /> Add Project
         </PixelButton>
         <PixelButton onClick={() => navigate('/dashboard/testimonials')} className="w-full">
            <Plus size={18} className="inline mr-2" /> Add Testimonial
         </PixelButton>
         <PixelButton onClick={() => navigate('/dashboard/messages')} variant="secondary" className="w-full">
            <MessageSquare size={18} className="inline mr-2" /> View Inbox
         </PixelButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card title="Total Projects" count={stats.p} icon={<Folder size={64} />} color="text-pastel-blue" />
        <Card title="Total Testimonials" count={stats.t} icon={<Star size={64} />} color="text-pastel-lavender" />
        <Card title="Unread Messages" count={stats.m} icon={<Mail size={64} />} color="text-pastel-peach" />
        <Card title="Avg. Response" count="2h" icon={<Clock size={64} />} color="text-pastel-mint" />
      </div>

      <div className="bg-white border-2 border-pastel-charcoal p-8 shadow-pixel">
        <h3 className="font-pixel text-xl mb-4 border-b-2 border-gray-100 pb-2">System Status</h3>
        <p className="text-green-600 font-bold flex items-center gap-2">
           <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
           All systems operational. Database connected (Local Storage).
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
