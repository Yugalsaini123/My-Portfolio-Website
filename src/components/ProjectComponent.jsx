// src/components/ProjectComponent.jsx
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Box = styled(motion.a)`
  width: calc(8rem + 15vw);
  text-decoration: none;
  border: solid 2px ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  height: 18rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.4s ease;

  img {
    width: 100%;
    height: 60%;
    object-fit: cover;
    border: 2px solid transparent;
  }

  h3 {
    color: inherit;
    font-family: "Karla", sans-serif;
    font-weight: 700;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.text};
  }

  p {
    color: ${(props) => `rgba(${props.theme.textRgba}, 0.8)`};
  }

  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};

    img {
      border-color: ${(props) => props.theme.body};
    }

    h3 {
      border-color: ${(props) => props.theme.body};
    }

    p {
      color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.8)`};
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 17px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const ProjectComponent = ({ project }) => {
  return (
    <Box
      target="_blank"
      href={project.link}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={project.imgSrc} alt={`${project.name} Thumbnail`} />
      <h3>{project.name}</h3>
      <p>{project.desc}</p>
    </Box>
  );
};

export default ProjectComponent;

