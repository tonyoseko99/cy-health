import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Countries from "./components/Countries";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Dashboard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
