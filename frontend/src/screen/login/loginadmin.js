import axios from "axios";
import { useState } from "react";
import "./Login.css";
import React from "react";
import { useNavigate } from "react-router";
export default function LoginAdmin() {
  // States for registration
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted("");
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted("");
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      try {
        const config = {
          "Content-type": "application/json",
        };

        var { data } = await axios.post(
          "/loginAdmin",
          { email, password },
          config
        );
        if (data == "no user found") {
          setSubmitted(data);
        } else if (data == "invalid email or id") {
          setSubmitted(data);
        } else {
          localStorage.setItem("token", data);
          history("/add");
        }
        setError(false);
      } catch (error) {
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>{submitted}</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>"please enter all fields"</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Admin login</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
          required
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
          required
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
}
