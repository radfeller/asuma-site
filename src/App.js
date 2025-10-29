import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Screenshots from './pages/Screenshots';
import './App.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/screenshots' element={<Screenshots />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
