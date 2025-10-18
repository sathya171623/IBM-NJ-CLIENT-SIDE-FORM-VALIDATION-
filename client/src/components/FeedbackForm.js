import React, { useState } from "react";
import axios from "axios";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required.";
    if (!formData.email.includes("@")) err.email = "Invalid email address.";
    if (formData.message.length < 10)
      err.message = "Message must be at least 10 characters.";
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setResponse("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Simulate API
      const res = await axios.post("http://localhost:5000/api/feedback", formData);
      setResponse(res.data.message || "Feedback submitted successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponse("Server error. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Feedback Form</h3>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name && "is-invalid"}`}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email && "is-invalid"}`}
            required
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`form-control ${errors.message && "is-invalid"}`}
            required
          />
          <div className="invalid-feedback">{errors.message}</div>
        </div>

        <button className="btn btn-success" type="submit">
          Submit Feedback
        </button>
      </form>

      {response && <div className="alert alert-info mt-3">{response}</div>}
    </div>
  );
}

export default FeedbackForm;
