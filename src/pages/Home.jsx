import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalContacts: 234,
    activeDeals: 45,
    tasksCompleted: 12,
    pendingTasks: 8
  });

  const LayoutDashboard = getIcon('LayoutDashboard');
  const Users = getIcon('Users');
  const Briefcase = getIcon('Briefcase');
  const Calendar = getIcon('Calendar');
  const BarChart2 = getIcon('BarChart2');
  const Settings = getIcon('Settings');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'deals', name: 'Deals', icon: Briefcase },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'reports', name: 'Reports', icon: BarChart2 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast.info(`Navigated to ${tabId} section`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden border border-surface-200 dark:border-surface-700">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  } transition-colors duration-150`}
                >
                  <span className="mr-3">
                    <tab.icon size={18} />
                  </span>
                  <span>{tab.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Stats section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Stat cards */}
            <div className="card p-4">
              <p className="text-sm text-surface-500 dark:text-surface-400">Total Contacts</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.totalContacts}</h3>
              <div className="mt-2 text-xs font-medium text-green-500">
                +12% from last month
              </div>
            </div>
            
            <div className="card p-4">
              <p className="text-sm text-surface-500 dark:text-surface-400">Active Deals</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.activeDeals}</h3>
              <div className="mt-2 text-xs font-medium text-green-500">
                +8% from last month
              </div>
            </div>
            
            <div className="card p-4">
              <p className="text-sm text-surface-500 dark:text-surface-400">Tasks Completed</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.tasksCompleted}</h3>
              <div className="mt-2 text-xs font-medium text-green-500">
                Today
              </div>
            </div>
            
            <div className="card p-4">
              <p className="text-sm text-surface-500 dark:text-surface-400">Pending Tasks</p>
              <h3 className="mt-1 text-2xl font-bold">{stats.pendingTasks}</h3>
              <div className="mt-2 text-xs font-medium text-orange-500">
                Due this week
              </div>
            </div>
          </motion.div>

          {/* Main feature */}
          <motion.div variants={itemVariants}>
            <MainFeature />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;