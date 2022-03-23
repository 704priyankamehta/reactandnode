import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormUser() {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      try {
        const config = {
          "Content-type": "application/json",
        };

        const { data } = await axios.post(
          "/registrationUser",
          { name, email, password },
          config
        );
        setSubmitted(data);
        setError(false);
        console.log(data);
      } catch (error) {
        setError(true);
      }
    }
  };

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
        <h1>Please enter all the fields </h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>user Registration</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
        <div>
          {" "}
          <p>Already have an account</p>
          <Link to="/login">
            <button block size="lg" type="submit">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
