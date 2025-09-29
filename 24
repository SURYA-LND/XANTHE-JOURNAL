import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Lock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="pt-16 md:pt-0">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-accent mb-2">
          Welcome back, <span className="text-primary">{user?.email?.split('@')[0] || 'Trader'}</span>!
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-text-secondary mb-12">
          Ready to analyze your trades and master your strategy?
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Link to="/journal/trades" className="block h-full">
              <div className="group relative h-full bg-surface p-6 rounded-2xl hover:shadow-lg transition-all duration-500 hover:scale-102 overflow-hidden border border-transparent hover:border-success/50">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-success/20 rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-accent mb-3">Free Trial Journal</h2>
                  <p className="text-text-secondary mb-6 flex-grow">
                    Start journaling with our free demo. Add up to 10 trades, upload charts, and see basic analytics.
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-base bg-success text-white group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all">
                      Start Journaling
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="group relative h-full bg-surface p-6 rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-102 overflow-hidden border border-primary/50">
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-primary text-background px-4 py-1.5 rounded-full text-sm font-bold flex items-center">
                  <Star className="w-4 h-4 mr-2" /> Best Value
                </span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-accent mb-3">Upgrade to Pro</h2>
                <p className="text-text-secondary mb-2">Unlock unlimited trades, AI-powered analytics, advanced reporting, and priority support.</p>
                <p className="text-3xl font-bold text-primary mb-6">$79 <span className="text-lg text-text-secondary font-normal">/ Lifetime</span></p>
                <div className="mt-auto">
                  <button disabled className="w-full px-5 py-2.5 rounded-lg font-semibold text-base bg-primary text-background opacity-70 cursor-not-allowed group-hover:opacity-100 group-hover:shadow-glow transition-all">
                    Upgrade Now (Coming Soon)
                  </button>
                </div>
              </div>
               <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center group-hover:hidden transition-all duration-500">
                  <Lock className="w-16 h-16 text-primary/50" />
               </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
