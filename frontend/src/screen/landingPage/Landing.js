import React from "react";
import "./Landing.css";

import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="Landing">
      <p>ADMIN signup</p>{" "}
      <Link to="/form">
        <button className="btn">admin</button>
      </Link>
      <p>User singup</p>
      <Link to="/formUser">
        <button className="btn">user</button>
      </Link>
    </div>
  );
};
export default Landing;
