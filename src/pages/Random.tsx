import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomContent = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz,.-!? ";
  const lines = 40; 
  const charactersPerLine = 80; 
  const pageContent: string[] = [];

  for (let i = 0; i < lines; i++) {
    let line = "";
    for (let j = 0; j < charactersPerLine; j++) {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      line += randomChar;
    }
    pageContent.push(line);
  }

  return pageContent.join("\n");
};

const generateRandomLocation = () => {
  const rooms = Array.from({ length: 100 }, (_, i) => i + 1); 
  const walls = [1, 2, 3, 4]; 
  const shelves = [1, 2, 3, 4, 5]; 
  const volumes = Array.from({ length: 32 }, (_, i) => i + 1); 
  const pages = Array.from({ length: 200 }, (_, i) => i + 1); 

  const room = rooms[Math.floor(Math.random() * rooms.length)];
  const wall = walls[Math.floor(Math.random() * walls.length)];
  const shelf = shelves[Math.floor(Math.random() * shelves.length)];
  const volume = volumes[Math.floor(Math.random() * volumes.length)];
  const page = pages[Math.floor(Math.random() * pages.length)];

  return {
    room,
    wall,
    shelf,
    volume,
    page,
    content: generateRandomContent(),
  };
};

const Random: React.FC = () => {
  const [randomPage, setRandomPage] = useState({
    room: 0,
    wall: 0,
    shelf: 0,
    volume: 0,
    page: 0,
    content: '',
  });

  const getNewPage = () => {
    const newRandomPage = generateRandomLocation();
    setRandomPage(newRandomPage);
  };

  React.useEffect(() => {
    getNewPage();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Random Page</h1>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={getNewPage}
        className="px-6 py-2 mb-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Get Another Random Page
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border rounded dark:border-gray-700"
      >
        <div className="font-mono text-sm mb-4">
          <div>Room: {randomPage.room}</div>
          <div>Wall: {randomPage.wall}</div>
          <div>Shelf: {randomPage.shelf}</div>
          <div>Volume (Book): {randomPage.volume}</div>
          <div>Page: {randomPage.page}</div>
        </div>
        <p className="whitespace-pre-wrap font-mono">{randomPage.content}</p>
      </motion.div>
    </motion.div>
  );
};

export default Random;
