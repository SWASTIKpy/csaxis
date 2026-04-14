import React from 'react';
import { Hexagon, } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container glass-panel" style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 1.5rem', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} CS Axis. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          For submissions: <a href="mailto:csaxis7@gmail.com" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>csaxis7@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
