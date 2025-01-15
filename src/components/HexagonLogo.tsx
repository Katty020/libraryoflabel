import React from 'react';
import { motion } from 'framer-motion';

const HexagonLogo: React.FC = () => {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 1 }}
    >
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          d={`M50 ${10 + i * 8} L85 ${30 + i * 8} L85 ${70 + i * 8} L50 ${90 + i * 8} L15 ${70 + i * 8} L15 ${30 + i * 8} Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </motion.svg>
  );
};

export default HexagonLogo;