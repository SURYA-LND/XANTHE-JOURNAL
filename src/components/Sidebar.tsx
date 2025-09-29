import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, PieChart, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/journal' },
    { name: 'Journal', icon: BookOpen, path: '/journal/trades' },
    { name: 'Analytics', icon: PieChart, path: '/journal/analytics', disabled: true },
    { name: 'Settings', icon: Settings, path: '/journal/settings', disabled: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface">
      <div className="p-6 flex items-center space-x-3 border-b border-primary/20">
        <img src="https://i.ibb.co/dG7pB0m/xanthe-icon.jpg" alt="Xanthe Journal Icon" className="w-10 h-10 rounded-lg" />
        <span className="text-xl font-bold text-accent">Xanthe Journal</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/journal'}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                alert('Coming soon!');
              } else {
                setIsMobileOpen(false);
              }
            }}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-primary/20 text-accent shadow-inner'
                  : item.disabled
                  ? 'text-text-secondary/50 cursor-not-allowed'
                  : 'text-text-secondary hover:bg-background hover:text-accent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 mr-4 ${isActive ? 'text-primary' : item.disabled ? 'text-text-secondary/50' : 'group-hover:text-primary'}`} />
                <span className="font-medium">{item.name}</span>
                {item.disabled && <span className="ml-auto text-xs bg-background text-text-secondary px-2 py-0.5 rounded-full">Soon</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-primary/20">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 rounded-lg text-danger hover:bg-danger/20 transition-colors duration-300 group"
        >
          <LogOut className="w-5 h-5 mr-4 group-hover:text-danger" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-surface/90 backdrop-blur-sm h-16 border-b border-primary/20">
        <div className="flex items-center space-x-2">
          <NavLink to="/journal" className="flex items-center space-x-2">
            <img src="https://i.ibb.co/dG7pB0m/xanthe-icon.jpg" alt="Xanthe Journal Icon" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold text-accent">Xanthe</span>
          </NavLink>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-accent">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-64 z-50 md:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
