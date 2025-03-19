import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import robotGif from "../assets/robot.gif"; // Ensure the GIF file is in the correct location
import Form from "./Form"; // Import the form component

const Chatbot = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Need to ask a question?",
    "No worries, I'm always here."
  ];

  // Cycle between messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="chatbot">
      <div className="chatbot-text">
        {messages[messageIndex]}
      </div>
      <img
        src={robotGif}
        alt="Chatbot Robot"
        className="chatbot-image"
        onClick={toggleForm}
      />
      {formVisible && (
        <div className="form-container">
          <Form onClose={toggleForm} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
