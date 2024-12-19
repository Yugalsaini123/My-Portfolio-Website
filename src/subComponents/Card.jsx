// src/subComponents/Card.jsx
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Github } from "../assets/svg/github-brands.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link-solid.svg";

const Box = styled(motion.li)`
  width: 26rem;
  height: auto; // Changed from fixed height to auto
  min-height: 42vh; // Added min-height instead of fixed height
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  padding: 1.5rem 2rem;
  margin-right: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // Changed from space-between to flex-start
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  // Rest of the hover and before pseudo-element styles remain the same
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg, 
      transparent, 
      rgba(255,255,255,0.1), 
      transparent
    );
    transform: rotate(-45deg);
    opacity: 0;
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);

    &::before {
      opacity: 1;
    }

    .tech h3:after {
      width: 100%;
    }
  }

  h2 {
    font-size: calc(1rem + 0.5vw);
    margin-bottom: 1rem; // Added margin bottom
    position: relative;
    z-index: 2;
  }

  .desc {
    font-size: calc(0.8rem + 0.3vw);
    font-family: "Karla", sans-serif;
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 1.5rem; // Increased margin bottom
    position: relative;
    z-index: 2;
  }

  .tech {
    margin-bottom: 1.5rem; // Added margin bottom
    h3 {
      position: relative;
      margin-bottom: 15px; // Increased margin
      width: 100%;
      font-size: calc(0.9rem + 0.3vw);
      z-index: 2;
    }

    h3:after {
      position: absolute;
      content: "";
      bottom: -5px;
      left: 0;
      height: 2px;
      width: 50%;
      background-color: ${(props) => props.theme.body};
      transition: width 0.3s ease;
    }
  }

  .tags {
    font-size: calc(0.7rem + 0.3vw);
    font-family: "Karla", sans-serif;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem; // Added margin bottom
    z-index: 2;
    position: relative;
  }

  .tags span {
    margin-right: 0.5rem;
    margin-bottom: 0.3rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 18rem;
    padding: 1.25rem 1.5rem; // Reduced padding
    margin-right: 5rem;
    min-height: 42vh; // Slightly reduced min-height for mobile

    h2 {
      font-size: calc(0.9rem + 0.5vw); // Slightly smaller font
    }

    .desc {
      font-size: calc(0.75rem + 0.3vw);
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto; // Changed from fixed margin to auto
  padding-top: 1rem; // Added padding top
  position: relative;
  z-index: 2;

  .link, .github {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 50%;
    padding: 0.5rem;
  }

  .link {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-size: calc(0.8rem + 0.3vw);
    
    svg {
      margin-left: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  }

  .github {
    color: ${(props) => props.theme.body};
    
    svg {
      width: calc(1.5rem + 0.5vw);
      height: calc(1.5rem + 0.5vw);
    }

    &:hover {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding-top: 0.75rem; // Reduced padding for mobile
    
    .link {
      font-size: calc(0.75rem + 0.3vw); // Slightly smaller font
    }
  }
`;
const item = {
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hidden: { 
    opacity: 0, 
    x: -100 
  },
};

const Card = ({ work }) => {
  const { name, description, tags, demo, github } = work;
  return (
    <Box variants={item} whileHover={{ scale: 1.05 }}>
      <div>
        <h2>{name}</h2>
        <p className="desc">{description}</p>
        <div className="tech">
          <h3>Tech Stack</h3>
          <div className="tags">
            {tags.map((tag, id) => (
              <span key={id}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer>
        <a href={demo} className="link" target="_blank" rel="noreferrer">
          Visit
          <LinkIcon />
        </a>
        <a href={github} className="github" target="_blank" rel="noreferrer">
          <Github />
        </a>
      </Footer>
    </Box>
  );
};

export default Card;