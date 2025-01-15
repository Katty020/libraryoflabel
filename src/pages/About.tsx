import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const sections = [
    {
      title: "The Infinite Library",
      image: "https://miro.medium.com/v2/resize:fit:1200/1*6Jp3vJWe7VFlFHZ9WhSJng.jpeg",
      content: "The Library of Babel contains all possible 410-page books. Every book that has been written, and every book that could be written, exists within its walls."
    },
    {
      title: "The Structure",
      image: "https://64.media.tumblr.com/tumblr_ltvk2bcRku1r30z7co1_1280.jpg",
      content: "Hexagonal galleries, extending infinitely in all directions, house the vast collection of books that contain every possible combination of characters."
    },
    {
      title: "The Mathematics",
      image: "https://bookzoompa.wordpress.com/wp-content/uploads/2018/10/img_20181007_1421152629470064551758666.jpg",
      content: "With 25 basic characters (22 letters, space, comma, and period) and 1,312,000 character positions per book, the library contains every possible permutation."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4"
    >
      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        About the Library of Babel
      </motion.h1>
      
      <div className="space-y-16">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <motion.div 
              className="w-full md:w-1/2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={section.image} 
                alt={section.title}
                className="rounded-lg shadow-2xl w-full h-[300px] object-cover"
              />
            </motion.div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">{section.title}</h2>
              <p className="text-lg leading-relaxed">{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Interactive Exploration</h2>
        <p className="text-lg mb-4">
          Discover the vastness of the library through our interactive tools:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Browse', 'Search', 'Random'].map((tool) => (
            <motion.div
              key={tool}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{tool}</h3>
              <p>Explore the library using our {tool.toLowerCase()} functionality.</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;