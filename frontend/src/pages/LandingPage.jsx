// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/LandingPage.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const reviewers = [
    {
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      experience: "8+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Microsoft",
      experience: "6+ years",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      name: "Emily Johnson",
      title: "UX Designer",
      company: "Apple",
      experience: "7+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    {
      name: "David Park",
      title: "Data Scientist",
      company: "Netflix",
      experience: "5+ years",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    }
  ];

  return (
    <div className="landing">
      <Navbar />

      <header className="hero" id="home">
        <h1>Build Resumes That <span className="highlight">Get Noticed</span></h1>
        <p>Connect with certified professionals who provide expert feedback to help you land interviews.</p>
        <div className="hero-buttons">
          <Link to="/register" className="primary-btn">Get Started</Link>
          <Link to="/login" className="secondary-btn">Sign In</Link>
        </div>
      </header>

      <section className="features" id="features">
        <div className="feature">
          <h3>Smart Builder</h3>
          <p>Create resumes with ease and keep track of changes.</p>
        </div>
        <div className="feature">
          <h3>Expert Reviews</h3>
          <p>Get feedback from certified professionals.</p>
        </div>
        <div className="feature">
          <h3>Fast Turnaround</h3>
          <p>Receive responses within 24 hours.</p>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <h4>Build Your Resume</h4>
            <p>Use our form to easily create your resume.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h4>Submit for Review</h4>
            <p>Send it to certified reviewers for feedback.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h4>Improve & Apply</h4>
            <p>Use the suggestions to improve and apply confidently.</p>
          </div>
        </div>
      </section>

      <section className="reviewers" id="reviewers">
        <h2>Top Certified Reviewers</h2>
        <div className="reviewer-cards">
          {reviewers.map((r, idx) => (
            <div key={idx} className="reviewer-card">
              <img src={r.image} alt={r.name} />
              <h4>{r.name}</h4>
              <p>{r.title} at {r.company}</p>
              <span>{r.experience} | ⭐ {r.rating}</span>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
