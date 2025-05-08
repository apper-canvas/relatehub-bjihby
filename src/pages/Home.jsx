import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainFeature from '../components/MainFeature';

function Home() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6">
        <MainFeature />

        {/* More dashboard components would go here */}
      </div>
    </div>
  );
}

export default Home;