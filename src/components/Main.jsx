// src/components/Main.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LogoComponent from "../subComponents/LogoComponent";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";
import { motion } from "framer-motion";
import ResumePdf from "../assets/resume/Yugal Saini Resume.pdf";
import MyImage from "../assets/Images/Passport size pic.jpg";
import GlowingAnimation from "../subComponents/ParticleComponent";
import Intro from "./Intro";

// --- Keyframe Animations ---
const floatEffect = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const rotatePulse = keyframes`
  0% { transform:  scale(1); }
  50% { transform:  scale(1.09); }
  100% { transform: rotate(360deg) scale(1); }
`;


// --- Styled Components ---
const MainContainer = styled.div`
  background: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2, h3, h4, h5 {
    font-family: "Karla", sans-serif;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    height: ${`${window.innerHeight}px`};
  }
`;

const Center = styled.div`
  position: absolute;
  top: ${(props) => (props.click ? "85%" : "50%")};
  left: ${(props) => (props.click ? "92%" : "50%")};
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;

  img {
    width: ${(props) => (props.click ? "100px" : "180px")};
    height: ${(props) => (props.click ? "100px" : "180px")};
    animation: ${rotatePulse} 6s linear infinite;
    cursor: pointer;
    transition: all 1s ease;
  }

  span {
    animation: ${floatEffect} 3s ease-in-out infinite;
    color: ${(props) => props.theme.text};
    margin-top: 0.5rem;
    font-size: 20px;
  }
  @media (max-width: 768px) {
    top: ${(props) => (props.click ? "88%" : "50%")};
    left: ${(props) => (props.click ? "85%" : "50%")};
    img{
      width: ${(props) => (props.click ? "80px" : "160px")};
      height: ${(props) => (props.click ? "80px" : "160px")};
    }
    span {
      font-size: 17px;
    }
  }
`;

// Option Styling
const MenuOption = styled(motion(Link))`
  text-decoration: none;
  
  color: ${(props) => props.theme.text};
  font-size: 24px;
  font-weight: 600;
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease, opacity 0.3s ease;
  opacity: ${(props) => (props.click ? 0 : 1)};
  pointer-events: ${(props) => (props.click ? "none" : "auto")};

  &:hover {
    transform: scale(1.1) rotate(2deg);
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;


// Position the menu options
const Options = {
  Resume: styled(MenuOption)`
    bottom: 20%;
    right: 10%;
    animation: ${floatEffect}  5s ease-in-out infinite;

    @media (max-width: 768px) {
    bottom: 16%;
    font-size: 18px;
    padding-left:20px;
    animation: ${floatEffect} 5s ease-in-out infinite;
    }
  `,
  About: styled(MenuOption)`
    bottom: 20%;
    right: 25%;
    animation: ${floatEffect}  5s ease-in-out infinite;

    @media (max-width: 768px) {
    
    font-size: 18px;
    padding-left:20px;
    animation: ${floatEffect} 5s ease-in-out infinite;
    bottom: 1rem;
    right: 2rem;
    }
  `,
  Skills: styled(MenuOption)`
    bottom: 20%;
    left: 10%;
    animation: ${floatEffect}  5s ease-in-out infinite;

    @media (max-width: 768px) {
    bottom: 16%;
    font-size: 18px;
    padding-right:20px;
    padding-left:40px;
    animation: ${floatEffect} 5s ease-in-out infinite;
    }
  `,
  Work: styled(MenuOption)`
    bottom: 20%;
    left: 25%;
    animation: ${floatEffect}  5s ease-in-out infinite;

    @media (max-width: 768px) {
    font-size: 18px;
    animation: ${floatEffect} 5s ease-in-out infinite;
    bottom: 1rem;
    
    left: 2rem;
    }
  `,
  Contact: styled(MenuOption)`
    bottom: 20%;
    left: 45%;
    transform: translateX(50%);
    animation: ${floatEffect}  5s ease-in-out infinite;

    @media (max-width: 768px) {
    font-size: 18px;
    padding-right:30px;
    animation: ${floatEffect} 5s ease-in-out infinite;
    bottom: 1rem;
    
    left: 9.5rem;
    }
  `,
};

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  width: calc(100% - 4rem);
  display: flex;
  justify-content: center;
`;

const DarkDiv = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.text};
  top: 0;
  
  right: 50%;
  height: ${(props) => (props.click ? "100%" : "0")};
  width: ${(props) => (props.click ? "50%" : "0")};
  z-index: 1;
  transition: height 0.5s ease, width 1s ease 0.5s;

  @media (max-width: 768px) {
    right: 0%;
    height: ${(props) => (props.click ? "50%" : "0")};
    width: ${(props) => (props.click ? "100%" : "0")};
  }
`;

const Main = ({ setThemeDark, theme }) => {
  const [click, setClick] = useState(false);

  return (
    <MainContainer>
      <DarkDiv click={click} />
      <LogoComponent click={click} setThemeDark={setThemeDark} theme={theme} />
      <PowerButton />
      <GlowingAnimation theme={theme} page={"/"} />

      <Center click={click}>
        <img src={MyImage} alt="Rotating Profile" onClick={() => setClick(!click)} />
        <span>Tap Here </span>
      </Center>

      {/* Conditionally Render Menu Options */}
      {!click && (
        <>
          <Options.Resume
            as="a"
            href={ResumePdf}
            target="_blank"
            download
            whileHover={{ scale: 1.2 }}
          >
            Resume/CV
          </Options.Resume>

          <Options.About to="/about" whileHover={{ scale: 1.2 }}>
            Bio
          </Options.About>

          <Options.Skills to="/skills" whileHover={{ scale: 1.2 }}>
            Skills
          </Options.Skills>

          <Options.Work to="/work" whileHover={{ scale: 1.2 }}>
            Projects
          </Options.Work>

          <Options.Contact to="/contact" whileHover={{ scale: 1.2 }}>
            Drop a text📝
          </Options.Contact>
        </>
      )}

      <BottomBar>
        <SocialIcons click={click} />
      </BottomBar>

      {click && <Intro click={click} />}
    </MainContainer>
  );
};


export default Main;
