import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HexagonLogo from '../components/HexagonLogo';

const Home: React.FC = () => {
  const menuItems = [
    { title: 'Browse', path: '/browse' },
    { title: 'Search', path: '/search' },
    { title: 'Random', path: '/random' },
    { title: 'About', path: '/about' },
    { title: 'Reference Hex', path: '/reference' },
    { title: 'Theory', path: '/theory' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] space-y-8"
    >
      <HexagonLogo />
      
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-center"
      >
        Library of Babel
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-gray-600 dark:text-gray-400 max-w-md"
      >
        By this art you may contemplate the variation of the 23 letters
      </motion.p>
    </motion.div>
  );
};

export default Home;