import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/journal');
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/journal`
          }
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      }
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4 pt-20">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-primary/20">
          <div className="text-center mb-8">
            <img src="https://i.ibb.co/dG7pB0m/xanthe-icon.jpg" alt="Xanthe Journal Icon" className="w-14 h-14 rounded-xl mb-4 inline-block" />
            <h1 className="text-3xl font-bold text-accent">Welcome to Xanthe Journal</h1>
            <p className="text-text-secondary mt-2">{isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started'}</p>
          </div>

          <div className="flex bg-background p-1 rounded-lg mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${isLogin ? 'bg-primary text-background' : 'text-text-secondary hover:bg-surface/50'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${!isLogin ? 'bg-primary text-background' : 'text-text-secondary hover:bg-surface/50'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-background border border-surface rounded-lg text-accent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-background border border-surface rounded-lg text-accent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-background rounded-lg font-semibold text-lg hover:bg-primary-light transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center text-danger text-sm"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg flex items-center text-success text-sm"
            >
              <User className="w-5 h-5 mr-2" />
              {message}
            </motion.div>
          )}

          <div className="text-center mt-6">
            <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
              {isLogin ? 'Forgot password?' : ''}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
