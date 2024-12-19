// src/subComponents/SocialIcons.jsx
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Github } from "../assets/svg/github-brands.svg";
import { ReactComponent as Linkedin } from "../assets/svg/linkedin-circled.svg";
import { ReactComponent as Facebook } from "../assets/svg/black-instagram-transparent-logo.svg";
import { ReactComponent as Twitter } from "../assets/svg/x-social-media-black-icon.svg";

const Icons = styled.div`
  display: flex;
  flex-direction: row; /* Horizontal Layout */
  align-items: center;
  justify-content: center; /* Center-align horizontally */
  position: fixed;
  top: 1rem; /* Move to the top */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for centering */
  z-index: 4;

  a {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 1rem; /* Horizontal spacing between icons */
  }

  .socialIcon {
    width: 100%;
    height: 100%;
    color: ${(props) => (props.click ? props.theme.body : props.theme.text)};

    &:hover {
      transform: scale(1.1);
    }
  }

  .number {
    position: absolute;
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    top: 3rem; /* Position below the icons */
    border-radius: 5px;
    width: 9rem;
    height: 3rem;
    padding: 0 10px;
    display: ${(props) => (props.phone ? "flex" : "none")};
    align-items: center;
    justify-content: space-evenly;

    a {
      text-decoration: none;
      height: min-content;
      width: min-content;
      color: ${(props) => props.theme.text};
      background-color: ${(props) => props.theme.body};
      padding: 3px 10px;
      border-radius: 3px;
      margin: 0;
      display: none;
    }
  }

  @media (max-width: 768px) {
    top: 0.8rem; /* Adjust top position for smaller screens */
    a {
      width: 1.3rem;
      height: 1.3rem;
    }

    .socialIcon {
      color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
    }

    .number {
      width: 12rem;
      height: 3rem;
      top: 0.5rem;
      a {
        display: inline-block;
      }
    }
  }

  @media (max-width: 320px) {
    top: 0.5rem;
  }
`;

const Line = styled(motion.span)`
  width: 70rem; /* Adjust width for horizontal line */
  height: 2px; /* Horizontal line instead of vertical */
  background-color: ${(props) =>
    props.click ? props.theme.body : props.theme.text};
  margin-top: 1rem; /* Space below icons */

  @media (max-width: 768px) {
    width: 0rem;
    height: 2px;
    margin-top: 2rem;
    background-color: ${(props) => props.theme.text};
  }
`;


const SocialIcons = ({ click }) => {
  const [phone, setPhone] = useState(false);

  return (
    <Icons click={click} phone={phone}>
      <motion.a
        initial={{ transform: "scale(0)" }}
        animate={{ scale: [0, 1.5, 1, 1] }}
        transition={{ type: "spring", duration: 1.5, delay: 1.2 }}
        href="https://github.com/Yugalsaini123"
        target="_blank"
        rel="noreferrer"
      >
        <Github className="socialIcon" />
      </motion.a>
      <motion.a
        initial={{ transform: "scale(0)" }}
        animate={{ scale: [0, 1.5, 1, 1] }}
        transition={{ type: "spring", duration: 1.5, delay: 1.4 }}
        href="http://www.linkedin.com/in/yugal-saini"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin className="socialIcon" />
      </motion.a>
      <motion.a
        initial={{ transform: "scale(0)" }}
        animate={{ scale: [0, 1.5, 1, 1] }}
        transition={{ type: "spring", duration: 1.5, delay: 1.6 }}
        href="https://www.instagram.com/yugal114"
        target="_blank"
        rel="noreferrer"
      >
        <Facebook className="socialIcon" />
      </motion.a>
      <motion.a
        initial={{ transform: "scale(0)" }}
        animate={{ scale: [0, 1.5, 1, 1] }}
        transition={{ type: "spring", duration: 1.5, delay: 1.6 }}
        href="https://x.com/yugal114"
        target="_blank"
        rel="noreferrer"
      >
        <Twitter className="socialIcon" />
      </motion.a>

      <Line
        initial={{ y: 200 }}
        animate={{
          y: 0,
          transition: { type: "tween", duration: 0.75, delay: 0.5 },
        }}
        click={click}
      />
    </Icons>
  );
};

export default SocialIcons;