import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./login.css";

export default function Login({ setToken, setUser, user }) {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("undefined");
  const [password, setPassword] = useState("undefined");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser != undefined) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("found user: ", foundUser);
      setUser(foundUser);
      console.log(foundUser[0].UserId);
      setToken(foundUser[0].UserId);
    }
  })

  if (user != undefined) {
    navigate("/search", { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    axios.get(`http://localhost:8080/login-user/${username}/${password}`, {
        mode: "no-cors"
      }).then((response) => {
        console.log(response);
        if (response.data.length <= 0) {
          setError(true);
        } else {
          setError(false);
          setToken(response.data[0].UserId);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/search', { replace: true });
        }
        console.log(error);
      });
  }

  return (
    <div className="login-page">
        <form onSubmit={handleSubmit}>
          <h2 style={{marginBottom: "1em"}}>Hello Again!</h2>
          <h4 style={{marginBottom: "1em"}} className="sub-heading">Please Sign In to Continue</h4>
          <div className="mb-1">
            <label>Username &nbsp;</label>
            <input
              type="text"
              style={{marginBottom: "1em"}}
              className="form-control"
              placeholder="enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Password &nbsp;</label>
            <input
              type="text"
              style={{marginBottom: "1em"}}
              className="form-control"
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br/>
          <div className="mb-3">
            <div className="remember">
              <input
                type="checkbox"
                style={{marginBottom: "1em"}}
                className="custom-control-input"
                id="customCheck1"
              /> 
              <label htmlFor="customCheck1" >
                Remember me
              </label>
            </div>
          </div>

          {
            error ? <p className="error"> Your username and password don't match. Please try again. </p> : <></> 
          }

          <div className="d-grid">
            <input style={{marginBottom: "1em"}} type="submit" className="login-button" />
          </div>
          <p className="forgot-password">
            <Link to="/sign-up">Sign Up</Link>   &nbsp;  &nbsp;  &nbsp;
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </form>
      </div>
  );
}
