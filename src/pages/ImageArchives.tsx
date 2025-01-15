import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

const ImageArchives: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'hexagons', 'architecture', 'abstract', 'cosmic'];

  const images: ImageCard[] = [
    {
      id: '1',
      title: 'Infinite Hexagons',
      description: 'A visualization of the library\'s hexagonal structure extending into infinity.',
      category: 'hexagons',
      image: 'https://libraryofbabel.info/img/hexgrau.jpg'
    },
    {
      id: '2',
      title: 'Library Architecture',
      description: 'The intricate architectural design of the library\'s galleries.',
      category: 'architecture',
      image: 'https://libraryofbabel.app/image/shelves.png'
    },
    {
      id: '3',
      title: 'Abstract Knowledge',
      description: 'An abstract representation of the library\'s infinite knowledge.',
      category: 'abstract',
      image: 'https://libraryofbabel.app/image/mucha.png'
    },
    {
      id: '4',
      title: 'Cosmic Library',
      description: 'The library viewed as a cosmic entity containing all possible knowledge.',
      category: 'cosmic',
      image: 'data:image/jpeg;base64,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'
    }
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Image Archives
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-4 mb-8"
      >
        {categories.map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{image.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-[60vh] object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedImage.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageArchives;