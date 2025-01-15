import React, { useState } from "react";
import { motion } from "framer-motion";

const generateMockContent = () => {
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

const generateMockData = () => {
  const mockData: any = {};
  const roomsCount = 100; 
  const wallsCount = 4; 
  const shelvesCount = 5;
  const volumesCount = 32; 

  for (let room = 1; room <= roomsCount; room++) {
    const roomData: any = { walls: {} };

    for (let wall = 1; wall <= wallsCount; wall++) {
      const wallData: any = { shelves: {} };

      for (let shelf = 1; shelf <= shelvesCount; shelf++) {
        const shelfData: any = { volumes: {} };

        for (let volume = 1; volume <= volumesCount; volume++) {
          shelfData.volumes[volume] = generateMockContent();
        }

        wallData.shelves[shelf] = shelfData;
      }

      roomData.walls[wall] = wallData;
    }

    mockData[room] = roomData;
  }

  return mockData;
};

const mockData = generateMockData();

const Browse: React.FC = () => {
  const [location, setLocation] = useState({
    room: 1,
    wall: 1,
    shelf: 1,
    volume: 1,
    page: 1,
  });

  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { room, wall, shelf, volume } = location;

    const roomData = mockData[room];
    if (roomData) {
      const wallData = roomData.walls[wall];
      if (wallData) {
        const shelfData = wallData.shelves[shelf];
        if (shelfData) {
          const volumeData = shelfData.volumes[volume];
          if (volumeData) {
            setContent(volumeData);
            return;
          }
        }
      }
    }

    setContent("Content not found for the specified location.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Browse the Library</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Room</label>
            <input
              type="number"
              min="1"
              value={location.room}
              onChange={(e) => setLocation({ ...location, room: parseInt(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter room number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Wall (1-4)</label>
              <input
                type="number"
                min="1"
                max="4"
                value={location.wall}
                onChange={(e) => setLocation({ ...location, wall: parseInt(e.target.value) })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Shelf (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={location.shelf}
                onChange={(e) => setLocation({ ...location, shelf: parseInt(e.target.value) })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Volume (1-32)</label>
            <input
              type="number"
              min="1"
              max="32"
              value={location.volume}
              onChange={(e) => setLocation({ ...location, volume: parseInt(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Go to Location
        </button>
      </form>

      {content && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border rounded dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          <p className="whitespace-pre-wrap font-mono">{content}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Browse;
 