import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SkillBridge</Link>
      </div>

      <div className="navbar-links">
        <button onClick={() => scrollToSection('features')}>Features</button>
        <button onClick={() => scrollToSection('how-it-works')}>How It Works</button>
        <button onClick={() => scrollToSection('reviewers')}>Reviewers</button>
        <Link to="/login" className="signin">Sign In</Link>
        <Link to="/register" className="get-started">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
