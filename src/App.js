import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CityMap from './pages/CityMap';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/citymap' element={<CityMap />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
