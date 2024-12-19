import React from "react";
import styled, { keyframes } from "styled-components";
import KunaiImg from "../assets/svg/rb_101911.png";
import BigTitle from "../subComponents/BigTitle";
import LogoComponent from "../subComponents/LogoComponent";
import GlowingAnimation from "../subComponents/ParticleComponent1";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 20px;
    height: auto;
    min-height: 100vh;
  }
`;

const float = keyframes`
  0% { transform: translateY(-10px) }       
  50% { transform: translateY(55px) translateX(-10px) }
  100% { transform: translateY(-10px) }
`;

const Kunai = styled.div`
  position: absolute;
  top: 40%;
  right: -5%;
  width: 45rem;
  animation: ${float} 4s infinite ease;
  @media (max-width: 900px) {
    top: 20%;
    right: -25%;
  }
  @media (max-width: 768px) {
    top: 10%;
    right: -30%;
    width: 35rem;
  }
  @media (max-width: 500px) {
    width: 25rem;
    top: 20%;
    right: -35%;
  }
  img {
    width: 100%;
    height: auto;
    transform: rotate(-5deg) rotate3d(2, 5, 0, 45deg);
  }
`;

const Main = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);
  position: absolute;
  left: calc(5rem + 5vw);
  top: 15%;
  font-family: "Ubuntu Mono", monospace;
  font-style: italic;
  text-align: justify;

  @media (max-width: 768px) {
    position: relative;
    width: 80vw;
    height: auto;
    left: 0;
    top: 0;
    margin: 2rem auto;
    padding: 1.5rem;
    font-size: calc(0.8rem + 1vw);
  }
  @media (max-width: 425px) {
    width: 85vw;
    margin: 1rem auto;
    padding: 1rem;
  }
`;

const About = ({ setThemeDark, theme }) => {
  return (
    <Box>
      <LogoComponent theme={theme} setThemeDark={setThemeDark} />
      <PowerButton />
      <GlowingAnimation theme={theme} page={"about"} />
      <Kunai>
        <img src={KunaiImg} alt="" />
      </Kunai>
      <Main>
        <p>
          I am a Java Programmer and Full-Stack MERN developer passionate about creating seamless and visually appealing web applications. With a strong foundation and hands-on experience in deploying scalable solutions on AWS Cloud, I focus on building user-centric projects.
        </p>
        <p>
          I'm deeply interested in Software Development and enjoy exploring new tools and technologies to expand my skill set. Beyond coding, I enjoy to play Sports and constantly challenging myself to learn and grow.
        </p>
        <p>
          Let's connect to collaborate or discuss innovative ideas—you can reach me via email or through my social links.
        </p>
      </Main>
      <BigTitle top="75%" left="55%" text="ABOUT" />
      <SocialIcons />
    </Box>
  );
};

export default About;