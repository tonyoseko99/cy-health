import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Countries from "./components/Countries";

function App() {
  // function to fetch country data from API
  const [countryData, setCountryData] = useState([]);
  const country = async () => {
    const url = "https://covid-193.p.rapidapi.com";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    const response = await fetch(`url/countries`, options);
    const data = await response.json();
    setCountryData(data.response);
    console.log(data.response);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/countries" element={<Countries/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
