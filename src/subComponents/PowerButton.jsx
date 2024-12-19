// src/subComponents/PowerButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PowerBtn } from "../assets/svg/home-189.svg";
const Power = styled.div`
  position: fixed;
  top: 1rem;
  left: 2%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.body};
  padding: 0.5rem; /* Padding to ensure proper spacing */
  border-radius: 50%;
  width: 1.2rem; /* Explicit width */
  height: 1.2rem; /* Explicit height */
  cursor: pointer;
  z-index: 3;
  display: flex; /* Align SVG inside the button */
  align-items: center;
  justify-content: center;

  .powerBtn {
    width: 1.5rem; /* Control SVG size */
    height: 1.5rem;
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 768px) {
    left:1.5rem;
  }

  &:hover {
    box-shadow: 0 0 15px ${(props) => `rgba(${props.theme.textRgba}, 0.7)`};
  }
`;


const PowerButton = () => {
  return (
    <Power>
      <Link to={"/"}>
        <PowerBtn className="powerBtn" />
      </Link>
    </Power>
  );
};

export default PowerButton;

