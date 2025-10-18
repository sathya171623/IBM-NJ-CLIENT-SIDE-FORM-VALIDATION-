import React, { useState } from "react";
import { validateCardNumber, validatePhone } from "./ValidationUtils";

function PaymentForm() {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};

    if (!formData.cardName.trim()) err.cardName = "Cardholder name is required.";
    if (!validateCardNumber(formData.cardNumber))
      err.cardNumber = "Card number must be 16 digits.";
    if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/))
      err.expiry = "Invalid expiry date (MM/YY).";
    if (!formData.cvv.match(/^\d{3}$/)) err.cvv = "CVV must be 3 digits.";
    if (!validatePhone(formData.phone)) err.phone = "Invalid phone number.";

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setMessage("Payment processed successfully.");
    setFormData({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      phone: "",
    });
  };

  return (
    <div className="container mt-5">
      <h3>Payment Form</h3>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">Cardholder Name</label>
          <input
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={`form-control ${errors.cardName && "is-invalid"}`}
            required
          />
          <div className="invalid-feedback">{errors.cardName}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            name="cardNumber"
            maxLength="16"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`form-control ${errors.cardNumber && "is-invalid"}`}
            required
          />
          <div className="invalid-feedback">{errors.cardNumber}</div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Expiry Date (MM/YY)</label>
            <input
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className={`form-control ${errors.expiry && "is-invalid"}`}
              required
            />
            <div className="invalid-feedback">{errors.expiry}</div>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">CVV</label>
            <input
              name="cvv"
              type="password"
              maxLength="3"
              value={formData.cvv}
              onChange={handleChange}
              className={`form-control ${errors.cvv && "is-invalid"}`}
              required
            />
            <div className="invalid-feedback">{errors.cvv}</div>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone && "is-invalid"}`}
              required
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Make Payment
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
}

export default PaymentForm;
