import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import './App.css';
import Navbar from "../components/functionalities/navbar";
import Favorites from "../components/favorites";
import Recommendations from "../components/recommendations";
import Inventory from "../components/inventory";
import SearchPage from "../components/searchPages/search";
import Login from "../sign-in/login_component";
import SignUp from "../sign-in/signup_component";
import ForgotPassword from "../sign-in/forgot_password";
import UserHome from "../sign-in/userHome";

const App = () => {
  const [token, setToken] = useState();
  const [user, setUser] = useState(undefined);
  // const [found, setFound] = useState(localStorage.getItem("user"));



  useEffect(() => {
    const localUser = localStorage.getItem("user");
      if (localUser != undefined && user == undefined && token == undefined) {
        const foundUser = JSON.parse(localUser);
        setUser(foundUser);
        setToken(foundUser[0].UserId);
        console.log(setToken);
      }
    
  })

  return (      
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login setToken={setToken} setUser={setUser} user={user}/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/profile' element={<UserHome token={token}/>} />
        <Route path='/recommend' element={<Recommendations token={token}/>} />
        <Route path='/search' element={<SearchPage token={token}/>} />
        <Route path='/favorites' element={<Favorites token={token}/>} />
        <Route path='/inventory' element={<Inventory token={token}/>} />
      </Routes>
    </Router>
  </div> 
  );
}


export default App;