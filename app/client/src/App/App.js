import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import Favorites from "../components/favorites";
import Recommendations from "../components/recommendations";
import Inventory from "../components/inventory";
import Search from "../components/search";
import Login from "../sign-in/login_component";
import SignUp from "../sign-in/signup_component";
import ForgotPassword from "../sign-in/forgot_password"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Recommendations/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;