import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

function Home() {
  return (
    <section className="home-section" id="home">
      <div className="container home-content">
        <p className="intro-text">Hello, my name is</p>
        <h1 className="hero-name">Your Name Here.</h1>
        <h2 className="hero-tagline">I build amazing web experiences.</h2>
        <p className="hero-description">
          I'm a passionate full-stack developer specializing in creating
          beautifully designed, highly functional, and user-friendly web applications.
        </p>
        <div className="home-buttons">
          <Link to="/projects" className="btn btn-primary">View My Work</Link>
          <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
        </div>
      </div>
      <div className="scroll-down-indicator">
        <Link to="/about" aria-label="Scroll to About Section">
          <FontAwesomeIcon icon={faChevronDown} size="2x" />
        </Link>
      </div>
    </section>
  );
}

export default Home;
