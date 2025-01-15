import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Search from './pages/Search';
import Random from './pages/Random';
import About from './pages/About';
import ReferenceHex from './pages/ReferenceHex';
import Theory from './pages/Theory';
import ImageArchives from './pages/ImageArchives';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<Search />} />
            <Route path="/random" element={<Random />} />
            <Route path="/about" element={<About />} />
            <Route path="/reference" element={<ReferenceHex />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/image-archives" element={<ImageArchives />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;