import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
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

//   get the number of days over the last week
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(11, 16));
        // increment the hours by 1
        d.setHours(d.getHours() + 1);
        

    }
    days.reverse();
    console.log(`days: ${days}`);




  // hours in range 0-23
  const hours = Array.from({ length: 24 }, (_, i) => i);
  // get the number of cases for each of the 24 hours
    const cases = hours.map((hour) => {
        const hourData = data.filter((item) => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.length;
    });
    console.log(cases);

  // get the number of deaths for each hour
  const deaths = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.deaths.total, 0);
  });
  // get the number of recovered for each hour
  const recovered = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.cases.recovered, 0);
  });
  // get the number of critical for each hour
  const critical = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.cases.critical, 0);
  });
  // get the number of active for each hour
  const active = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.cases.active, 0);
  });
  
  // get the number of tests for each hour
  const tests = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.tests.total, 0);
  });
  // get the number of new tests for each hour
  const newTests = hours.map((hour) => {
    const hourData = data.filter((item) => {
      const itemDate = new Date(item.time);
      return itemDate.getHours() === hour;
    });
    return hourData.reduce((acc, item) => acc + item.tests.new, 0);
  });

  const graphData = {
    // labels in hours
    labels: days, // hours
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
        {
            label: "Number of New Tests",
            data: newTests,
            backgroundColor: ["pink"],
            borderColor: ["pink"],
            borderWidth: 1,
        },
    ],

    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }


  };

  return (
    <div className="graph-section">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Number of Cases
      </Typography>
      <Bar data={graphData} />
      <br />
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Line Graph
        </Typography>
      <Line data={graphData} />
    </div>
  );
};

export default Analysis;
