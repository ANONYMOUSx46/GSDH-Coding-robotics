import React, { useState } from "react";
import "./Chatbot.css";

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    grade: "",
    question: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = date.toISOString(); // ISO format for date and time

    const payload = {
      content: `**New Submission:**\n
      **Name:** ${formData.name}\n
      **Surname:** ${formData.surname}\n
      **Grade:** ${formData.grade}\n
      **Question:** ${formData.question}\n
      **Date and Time:** ${formattedDate}`
    };

    try {
      await fetch(
        "https://discord.com/api/webhooks/1351936693040844912/3iEeWvsd-pwSmq0jmSKRq5RNam1nnxT3nljPRfpw6oh4DpL1Ujlt93vwTRvBmfqNxX9S",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      alert("Form submitted successfully!");
      onClose(); // Close the form on success
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <textarea
          name="question"
          placeholder="Your Question"
          value={formData.question}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose} className="close-button">
          Close
        </button>
      </form>
    </div>
  );
};

export default Form;
