import React, { useState } from "react";
import "./css/ResetPassword.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate(); // Initialize navigate
  const protocol = window.location.protocol;
  const host = window.location.host;
  const [formData, setFormData] = useState({
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("entering the fetch method");

  const handleReset = () => {
    fetch("https://cloth-store-backend-kruy.onrender.com/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        host: host,
        protocol: protocol,
      }),
    })
      .then((response) => {
        console.log("Enter the Fetch Method");
        console.log(response);
      })
      .catch((err) => {
        console.error("Fetch error:", error);
        alert("An error occurred. Please try again later.");
      });
    setTimeout(() => {
      navigate("/reset/email-sent");
    }, 2000);
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter your email address"
        />
        <button onClick={handleReset}>Continue</button>
      </div>
    </div>
  );
}

export default ResetPassword;
