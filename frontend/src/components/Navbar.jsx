import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Code, BrainCircuit, Blocks, Hexagon, Moon, Sun, Search, LogIn, ExternalLink } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery, matchingResources = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    {
      title: 'DSA',
      icon: <Blocks size={18} />,
      value: 'dsa-all',
    },
    {
      title: 'DEV',
      icon: <Code size={18} />,
      groups: [
        {
          heading: 'Web Dev',
          links: [
            { label: 'Frontend', value: 'dev-web-frontend' },
            { label: 'Backend', value: 'dev-web-backend' },
          ],
        },
        {
          heading: 'AIML',
          links: [
            { label: 'ML', value: 'dev-aiml-ml' },
            { label: 'GenAI', value: 'dev-aiml-genai' },
            { label: 'DL', value: 'dev-aiml-dl' },
            { label: 'RL', value: 'dev-aiml-rl' },
          ],
        },
        {
          heading: 'Basics',
          links: [
            { label: 'CS50', value: 'dev-basics-cs50' },
            { label: 'One shots ', value: 'dev-basics-python' },
          ],
        },
      ],
    },
    {
      title: 'GATE',
      icon: <BrainCircuit size={18} />,
      value: 'gate-general',
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar-container glass-panel">
      <div className="navbar max-w-7xl">
        <div className="navbar-brand" onClick={() => handleNavigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Hexagon size={24} className="brand-accent" />
          <span><span className="brand-accent">CS</span> Axis</span>
        </div>

        {/* Search Bar */}
        <div className="search-container" style={{ position: 'relative' }}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && matchingResources.length > 0 && (
            <div className="search-dropdown glass-panel">
              {matchingResources.slice(0, 5).map(res => (
                <div 
                  key={res.id} 
                  className="search-result-item"
                  onClick={() => {
                    setSearchQuery('');
                    window.open(res.url, '_blank');
                  }}
                >
                  <span className="search-result-title">{res.title}</span>
                  <span className="search-result-tag text-accent">{res.tag}</span>
                </div>
              ))}
            </div>
          )}
          {searchQuery && matchingResources.length === 0 && (
            <div className="search-dropdown glass-panel" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No resources found
            </div>
          )}
        </div>

        <div className="navbar-links">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="nav-item-wrapper"
              onMouseEnter={() => !item.value && setActiveDropdown(index)}
              onMouseLeave={() => !item.value && setActiveDropdown(null)}
            >
              <button 
                className="btn nav-item"
                onClick={() => item.value ? handleNavigate(`/roadmap/${item.value}`) : null}
              >
                {item.icon}
                <span>{item.title}</span>
                {!item.value && <ChevronDown size={14} className={`dropdown-icon ${activeDropdown === index ? 'rotate' : ''}`} />}
              </button>

              {activeDropdown === index && !item.value && (
                <div className="dropdown glass-panel">
                  {item.links && (
                    <ul className="dropdown-list">
                      {item.links.map((link, lIndex) => (
                        <li key={lIndex} onClick={() => handleNavigate(`/roadmap/${link.value}`)}>{link.label}</li>
                      ))}
                    </ul>
                  )}
                  {item.groups && (
                    <div className="dropdown-groups">
                      {item.groups.map((group, gIndex) => (
                        <div key={gIndex} className="dropdown-group">
                          <h4 className="group-heading text-accent">{group.heading}</h4>
                          <ul className="dropdown-list">
                            {group.links.map((link, lIndex) => (
                              <li key={lIndex} onClick={() => handleNavigate(`/roadmap/${link.value}`)}>{link.label}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button className="btn nav-item" onClick={() => window.open('https://roadmap.sh', '_blank')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
            <ExternalLink size={16} />
            <span>roadmap.sh</span>
          </button>
          <div style={{ width: '1px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
          <button className="btn" onClick={() => handleNavigate('/login')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: '#0d1117', padding: '0.4rem 1.2rem', borderRadius: '8px', fontWeight: '600' }}>
            <LogIn size={16} />
            <span>Login</span>
          </button>
          <button className="btn nav-item" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
