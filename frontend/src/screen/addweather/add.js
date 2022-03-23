import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import React from "react";
import { useState } from "react";
import axios from "axios";
import "./add.css";
import { useNavigate } from "react-router";
export default function Add() {
  const history = useNavigate();
  const [value, onChange] = useState(new Date());
  const [temp, settemp] = useState("");
  const [time, settime] = useState(new Date());

  // States for checking the errors
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState(false);
  const handletemp = (e) => {
    settemp(e.target.value);
    setSubmitted("");
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (temp === "" || value === "") {
      setError(true);
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",

            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
        };

        const { data } = await axios.put(
          "/update",
          { temp, value, time },
          config
        );

        setSubmitted(data);
        console.log(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (temp === "" || value === "") {
      setError(true);
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
        };

        const { data } = await axios.post(
          "/addweather",
          { temp, value, time },
          config
        );

        setSubmitted(data);
        console.log(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    }
  };
  const successMessage = () => {
    return (
      <div
        className="successe"
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  return (
    <div className="add">
      <div>
        <h1>Add temperature</h1>
      </div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <div>
        <DatePicker onChange={onChange} value={value} />
        <TimePicker onChange={settime} value={time} />
        <form>
          {/* Labels and inputs for form data */}
          <label className="label">temperature</label>
          <input
            onChange={handletemp}
            className="input"
            value={temp}
            type="text"
            required
          />
          <button onClick={handleUpdate} className="btn" type="submit">
            Update
          </button>
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="logout">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            history("/");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}
