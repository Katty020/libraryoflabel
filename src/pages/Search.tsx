import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock function to generate random content (as before)
const generateMockContent = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz,.-!? ";
  const lines = 40; // Number of lines per page
  const charactersPerLine = 80; // Characters per line
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

// Generate mock data for multiple rooms, walls, shelves, and volumes
const generateMockData = () => {
  const mockData: any = {};
  const roomsCount = 5; // Create 5 rooms
  const wallsCount = 4; // 4 walls per room
  const shelvesCount = 5; // 5 shelves per wall
  const volumesCount = 32; // 32 volumes per shelf

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

// Generate the mock data dynamically
const mockData = generateMockData();

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<Array<{ location: string; preview: string }>>([]);

  // Function to handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const foundResults: Array<{ location: string; preview: string }> = [];

    // Search through all rooms, walls, shelves, and volumes
    for (const room in mockData) {
      const roomData = mockData[room];
      for (const wall in roomData.walls) {
        const wallData = roomData.walls[wall];
        for (const shelf in wallData.shelves) {
          const shelfData = wallData.shelves[shelf];
          for (const volume in shelfData.volumes) {
            const volumeData = shelfData.volumes[volume];
            
            // Check if the search text exists in the volume content
            if (volumeData.includes(searchText)) {
              const location = `Room ${room} > Wall ${wall} > Shelf ${shelf} > Volume ${volume}`;
              const preview = volumeData.slice(0, 200); // Preview first 200 characters
              foundResults.push({ location, preview });
            }
          }
        }
      }
    }

    setResults(foundResults);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Search the Library</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            placeholder="Enter text to search for..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded dark:border-gray-700">
              <div className="font-mono text-sm mb-2">{result.location}</div>
              <p className="text-gray-600 dark:text-gray-400">{result.preview}...</p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Search;
