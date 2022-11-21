import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Box } from "@mui/system";
import { Bar, Line } from "react-chartjs-2";
import Typography from "@mui/material/Typography";

const Analysis = ({ countries }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://covid-193.p.rapidapi.com/statistics`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        setData(data.response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  // get the current hour and store in a hours array
  const hours = [];
  const hour = new Date().getHours();
  for (let i = 0; i < 24; i++) {
    hours.push((hour + i) % 24);
  }

  // get the total cases for the current hour and store in a cases array
  const cases = [];
  for (let i = 0; i < 24; i++) {
    cases.push(data[i]?.cases.total);
  }

  // get the total deaths for the current hour and store in a deaths array
  const deaths = [];
  for (let i = 0; i < 24; i++) {
    deaths.push(data[i]?.deaths.total);
  }

  // get the total recovered for the current hour and store in a recovered array
  const recovered = [];
  for (let i = 0; i < 24; i++) {
    recovered.push(data[i]?.cases.recovered);
  }

  // get the total critical for the current hour and store in a critical array
  const critical = [];
  for (let i = 0; i < 24; i++) {
    critical.push(data[i]?.cases.critical);
  }

  // get the total active for the current hour and store in a active array
  const active = [];
  for (let i = 0; i < 24; i++) {
    active.push(data[i]?.cases.active);
  }

  // get the total tests for the current hour and store in a tests array
  const tests = [];
  for (let i = 0; i < 24; i++) {
    tests.push(data[i]?.tests.total);
  }

  

  const graphData = {
    // labels in hours
    labels: hours, // hours
    datasets: [
      {
        label: "Total Cases",
        data: cases,
        backgroundColor: ["blue"],
        borderColor: ["blue"],
        borderWidth: 1,
      },
      {
        label: "Number of Deaths",
        data: deaths,
        backgroundColor: ["red"],
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Number of Recovered",
        data: recovered,
        backgroundColor: ["green"],
        borderColor: ["green"],
        borderWidth: 1,
      },

      {
        label: "Number of Critical",
        data: critical,
        backgroundColor: ["yellow"],
        borderColor: ["yellow"],
        borderWidth: 1,
      },
      {
        label: "Number of Active",
        data: active,
        backgroundColor: ["orange"],
        borderColor: ["orange"],
        borderWidth: 1,
      },
      {
        label: "Number of Tests",
        data: tests,
        backgroundColor: ["purple"],
        borderColor: ["purple"],
        borderWidth: 1,
      },
    ],

    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="graph-section">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Number of Cases in the last 24 hours
      </Typography>
      <p className="graph-description">
        <strong>To get a comprehensive view of the number of cases, please select a colored bar on the top</strong>
      </p>
      <div className="graph">
        <Bar data={graphData} />
      </div>
      <br />
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Line Graph
      </Typography>
      <div className="graph">
        <Line data={graphData} />
      </div>
    </div>
  );
};

export default Analysis;
