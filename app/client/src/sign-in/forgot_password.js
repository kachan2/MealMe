import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword () {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
  
    const [error, setError] = useState(false);
    const [clicked, setClicked] = useState(false);
  
    useEffect(() => {
      if (clicked) {
        axios.get(`http://localhost:8080/login-user/change-password/${username}/${newpassword}`, {
          mode: "no-cors", 
        }).then((response) => {
            setPassword(newpassword);
            navigate('/login', { replace: true });
        });
        setClicked(false);
      }
    }, [clicked, username, password, newpassword, setPassword, navigate, error, setClicked]);
  
  
    function handleSubmit(e) {
      e.preventDefault();
      console.log(username, password);
      setClicked(true);
    }
  
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3 style={{marginBottom: "1em"}}> Set New Password</h3>
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
                onChange={(e) => setNewpassword(e.target.value)}
              />
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