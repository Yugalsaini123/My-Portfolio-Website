// src/components/Intro.jsx
import React from "react";
import styled from "styled-components";
import Me from "../assets/Images/MyAnimePiccp.png";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  position: absolute;
  width: 65vw;
  height: 55vh;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    to right,
    ${(props) => props.theme.body} 50%,
    ${(props) => props.theme.text} 50%
  ) bottom, linear-gradient(
    to right,
    ${(props) => props.theme.body} 50%,
    ${(props) => props.theme.text} 50%
  ) top;
  border-left: solid 2px ${(props) => props.theme.body};
  border-right: solid 2px ${(props) => props.theme.text};
  background-repeat: no-repeat;
  background-size: 100% 2px;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    background: none;
    
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.body} 50%,
      ${(props) => props.theme.text} 50%
    ) left, linear-gradient(
      to bottom,
      ${(props) => props.theme.body} 50%,
      ${(props) => props.theme.text} 50%
    ) right;
    
    border-left: none;
    border-right: none;
    border-top: solid 2px ${(props) => props.theme.body};
    border-bottom: solid 2px ${(props) => props.theme.text};
    
    background-repeat: no-repeat;
    background-size: 2px 100%;
    
    z-index: 1;
    overflow: hidden;
  }
`;

const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    position: relative;
    
    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

   @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      padding-bottom:3rem;
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      transform: translateY(10%);
    }
  }
`;

const Text = styled(motion.div)`
  font-size: calc(1rem + 1.5vw);
  color: ${(props) => props.theme.body};
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > *:last-child {
    color: ${(props) => `rgba(${props.theme.bodyRgba},0.6)`};
    font-size: calc(0.5rem + 1.1vw);
    font-weight: 300;
  }

  h2 {
    font-weight: 800;
    font-size: 60px;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 1rem;
    width: 100%;

    h1 {
      font-size: calc(1.5rem + 2vw);
    }

    h2 {
      font-size: calc(1.2rem + 2vw);
      font-weight: 700;
    }

    h3 {
      font-size: calc(1rem + 1.5vw);
    }

    h6 {
      font-size: calc(0.7rem + 1vw);
      color: ${(props) => `rgba(${props.theme.bodyRgba},0.7)`};
    }
  }
`;

const Intro = () => {
  // Box animation
  const boxVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: "55vh", 
      opacity: 1,
      transition: { 
        type: "spring", 
        duration: 2, 
        delay: 0.5 
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };


  return (
    <Box 
      variants={boxVariants}
      initial="initial"
      animate="animate"
    >
      <SubBox>
        <Text
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>Hi,</motion.h1>
          <motion.h3 variants={itemVariants}>I'm Yugal Saini..</motion.h3>
          <motion.h6 variants={itemVariants}>
            A Cloud enthusiast, Programmer and Full-stack Developer.
          </motion.h6>
        </Text>
      </SubBox>
      <SubBox>
        <ImageWrapper
          // variants={imageVariants}
          animate="animate"
        >
          <img src={Me} alt="Yugal Saini" />
        </ImageWrapper>
      </SubBox>
    </Box>
  );
};

export default Intro;