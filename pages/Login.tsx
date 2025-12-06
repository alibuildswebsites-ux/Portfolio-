import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../components/ui/PixelButton';
import * as db from '../services/storage';
import { ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Network Delay
    await new Promise(r => setTimeout(r, 800));

    const user = db.getUser();
    
    // Simple comparison (in production use bcrypt.compare)
    if (username === user.username && password === user.passwordHash) {
      db.setSession(true);
      navigate('/admin-dashboard-secure-2024');
    } else {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-pastel-cream flex items-center justify-center p-4">
      <div className="bg-white border-4 border-pastel-charcoal p-8 w-full max-w-md shadow-pixel-lg">
        <h1 className="font-pixel text-4xl text-center mb-8 text-pastel-charcoal">ADMIN LOGIN</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Username</label>
            <input 
              type="text" 
              className="w-full border-2 border-pastel-charcoal p-3 focus:outline-none focus:shadow-pixel focus:border-pastel-blue transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-pastel-charcoal p-3 focus:outline-none focus:shadow-pixel focus:border-pastel-blue transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-600 p-3 text-center border-2 border-red-200">
              {error}
            </div>
          )}
          
          <PixelButton type="submit" className="w-full" isLoading={isLoading}>
            Enter Dashboard
          </PixelButton>
        </form>

        <div className="mt-4">
          <PixelButton 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={() => navigate('/')}
            type="button"
          >
            <ArrowLeft size={16} /> Back to Website
          </PixelButton>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
           Protected Area. Authorized Personnel Only.
        </div>
      </div>
    </div>
  );
};

export default Login;