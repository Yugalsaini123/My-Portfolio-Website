import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Subcomponents
import LogoComponent from "../subComponents/LogoComponent";
import PortfolioBackground from "../subComponents/ParticleforWork";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";
import BigTitle from "../subComponents/BigTitle";
import Card from "../subComponents/Card";
import ExperienceCard from "../subComponents/ExperienceCard";

// Data
import { Work } from "../data/WorkData";
import { ExperienceData } from "../data/ExperienceData";

const swipeAnimation = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0.3;
  }
  50% {
    transform: translateX(-20px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.3;
  }
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding-top: 7rem;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  position: fixed;
  top: 7rem;
  z-index: 10;
  background: transparent;
  padding: 0;
  width: 100%;
  box-shadow: none;
  border: none;
`;

const Tab = styled.button`
  padding: 0.8rem 2rem;
  margin: 0 1rem;
  border: 2px solid ${props => props.theme.text};
  border-radius: 20px;
  background: ${props => props.active ? props.theme.text : 'transparent'};
  color: ${props => props.active ? props.theme.body : props.theme.text};
  font-size: calc(0.8rem + 0.3vw);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Karla', sans-serif;

  &:hover {
    background: ${props => props.theme.text};
    color: ${props => props.theme.body};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    margin: 0 0.5rem;
    font-size: calc(0.7rem + 0.3vw);
  }
`;

const ProjectsContainer = styled(motion.ul)`
  position: relative;
  margin-top: 12rem;
  padding: 2rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: calc(100vw - 4rem);
  max-width: 1400px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.text};
    border-radius: 10px;
  }

  &::after {
    content: "⪻ Swipe Left";
    position: fixed;
    bottom:   20px;
    left: 45%;
    font-weight: 600;
    color: ${props => props.theme.text};
    animation: ${swipeAnimation} 2.5s infinite ease;
    display: none;
  }

  @media (max-width: 1000px) {
    &::after {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    margin-top: 10rem;
    padding: 1rem;
    width: calc(100vw - 2rem);
  }
`;

const ExperienceSection = styled(motion.div)`
  margin-top: 12rem;
  width: 90vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10rem;
    width: 95vw;
  }
`;

const ExperienceTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  width: 100%;
`;

const ExperienceGrid = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5
    }
  }
};

const WorkPage = ({ setThemeDark, theme }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [activeExpType, setActiveExpType] = useState('internships');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleWheel = (e) => {
      if (scrollContainer && activeTab === 'projects') {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY > 0 ? 55 : -55;
      }
    };

    const currentScrollContainer = scrollContainerRef.current;
    if (currentScrollContainer) {
      currentScrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentScrollContainer) {
        currentScrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeTab]);

  return (
    <Box>
      <LogoComponent theme={theme} setThemeDark={setThemeDark} />
      <PowerButton />
      <PortfolioBackground theme={theme} page="work"/>
      <MainContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </Tab>
          <Tab 
            active={activeTab === 'experience'} 
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </Tab>
        </TabContainer>

        {activeTab === 'projects' ? (
          <ProjectsContainer
            ref={scrollContainerRef}
            initial="hidden"
            animate="show"
            variants={container}
          >
            {Work.map((work) => (
              <motion.div key={work.id} whileHover={{ scale: 0.95 }}>
                <Card work={work} />
              </motion.div>
            ))}
          </ProjectsContainer>
        ) : (
          <ExperienceSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ExperienceTypeContainer>
              <Tab 
                active={activeExpType === 'internships'} 
                onClick={() => setActiveExpType('internships')}
              >
                Internships
              </Tab>
              <Tab 
                active={activeExpType === 'training'} 
                onClick={() => setActiveExpType('training')}
              >
                Training
              </Tab>
            </ExperienceTypeContainer>
            <ExperienceGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {ExperienceData[activeExpType].map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </ExperienceGrid>
          </ExperienceSection>
        )}
      </MainContainer>

      <BigTitle 
        text={activeTab.toUpperCase()} 
        top="10%" 
        left="65%" 
      />
      <SocialIcons />
    </Box>
  );
};

export default WorkPage;