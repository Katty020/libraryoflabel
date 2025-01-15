import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReferenceHex: React.FC = () => {
  const [activeHex, setActiveHex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const hexagons = [
    { id: 1, title: "North", content: "Path to knowledge" },
    { id: 2, title: "Northeast", content: "Realm of possibilities" },
    { id: 3, title: "Southeast", content: "Chamber of secrets" },
    { id: 4, title: "South", content: "Gateway to wisdom" },
    { id: 5, title: "Southwest", content: "Portal of discovery" },
    { id: 6, title: "Northwest", content: "Bridge to understanding" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        The Reference Hexagon
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          className="relative w-[400px] h-[400px]"
          animate={{ rotate: rotation }}
          transition={{ duration: 1 }}
        >
          {hexagons.map((hex, index) => {
            const angle = (index * 60 * Math.PI) / 180;
            const x = 150 * Math.cos(angle) + 200;
            const y = 150 * Math.sin(angle) + 200;

            return (
              <motion.div
                key={hex.id}
                className={`absolute w-24 h-24 cursor-pointer ${
                  activeHex === hex.id ? 'z-10' : 'z-0'
                }`}
                style={{
                  left: x - 48,
                  top: y - 48,
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveHex(hex.id)}
              >
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
                  {hex.title}
                </div>
              </motion.div>
            );
          })}
          <motion.div
            className="absolute left-1/2 top-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-600 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setRotation(rotation + 60)}
          >
            Central Hub
          </motion.div>
        </motion.div>

        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Navigation Guide</h2>
            <p className="mb-4">
              Click on any hexagon to explore its contents. Rotate the structure by clicking the central hub.
            </p>
            {activeHex && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-white dark:bg-gray-700 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-2">
                  {hexagons.find(h => h.id === activeHex)?.title}
                </h3>
                <p>{hexagons.find(h => h.id === activeHex)?.content}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Structure Details</h2>
            <ul className="space-y-2">
              <li>• 4 Walls per hexagon</li>
              <li>• 5 Shelves per wall</li>
              <li>• 32 Books per shelf</li>
              <li>• 410 Pages per book</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferenceHex;