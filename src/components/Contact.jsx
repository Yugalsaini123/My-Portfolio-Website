// src/components/Contact.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BigTitle from "../subComponents/BigTitle";
import LogoComponent from "../subComponents/LogoComponent";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";

const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Main = styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: rgba(255, 255, 255, 0.1);
  width: 30vw;
  height: fit-content;
  padding: 3rem;
  line-height: 1.5;
  font-family: "Ubuntu Mono", monospace;
  z-index: 3;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 50vw;
  }
  @media (max-width: 425px) {
    width: 55vw;
  }
`;

const Form = styled.form`
  position: relative;
  p {
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  position: relative;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 20px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: ${(props) => props.theme.text};
  }
`;

const InputBox = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  display: flex;
  input,
  textarea {
    background: ${(props) => `rgba(${props.theme.textRgba}, 0.2)`};
    width: 100%;
    margin: auto;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 35px;
    color: ${(props) => props.theme.text};
    box-shadow: 0 2px 2px ${(props) => `rgba(${props.theme.textRgba}, 0.2)`};
  }
  input[type="submit"] {
    background-color: transparent;
    border: 2px solid ${(props) => `rgba(${props.theme.textRgba}, 0.8)`};
  }
`;

const Contact = ({ setThemeDark, theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("Not Submitted");

  const validate = (formData) => {
    let formErrors = {};
    if (!formData.name) {
      formErrors.name = "Name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    }
    if (!formData.msg) {
      formErrors.msg = "Message is required";
    }
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setErrors(validate(formData));
    setIsSubmitted(true);
    e.preventDefault();
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      setSubmitStatus("Submitted");
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-form", ...formData }),
      })
        .then((res) => {
          if (res.ok) setSubmitStatus("Successful");
          else setSubmitStatus("Failed");
        })
        .then(() => setIsSubmitted(false))
        .then(() => setFormData({ name: "", email: "", msg: "" }))
        .catch((error) => alert(error));
    }
  }, [errors, formData, isSubmitted]);

  return (
    <Box>
      <LogoComponent theme={theme} setThemeDark={setThemeDark} />
      <PowerButton />
      <Main>
        <Form
          onSubmit={handleSubmit}
          name="contact-form"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact-form" />
          {submitStatus === "Not Submitted" && (
            <>
              <Title>Drop Me a Message</Title>
              <p>Email: yugalsaini2002@gmail.com</p>
              <InputBox>
                <input
                  type="text"
                  placeholder={errors.name ? errors.name : "Name"}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </InputBox>
              <InputBox>
                <input
                  type="email"
                  placeholder={errors.email ? errors.email : "E-mail"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputBox>
              <InputBox>
                <textarea
                  placeholder={errors.msg ? errors.msg : "Message"}
                  name="msg"
                  value={formData.msg}
                  onChange={handleChange}
                />
              </InputBox>
              <InputBox>
                <input type="submit" value="Submit" />
              </InputBox>
            </>
          )}
          {submitStatus === "Successful" && (
            <>
              <p style={{ textAlign: "center" }}>
                Your Message has been received.
              </p>
              <p
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setSubmitStatus("Not Submitted")}
              >
                Send Another
              </p>
            </>
          )}
          {submitStatus === "Failed" && (
            <>
              <p style={{ textAlign: "center" }}>Submission Failed. </p>
              <p
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setSubmitStatus("Not Submitted")}
              >
                Try Again
              </p>
            </>
          )}
          {submitStatus === "Submitted" && (
            <p style={{ textAlign: "center" }}>Processing...</p>
          )}
        </Form>
      </Main>
      <SocialIcons />
      <BigTitle top="1%" left="20%" text="CONTACT" />
    </Box>
  );
};

export default Contact;
