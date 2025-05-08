import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function Sidebar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Icons
  const Home = getIcon('Home');
  const Users = getIcon('Users');
  const BarChart2 = getIcon('BarChart2');
  const Menu = getIcon('Menu');
  const X = getIcon('X');
  const Sun = getIcon('Sun');
  const Moon = getIcon('Moon');
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isOpen) setIsOpen(false);
  };
  
  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/deals', label: 'Deals', icon: BarChart2 },
  ];

  const activeNavClass = 'bg-primary/10 text-primary border-r-4 border-primary';
  const navClass = 'flex items-center gap-3 px-4 py-3 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors rounded-l-lg';

  return (
    <>
      {/* Mobile header */}
      <header className="sticky top-0 z-20 md:hidden bg-white dark:bg-surface-800 shadow-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            RelateHub
          </h1>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-300" />
            ) : (
              <Moon size={20} className="text-blue-800" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-0 md:w-72'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RelateHub
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 hidden md:block"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-blue-800" />
                )}
              </button>
              
              <button 
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 md:hidden"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 py-6 px-2">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) => 
                      `${navClass} ${isActive ? activeNavClass : ''}`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    {item.path === location.pathname && (
                      <motion.div
                        layoutId="activePath"
                        className="absolute left-0 w-1 h-full bg-primary"
                      />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;