import React from 'react';
import './About.css';
import profilePic from '../assets/profile.jpg'; // Make sure to add an image here
import { portfolioData } from '../data/portfolioData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function About() {
  return (
    <section className="about-section container" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-image-container">
          <img src={profilePic} alt="Your Name" className="profile-pic" />
        </div>
        <div className="about-text">
          <p className="intro-paragraph">
            Hello! I'm <strong>{portfolioData.name}</strong>, a passionate and creative {portfolioData.title}. 
            With a solid foundation in both front-end and back-end development, I thrive on building
            innovative and user-centric web applications. My journey in tech started with a fascination
            for how things work on the internet, leading me to master a diverse set of technologies.
          </p>
          <p className="detailed-paragraph">
            I love turning complex problems into simple, beautiful, and intuitive designs.
            Whether it's crafting responsive user interfaces or optimizing server-side performance,
            I'm dedicated to delivering high-quality solutions. When I'm not coding, you can find me
            {portfolioData.hobbies.join(', ')}. I'm always eager to learn new things and collaborate
            on exciting projects.
          </p>
        </div>
      </div>

      <h3 className="sub-title">My Skills</h3>
      <div className="skills-grid">
        {portfolioData.skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <FontAwesomeIcon icon={skill.icon} className="skill-icon" />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>

      <h3 className="sub-title">My Experience</h3>
      <div className="experience-timeline">
        {portfolioData.experience.map((job, index) => (
          <div className="experience-item" key={index}>
            <div className="experience-header">
              <h4>{job.title}</h4>
              <span>{job.duration}</span>
            </div>
            <h5>{job.company}</h5>
            <ul>
              {job.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
