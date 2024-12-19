// src/subComponents/LogoComponent.jsx
import React from "react";
import styled from "styled-components";
import { ReactComponent as Moon } from "../assets/svg/moon-svgrepo-com.svg";
import { ReactComponent as Sun } from "../assets/svg/sun-svgrepo-com.svg";

const Logo = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  font-family: "Verdana", cursive;
  position: fixed;
  right: 2.5rem;
  top: 1rem;
  z-index: 3;
  transition: all 0.5s ease;
  color: ${(props) => props.theme.text};

  h1 {
    font-weight: 500;
    padding-right: 2.5rem;
    font-size: clamp(1.2rem, 4vw, 2.2rem); /* Scalable font size */
    transition: font-size 0.3s ease;
    
  }

  .themeIcon {
    position: absolute;
    left: 60%;
    bottom: 50%;
    transform: translate(30%, 50%);
    height: clamp(50%, 85%, 95%);
    width: auto;
    transition: height 0.3s ease, transform 0.3s ease;
  }

  /* Responsive Styling */
  @media (max-width: 1024px) {
    right: 2rem;
    top: 1.5rem;

    h1 {
      font-size: clamp(1.1rem, 3vw, 1.8rem);
      padding-right: 1.5rem;
    }

    .themeIcon {
      left: 70%;
      transform: translate(40%, 50%);
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 9%;
    display: flex;
    align-items: center;
    color: ${(props) => (props.click ? props.theme.body : props.theme.text)};

    h1 {
      font-size: 20px;
      padding-right:2px;
    }

    .themeIcon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  @media (max-width: 600px) {
    top: 1rem;
    right: 9%;
    display: flex;
    align-items: center;

    h1 {
      font-size: 20px;
      padding-right:2px;
    }

    .themeIcon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  @media (max-width: 500px) {
    top: 1rem;
    right: 9%;
    display: flex;
    align-items: center;

    h1 {
      font-size: 20px;
      padding-right:2px;
    }

    .themeIcon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;


const LogoComponent = ({ click, setThemeDark, theme }) => {
  const changeTheme = () => {
    setThemeDark((prev) => !prev);
  };

  return (
    <Logo onClick={changeTheme} click={click}>
      <h1>YS</h1>
      {theme === "dark" ? (
        <Sun className="themeIcon" />
      ) : (
        <Moon className="themeIcon" />
      )}
    </Logo>
  );
};

export default LogoComponent;

