import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Login from './pages/Login';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [viewMode, setViewMode] = useState('grid');

  React.useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Extended mock state for resources (6 items)
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'CS50 2023 - Lecture 0 - Scratch',
      url: 'https://www.youtube.com/watch?v=8mAITcNt710',
      tag: 'DEV-BASICS-CS50', // updating tags to match routing structur
      timeAgo: '2 hours ago',
      votes: 145,
      comments: 32,
      userVote: 0
    },
    {
      id: 2,
      title: 'Striver - Trees all in one',
      url: 'https://www.youtube.com/watch?v=_PnFzKNrX0A',
      tag: 'dsa-all',
      timeAgo: '5 hours ago',
      votes: 89,
      comments: 14,
      userVote: 0
    },
    {
      id: 3,
      title: 'Stanford CS229: Machine Learning Course',
      url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
      tag: 'dev-aiml-ml',
      timeAgo: '1 day ago',
      votes: 356,
      comments: 102,
      userVote: 0
    },
    {
      id: 4,
      title: 'GATE CS 2024 Strategy & Roadmap',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tag: 'gate-general',
      timeAgo: '3 days ago',
      votes: 42,
      comments: 5,
      userVote: 0
    },
    {
      id: 5,
      title: 'Two Pointers Concept in 10 Minutes',
      url: 'https://www.youtube.com/watch?v=-Eqf5MB_OkE',
      tag: 'dsa-twopointer',
      timeAgo: '1 hour ago',
      votes: 215,
      comments: 18,
      userVote: 0
    },
    {
      id: 6,
      title: 'Django Setup - Full Backend Tutorial',
      url: 'https://www.youtube.com/watch?v=rHux0gMZ3Eg',
      tag: 'dev-web-backend',
      timeAgo: '4 hours ago',
      votes: 112,
      comments: 8,
      userVote: 0
    },
    {
      id: 7,
      title: 'Valid Parentheses - Stack - Leetcode 20',
      url: 'https://www.youtube.com/watch?v=WTzjTskDFMg',
      tag: 'dsa-stack',
      timeAgo: '6 hours ago',
      votes: 382,
      comments: 42,
      userVote: 0
    },
    {
      id: 8,
      title: 'React Navigation & Routing Complete Guide',
      url: 'https://www.youtube.com/watch?v=SMHOcgglW4c',
      tag: 'dev-web-frontend',
      timeAgo: '1 day ago',
      votes: 521,
      comments: 65,
      userVote: 0
    },
    {
      id: 9,
      title: 'Deep Learning Specialization - Andrew Ng',
      url: 'https://www.youtube.com/watch?v=CS4cs9xVecg',
      tag: 'dev-aiml-dl',
      timeAgo: '2 days ago',
      votes: 890,
      comments: 115,
      userVote: 0
    }
  ]);

  const handleUpvote = (id) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        if (res.userVote === 1) {
          return { ...res, votes: res.votes - 1, userVote: 0 };
        } else if (res.userVote === -1) {
          return { ...res, votes: res.votes + 2, userVote: 1 };
        } else {
          return { ...res, votes: res.votes + 1, userVote: 1 };
        }
      }
      return res;
    }));
  };

  const handleDownvote = (id) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        if (res.userVote === -1) {
          return { ...res, votes: res.votes + 1, userVote: 0 };
        } else if (res.userVote === 1) {
          return { ...res, votes: res.votes - 2, userVote: -1 };
        } else {
          return { ...res, votes: res.votes - 1, userVote: -1 };
        }
      }
      return res;
    }));
  };

  // Filter resources based on search query (search globally)
  const matchingResources = resources.filter(res =>
    searchQuery ? res.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        matchingResources={matchingResources}
      />
      <main>
        <div style={{ maxWidth: '1200px', margin: '0 auto 1rem', display: 'flex', justifyContent: 'flex-end', padding: '0 1rem' }}>
          <div className="glass-panel" style={{ display: 'flex', padding: '0.2rem', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
            <button
              className={`btn ${viewMode === 'list' ? 'text-accent' : ''}`}
              style={{ padding: '0.4rem 0.8rem', background: viewMode === 'list' ? 'var(--surface-hover)' : 'transparent', borderRadius: '4px' }}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              className={`btn ${viewMode === 'grid' ? 'text-accent' : ''}`}
              style={{ padding: '0.4rem 0.8rem', background: viewMode === 'grid' ? 'var(--surface-hover)' : 'transparent', borderRadius: '4px' }}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={
            <Home
              resources={matchingResources}
              filter={null}
              viewMode={viewMode}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          } />
          <Route path="/roadmap/:topic" element={
            <Roadmap
              resources={matchingResources}
              viewMode={viewMode}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
