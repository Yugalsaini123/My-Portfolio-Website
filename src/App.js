// App.js
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "./components/Main";
import About from "./components/About";
import WorkPage from "./components/WorkPage";
import MySkills from "./components/MySkills";
import { darkTheme, lightTheme } from "./components/Themes";
import GlobalStyle from "./globalStyles";
import Contact from "./components/Contact";

function App() {
  const [themeDark, setThemeDark] = useState(true);
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
        <Routes location={location} key={location.pathname}>
          <Route
            exact
            path="/"
            element={
              <Main
                setThemeDark={setThemeDark}
                theme={themeDark ? "dark" : "light"}
              />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <About
                setThemeDark={setThemeDark}
                theme={themeDark ? "dark" : "light"}
              />
            }
          />
          <Route
            exact
            path="/work"
            element={
              <WorkPage
                setThemeDark={setThemeDark}
                theme={themeDark ? "dark" : "light"}
              />
            }
          />
          <Route
            exact
            path="/skills"
            element={
              <MySkills
                setThemeDark={setThemeDark}
                theme={themeDark ? "dark" : "light"}
              />
            }
          />
          <Route
            exact
            path="/contact"
            element={
              <Contact
                setThemeDark={setThemeDark}
                theme={themeDark ? "dark" : "light"}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
