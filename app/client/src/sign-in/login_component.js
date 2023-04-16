import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login({ setToken, setLogin }) {
  const navigate = useNavigate();
  // need to change the hierarchy to make it possible to use username throughout the app 
  const [username, setUsername] = useState("undefined");
  const [password, setPassword] = useState("undefined");

  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      axios.get(`http://localhost:8080/login-user/${username}/${password}`, {
        mode: "no-cors"
      }).then((response) => {
        console.log(response);
        if (response.data.length <= 0) {
          setError(true);
        } else {
          setError(false);
          setToken(response.data[0].UserId);
          console.log(response.data[0].UserId);
          setLogin(true);
          navigate('/search', { replace: true });
        }
        console.log(error);
      });
      setClicked(false);
    }
  }, [clicked, username, password, error, setClicked, navigate, setToken, setLogin]);


  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    setClicked(true);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{marginBottom: "1em"}}>Sign In</h3>

          <div className="mb-3">
            <label>Username &nbsp;</label>
            <input
              type="text"
              style={{marginBottom: "1em"}}
              className="form-control"
              placeholder="enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password &nbsp;</label>
            <input
              type="text"
              style={{marginBottom: "1em"}}
              className="form-control"
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                style={{marginBottom: "1em"}}
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1" >
                Remember me
              </label>
            </div>
          </div>

          {
            error ? <p> Your username and password don't match. Please try agian. </p> : <></> 
          }

          <div className="d-grid">
            <input style={{marginBottom: "1em"}} type="submit" className="btn btn-primary" />
          </div>
          <p className="forgot-password text-right">
            <Link to="/sign-up">Sign Up</Link> <br></br>
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
