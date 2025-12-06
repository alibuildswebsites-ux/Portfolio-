import React, { useState } from 'react';
import PixelButton from '../../components/ui/PixelButton';
import * as db from '../../services/storage';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const user = db.getUser();
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Password State
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  
  // Username State
  const [usr, setUsr] = useState({ newName: '', confirmPwd: '' });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (pwd.new.length < 4) {
      setMsg({ type: 'error', text: 'New password too short (min 4 chars).' });
      return;
    }
    if (pwd.new !== pwd.confirm) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (pwd.current !== user.passwordHash) {
       setMsg({ type: 'error', text: 'Current password incorrect.' });
       return;
    }

    await db.updateUser({ passwordHash: pwd.new });
    setMsg({ type: 'success', text: 'Password updated! Logging out...' });
    setTimeout(() => {
       db.setSession(false);
       navigate('/admin-login');
    }, 2000);
  };

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (usr.confirmPwd !== user.passwordHash) {
       setMsg({ type: 'error', text: 'Password incorrect.' });
       return;
    }
    
    await db.updateUser({ username: usr.newName });
    setMsg({ type: 'success', text: 'Username updated! Logging out...' });
    setTimeout(() => {
       db.setSession(false);
       navigate('/admin-login');
    }, 2000);
  };

  return (
    <div>
      <h2 className="font-pixel text-3xl mb-8">Account Settings</h2>
      
      {msg.text && (
        <div className={`p-4 mb-6 border-2 ${msg.type === 'error' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-green-100 border-green-300 text-green-700'}`}>
           {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Change Password */}
        <div className="bg-white border-2 border-pastel-charcoal p-6 sm:p-8 shadow-pixel">
           <h3 className="font-pixel text-xl mb-4 border-b pb-2">Change Password</h3>
           <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                 <label className="block text-sm font-bold mb-1">Current Password</label>
                 <input type="password" required className="w-full border p-2" value={pwd.current} onChange={e => setPwd({...pwd, current: e.target.value})} />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-1">New Password</label>
                 <input type="password" required className="w-full border p-2" value={pwd.new} onChange={e => setPwd({...pwd, new: e.target.value})} />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-1">Confirm New Password</label>
                 <input type="password" required className="w-full border p-2" value={pwd.confirm} onChange={e => setPwd({...pwd, confirm: e.target.value})} />
              </div>
              <PixelButton type="submit" className="w-full mt-4">Update Password</PixelButton>
           </form>
        </div>

        {/* Change Username */}
        <div className="bg-white border-2 border-pastel-charcoal p-6 sm:p-8 shadow-pixel">
           <h3 className="font-pixel text-xl mb-4 border-b pb-2">Change Username</h3>
           <p className="mb-4 text-sm text-gray-600">Current: <strong>{user.username}</strong></p>
           <form onSubmit={handleUsernameChange} className="space-y-4">
              <div>
                 <label className="block text-sm font-bold mb-1">New Username</label>
                 <input type="text" required className="w-full border p-2" value={usr.newName} onChange={e => setUsr({...usr, newName: e.target.value})} />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-1">Confirm Password</label>
                 <input type="password" required className="w-full border p-2" value={usr.confirmPwd} onChange={e => setUsr({...usr, confirmPwd: e.target.value})} />
              </div>
              <PixelButton type="submit" variant="secondary" className="w-full mt-4">Update Username</PixelButton>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;