import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import NotFound from './pages/NotFound';

// Components
import getIcon from './utils/iconUtils';
import Sidebar from './components/Sidebar';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </div>
          
          <footer className="py-6 px-4 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
            <div className="container mx-auto text-center text-surface-600 dark:text-surface-400 text-sm">
              <p>© {new Date().getFullYear()} RelateHub. All rights reserved.</p>
            </div>
          </footer>
      </main>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg text-sm font-medium"
      />
    </div>
  );
}

export default App;