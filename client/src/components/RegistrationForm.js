// src/components/RegistrationForm.js

import React, { useState } from "react";
//import axios from "axios";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "./ValidationUtils";
import "./style.css"; // Make sure this CSS file exists

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format.";
    if (!validatePassword(formData.password))
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, number, and special character.";
    if (!validatePhone(formData.phone)) newErrors.phone = "Phone must be exactly 10 digits.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

      //const response = await axios.post("http://localhost:5000/api/register", formData);
      setSuccess(true);
      //setMessage(response.data.message);
      setErrors({});
      setFormData({ name: "", email: "", password: "", phone: "" });

      // Hide success after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 5000);
  };

  return (
    <div className="registration-container">
      {!success ? (
        <>
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "is-invalid" : ""}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "is-invalid" : ""}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "is-invalid" : ""}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "is-invalid" : ""}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          {message && <div className="alert alert-info">{message}</div>}
        </>
      ) : (
        <div className="success-message bounce-in">
  <p>
    <h2>🎉🎊✨ Registration Successful! 🎉🎊✨</h2><br />
    {message}
  </p>
</div>

      )}
    </div>
  );
}

export default RegistrationForm;
