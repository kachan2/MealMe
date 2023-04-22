import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const UserHome = ({token}) => {
    const navigate = useNavigate();
    
    const [info, setInfo] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if (!loaded && token != undefined) {
            axios.get(`http://localhost:8080/get-user/${token}`).then((response)=>{console.log(response); 
                                                                                    setInfo(response.data);
                                                                                })
            setLoaded(true);
        }

        if (info != undefined) {
            setUsername(info[0].Username);
            setPassword(info[0].Password);
        }
    })

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate('/', {replace: true});
    }

    return (
        <div className="login-page">
          <h2 style={{marginBottom: "1em"}}>My Profile Page</h2> <br/>
          {
            (info && password && username) && <div>
                        <p className="profile"><u>Username:</u> {username}</p>
                        <p className="profile"><u>Password:</u> {password} </p>
                    </div>
          } <br/>
          <div>
            <input value = "Change Password" style={{marginBottom: "1em"}} type="submit" className="profile-button" onClick={()=> {navigate("/forgot-password", {replace:true})}}/> 
            <input value = "Logout" style={{marginBottom: "1em"}} type="submit" className="profile-button" onClick={logout}/> <br/><br/><br/>
            <input value = "Go To Favorites" style={{marginBottom: "1em"}} type="submit" className="profile-button" onClick={()=> {navigate("/favorites", {replace:true})}}/>
            <input value = "Go To Inventory" style={{marginBottom: "1em"}} type="submit" className="profile-button" onClick={()=> {navigate("/inventory", {replace:true})}}/> <br/>
            
          </div>
      </div>
    );
}

export default UserHome;

