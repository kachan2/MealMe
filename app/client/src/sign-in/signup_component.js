import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      axios.get(`http://localhost:8080/signup-user/${username}/${password}`, {
        mode: "no-cors", 
      }).then((response) => {
        console.log(response);
        if (response.data.length <= 0) {
          setError(true);
        } else {
          setError(false);
          navigate('/login', { replace: true });
        }
        console.log(error);
      });
      setClicked(false);
    }
  }, [clicked, username, password, error, setClicked]);


  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    setClicked(true);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{marginBottom: "1em"}}> Sign Up</h3>
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
                style={{marginBottom: "3em"}}
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1" >
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <input style={{marginBottom: "1em"}} type="submit" className="btn btn-primary" />
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
