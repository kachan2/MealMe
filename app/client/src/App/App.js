import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "../components/navbar";
import Favorites from "../components/favorites";
import Recommendations from "../components/recommendations";
import Inventory from "../components/inventory";
import Search from "../components/search";
import Login from "../sign-in/login_component";
import SignUp from "../sign-in/signup_component";
import ForgotPassword from "../sign-in/forgot_password"

const App = () => {
  const [token, setToken] = useState();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (!token) {
      setLogin(false);
    } else {
      setLogin(true);
    }

  }, [token, setLogin])

  

  return (
    <div>
    {
      login ? <div> 
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Recommendations/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/favorites' element={<Favorites token={token}/>} />
        <Route path='/inventory' element={<Inventory token={token}/>} />
      </Routes>
      </Router> </div> 
      :
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login setToken={setToken} setLogin={setLogin}/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/login' element={<Login setToken={setToken} setLogin={setLogin}/>} />
          </Routes>
        </Router>
      </div> 
    }
    </div>
  );
}

export default App;