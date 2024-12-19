// src/subComponents/ExperienceCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Box = styled(motion.div)`
  width: 26rem;
  min-height: 20vh;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  padding: 1.5rem 2rem;
  margin: 1rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }

  h3 {
    font-size: calc(1rem + 0.3vw);
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: calc(0.8rem + 0.3vw);
    color: ${(props) => props.theme.body};
    opacity: 0.9;
    margin-bottom: 0.5rem;
  }

  .duration {
    font-size: calc(0.7rem + 0.3vw);
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    
    li {
      font-size: calc(0.8rem + 0.3vw);
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }
  }

  @media (max-width: 768px) {
    width: 80vw;
    margin: 1rem 0;
  }
`;

const ExperienceCard = ({ experience }) => {
  return (
    <Box
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>{experience.company}</h3>
      <h4>{experience.position}</h4>
      <p className="duration">{experience.location} | {experience.duration}</p>
      <ul>
        {experience.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
    </Box>
  );
};

export default ExperienceCard;