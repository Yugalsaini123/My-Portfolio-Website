// src/subComponents/BigTitle.jsx
import React from "react";
import styled from "styled-components";

const Text = styled.h1`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.1)`};
  font-size: calc(5rem + 5vw);
  z-index: 1;
`;

const BigTitle = ({ top, left, text }) => {
  return (
    <Text top={top} left={left}>
      {text}
    </Text>
  );
};

export default BigTitle;
