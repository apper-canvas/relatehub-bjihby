import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const ArrowLeft = getIcon('ArrowLeft');
  const AlertTriangle = getIcon('AlertTriangle');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-surface-100 dark:bg-surface-800">
        <AlertTriangle size={40} className="text-accent" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-surface-800 dark:text-surface-200">
        Page Not Found
      </h2>
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Return to the dashboard to continue managing your relationships.
      </p>
      
      <Link 
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <ArrowLeft size={18} />
        <span>Back to Dashboard</span>
      </Link>
    </motion.div>
  );
}

export default NotFound;