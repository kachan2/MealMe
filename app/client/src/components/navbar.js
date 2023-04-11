import React from 'react';
import {  Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
  <div>
   <ul>
    <li style={{float:"left", padding:"1px" }}><h1><b>MealMe</b></h1></li>
    <li><Link to="/login">Profile</Link></li>
    <li><Link to="/inventory">Inventory</Link></li>
    <li><Link to="/favorites">Favorites</Link></li>
    <li><Link to="/search">Search</Link></li>
    <li><Link to="/">Home</Link></li>
  </ul>
  </div>  
  );
}


export default Navbar;