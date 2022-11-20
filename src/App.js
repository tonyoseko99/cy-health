import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Countries from "./components/Countries";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Analysis from "./components/Analysis";

function App() {

  // fetch countries
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': '8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.response);
      setCountries(data.response);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/about" element={<About />} />
          <Route path="/analysis" element={<Analysis countries={countries} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
