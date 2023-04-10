import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import Favorites from "../components/favorites";
import Recommendations from "../components/recommendations";
import Inventory from "../components/inventory";
import Search from "../components/search";
import RecipePage from '../components/Recipe/recipe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Recommendations/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/inventory' element={<Inventory/>} />
      </Routes>
    </Router>
  );
}

export default App;