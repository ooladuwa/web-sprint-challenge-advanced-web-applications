import React, { useState, useEffect } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from "axios";

const initialFormValues = {
  username: "",
  password: "",
};

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  // const [error, setError] = useState('')
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", {
        username: "Lambda School",
        password: "i<3Lambd4",
      })
      .then((res) => {
        console.log("res:", res);
        //res.data.payload gives us token
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected/bubblePage");
      })
      .catch((err) => {
        console.log({ "err:": err });
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          data-testid="username"
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          id="username"
          placeholder="Username.."
        />
        <label htmlFor="password">Password</label>
        <input
          data-testid="password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          id="password"
          placeholder="Password.."
        />
        <button>Enter Bubble Site!</button>
      </form>

      <p data-testid="errorMessage" className="error"></p>
    </div>
  );
};

export default Login;
