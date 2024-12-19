// src/components/MySkills.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Frontend } from "../assets/svg/coding-svgrepo-com.svg";
import { ReactComponent as Backend } from "../assets/svg/css-svgrepo-com.svg";
import BigTitle from "../subComponents/BigTitle";
import LogoComponent from "../subComponents/LogoComponent";
import ParticleBackground from "../subComponents/ParticleBackground";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";

const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 150px;
    
  }
`;

const Main = styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: 2rem;
  width: 30vw;
  height: 60vh;
  line-height: 1.5;
  font-family: "Ubuntu Mono", monospace;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg, 
      transparent, 
      rgba(255,255,255,0.2), 
      transparent
    );
    transition: all 0.6s;
  }

  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);

    &::before {
      left: 100%;
    }

    .skillIcon {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 50vw;
    height: 40vh;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: calc(0.8rem + 1vw);
  margin-bottom: 30px;

  .skillIcon {
    width: 40px;
    height: 40px;
    transition: all 0.6s ease;
  }

  h2 {
    margin-left: 20px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: calc(0.7rem + 1vw);
    margin-bottom: 20px;

    .skillIcon {
      width: 30px;
      height: 30px;
    }

    h2 {
      margin-left: 10px;
    }
  }
`;

const Description = styled.div`
  font-size: calc(0.5rem + 0.8vw);
  text-align: justify;
  margin: 10px 0;
  position: relative;
  z-index: 2;

  strong {
    text-transform: uppercase;
    display: block;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: currentColor;
      transition: width 0.3s ease;
    }
  }

  p {
    margin-left: 2rem;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.body};
      
      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: currentColor;
      transition: width 0.3s ease;
    }
  }

  @media (max-width: 768px) {
    font-size: calc(0.6rem + 0.7vw);
    margin: 5px 0;

    strong {
      margin-bottom: 0.8rem;

      &::after {
        width: 40px; /* Adjusted underline width for smaller screens */
      }
    }

    p {
      margin-left: 1rem; /* Reduced indentation */
    }
  }
`;


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10 
    } 
  },
};

const MySkills = ({ setThemeDark, theme }) => {
  // const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <LogoComponent theme={theme} setThemeDark={setThemeDark} />
      <PowerButton />
      <ParticleBackground theme={theme} page={"skills"}/>
      
      {[
        {
          icon: <Frontend className="skillIcon" />,
          title: "Coding Profile",
          descriptions: [
            "I love coding and keeping my work clean, minimal, and simple. I solved many problems on various platforms.",
            {
              title: "Coding Platforms",
              links: [
                { name: "Leetcode", url: "https://leetcode.com/u/Yugalsaini/" },
                { name: "Hackerrank", url: "https://www.hackerrank.com/profile/yugalsaini2002" },
                { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/user/yugalsai381w/" },
                { name: "Coding Ninjas", url: "https://www.naukri.com/code360/profile/1f362bda-ac1c-4b32-bb7f-16763ee980de" }
              ]
            },
            {
              title: "Languages",
              content: "Java,Python,C"
            }
          ]
        },
        {
          icon: <Backend className="skillIcon" />,
          title: "Full-Stack & Cloud",
          descriptions: [
            "I'm passionate about AWS Cloud with MERN Stack Development.",
            {
              title: "Skills",
              content: "AWS:EC2,S3,Lambda,DynamoDB,Rekognition React.js,TailwindCSS,Node.js, Express,MongoDB."
            },
            {
              title: "Tools",
              content: " VS Code, npm, Linux, Git, GitHub, etc."
            }
          ]
        }
      ].map((card, index) => (
        <Main 
          key={index}
          variants={itemVariants}
          // onHoverStart={() => setHoveredCard(index)}
          // onHoverEnd={() => setHoveredCard(null)}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <Title>
            {card.icon}
            <h2>{card.title}</h2>
          </Title>
          {card.descriptions.map((desc, descIndex) => (
            <Description key={descIndex}>
              {typeof desc === 'string' ? (
                desc
              ) : (
                <>
                  <strong>{desc.title}</strong>
                  {desc.links ? (
                    <p>
                      {desc.links.map((link, linkIndex) => (
                        <React.Fragment key={linkIndex}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.name}
                          </a>
                          {linkIndex < desc.links.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                    </p>
                  ) : (
                    <p>{desc.content}</p>
                  )}
                </>
              )}
            </Description>
          ))}
        </Main>
      ))}
      
      <SocialIcons />
      <BigTitle top="1%" left="20%" text="SKILLS" />
    </Box>
  );
};

export default MySkills;