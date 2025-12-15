
import React, { useEffect, useState } from 'react';
import { Folder, Star, Mail, Clock, Plus, MessageSquare, Database } from 'lucide-react';
import * as db from '../../services/storage';
import { seedDatabase } from '../../services/seeder';
import PixelButton from '../../components/ui/PixelButton';
import { useNavigate } from 'react-router-dom';

// Extracted Component
const Card = ({ title, count, icon, color }: { title: string, count: number | string, icon: React.ReactNode, color: string }) => (
  <div className={`bg-pastel-surface border-2 border-pastel-charcoal p-4 sm:p-6 shadow-pixel relative overflow-hidden group transition-all hover:-translate-y-1`}>
     <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 ${color}`}>
        {icon}
     </div>
     <h3 className="text-pastel-charcoal/70 font-bold uppercase tracking-wider text-xs sm:text-sm mb-2">{title}</h3>
     <p className="font-pixel text-4xl sm:text-5xl text-pastel-charcoal break-words">{count}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ p: 0, t: 0, m: 0 });
  const [isSeeding, setIsSeeding] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const p = await db.getProjects();
    const t = await db.getTestimonials();
    const m = await db.getMessages();
    setStats({ p: p.length, t: t.length, m: m.filter(msg => msg.status === 'unread').length });
  };

  useEffect(() => {
    load();
  }, []);

  const handleSeed = async () => {
    if (!window.confirm("This will add demo data to your database. Continue?")) return;
    
    setIsSeeding(true);
    try {
      await seedDatabase();
      await load(); // Refresh stats
      alert("Demo data added successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Failed to seed data: " + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="font-pixel text-2xl sm:text-3xl text-pastel-charcoal">Dashboard Overview</h2>
        <button 
           onClick={handleSeed}
           disabled={isSeeding}
           className="text-xs sm:text-sm flex items-center gap-2 text-pastel-charcoal/50 hover:text-pastel-blue transition-colors disabled:opacity-50"
        >
           <Database size={16} /> {isSeeding ? 'Seeding...' : 'Seed Demo Data'}
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
         <PixelButton onClick={() => navigate('/dashboard/projects')} className="w-full">
            <Plus size={18} className="inline mr-2" /> <span className="text-sm sm:text-base">Add Project</span>
         </PixelButton>
         <PixelButton onClick={() => navigate('/dashboard/testimonials')} className="w-full">
            <Plus size={18} className="inline mr-2" /> <span className="text-sm sm:text-base">Add Testimonial</span>
         </PixelButton>
         <PixelButton onClick={() => navigate('/dashboard/messages')} variant="secondary" className="w-full sm:col-span-2 lg:col-span-1">
            <MessageSquare size={18} className="inline mr-2" /> <span className="text-sm sm:text-base">View Inbox</span>
         </PixelButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <Card title="Total Projects" count={stats.p} icon={<Folder size={64} />} color="text-pastel-blue" />
        <Card title="Total Testimonials" count={stats.t} icon={<Star size={64} />} color="text-pastel-lavender" />
        <Card title="Unread Messages" count={stats.m} icon={<Mail size={64} />} color="text-pastel-peach" />
        <Card title="Avg. Response" count="2h" icon={<Clock size={64} />} color="text-pastel-mint" />
      </div>

      <div className="bg-pastel-surface border-2 border-pastel-charcoal p-6 sm:p-8 shadow-pixel">
        <h3 className="font-pixel text-xl mb-4 border-b-2 border-pastel-gray pb-2 text-pastel-charcoal">System Status</h3>
        <p className="text-green-600 font-bold flex items-center gap-2 text-sm sm:text-base">
           <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
           All systems operational. Database connected.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
