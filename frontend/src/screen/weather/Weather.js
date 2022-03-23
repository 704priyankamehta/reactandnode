import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import React from "react";
import { useState } from "react";
import axios from "axios";
import "./weather.css";

import { useNavigate } from "react-router-dom";

export default function Weather() {
  const history = useNavigate();
  const [value, onChange] = useState(new Date());
  const [temperature, settemperature] = useState([]);
  const [temp, settemp] = useState("");
  const [time, settime] = useState(new Date());

  const [submitt, setsubmitt] = useState(false);
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === "" || value === null) {
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
          "/displayweather",
          { value, time },
          config
        );

        if (data === "temperature not added") {
          setsubmitt(true);
          settemp(data);
          setSubmitted(false);
        } else if (data === "invalid token") {
          setsubmitt(true);
          settemp(data);
          setSubmitted(false);
        } else {
          setSubmitted(true);
          setsubmitt(false);
          settemperature(data);

          setError(false);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  const successMessages = (data) => {
    return (
      <div
        className="d"
        style={{
          display: submitt ? "" : "none",
        }}
      >
        {temp}
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div
        className="d"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>
          {" "}
          {temperature.map((data) => (
            <p>
              <p>temperature={data.temp}</p>
              <p>date={data.date}</p>
              <p>time={data.time}</p>
              <p>________________</p>
            </p>
          ))}
        </h1>
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
    <div className="down">
      <div>
        <h1>Display temperature</h1>
      </div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
        {successMessages()}
      </div>
      <div>
        <DatePicker onChange={onChange} value={value} />
        <TimePicker onChange={settime} value={time} />
        <form>
          <button onClick={handleSubmit} className="btn" type="submit">
            Display
          </button>
        </form>
      </div>
      <div className="logout">
        <button
          onClick={() => {
            localStorage.removeItem("userInfo");
            history("/");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}
