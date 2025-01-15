import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Theory: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = [
    {
      id: "mathematics",
      title: "Mathematical Foundation",
      image: "https://source.unsplash.com/random/800x400?mathematics,infinity",
      content: "The Library's mathematical foundation is based on combinatorial mathematics. With 25 characters and 1,312,000 character positions per book, the total number of possible books exceeds the number of atoms in the observable universe.",
      details: [
        "Total characters per book: 1,312,000",
        "Number of possible books: 25^1,312,000",
        "Character set: 22 letters, space, comma, period"
      ]
    },
    {
      id: "philosophy",
      title: "Philosophical Implications",
      image: "https://source.unsplash.com/random/800x400?philosophy,thinking",
      content: "The Library raises profound questions about infinity, meaning, and the nature of information. It contains all possible truths, but also all possible falsehoods.",
      details: [
        "The paradox of infinite knowledge",
        "The nature of truth and meaning",
        "Information theory and noise"
      ]
    },
    {
      id: "implementation",
      title: "Digital Implementation",
      image: "https://source.unsplash.com/random/800x400?technology,code",
      content: "Our digital version uses deterministic algorithms to generate the content of any book at any location, making the theoretical library explorable.",
      details: [
        "Deterministic page generation",
        "Consistent addressing system",
        "Efficient search algorithms"
      ]
    }
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
        Theoretical Foundations
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => setSelectedSection(section.id === selectedSection ? null : section.id)}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-sm">{section.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSection(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {sections.find(s => s.id === selectedSection) && (
                <>
                  <h2 className="text-3xl font-bold mb-6">
                    {sections.find(s => s.id === selectedSection)?.title}
                  </h2>
                  <div className="space-y-4">
                    {sections.find(s => s.id === selectedSection)?.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Interactive Timeline</h2>
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-gray-300 dark:bg-gray-600" />
          {[1941, 1998, 2023].map((year, index) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="ml-8 mb-8 relative"
            >
              <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gray-500 dark:bg-gray-400" />
              <div className="text-xl font-bold mb-2">{year}</div>
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                {year === 1941 && "Jorge Luis Borges publishes 'The Library of Babel'"}
                {year === 1998 && "First digital implementations of the library concept"}
                {year === 2023 && "Modern interactive version with advanced search capabilities"}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Theory;