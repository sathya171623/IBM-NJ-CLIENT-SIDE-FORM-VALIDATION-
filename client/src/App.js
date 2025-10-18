import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import FeedbackForm from "./components/FeedbackForm";
import PaymentForm from "./components/PaymentForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional for global styles

function App() {
  const [view, setView] = useState("register");

  // Helper to render selected form
  const renderForm = () => {
    switch (view) {
      case "register":
        return <RegistrationForm />;
      case "login":
        return <LoginForm />;
      case "feedback":
        return <FeedbackForm />;
      case "payment":
        return <PaymentForm />;
      default:
        return <RegistrationForm />;
    }
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Client-Side Form Validation System</h1>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center flex-wrap mb-4">
        <button
          className={`btn mx-2 mb-2 ${view === "register" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("register")}
        >
          Register
        </button>
        <button
          className={`btn mx-2 mb-2 ${view === "login" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setView("login")}
        >
          Login
        </button>
        <button
          className={`btn mx-2 mb-2 ${view === "feedback" ? "btn-info text-white" : "btn-outline-info"}`}
          onClick={() => setView("feedback")}
        >
          Feedback
        </button>
        <button
          className={`btn mx-2 mb-2 ${view === "payment" ? "btn-warning text-white" : "btn-outline-warning"}`}
          onClick={() => setView("payment")}
        >
          Payment
        </button>
      </div>

      {/* Render the selected form */}
      {renderForm()}
    </div>
  );
}

export default App;
