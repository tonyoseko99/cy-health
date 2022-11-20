import react, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";

const Analysis = ({countries}) => {
    const [data, setData] = useState([]);
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    useEffect(() => {
        fetch(`https://covid-193.p.rapidapi.com/statistics`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': '8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac',
		        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }

        })
        .then(response => response.json())
        .then(data => {
            console.log(data.response);
            setData(data.response);
        })
        .catch(err => {
            console.error(err);
        }
        );
    }, []);

    // hours in range 0-23
    const hours = Array.from({length: 24}, (_, i) => i);
    // get the number of cases for each hour
    const cases = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.cases.total, 0);
    });
    // get the number of deaths for each hour
    const deaths = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.deaths.total, 0);
    });
    // get the number of recovered for each hour
    const recovered = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.cases.recovered, 0);
    });
    // get the number of critical for each hour
    const critical = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.cases.critical, 0);
    });
    // get the number of active for each hour
    const active = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.cases.active, 0);
    });
    // get the number of new cases for each hour
    const newCases = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.cases.new, 0);
    });
    // get the number of new deaths for each hour
    const newDeaths = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.deaths.new, 0);
    });
    // get the number of tests for each hour
    const tests = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.tests.total, 0);
    });
    // get the number of new tests for each hour
    const newTests = hours.map(hour => {
        const hourData = data.filter(item => {
            const itemDate = new Date(item.time);
            return itemDate.getHours() === hour;
        });
        return hourData.reduce((acc, item) => acc + item.tests.new, 0);
    });
    // get the number of population for each hour


    const graphData = {
        // labels in hours 
        labels: Array.from({length: 24}, (_, i) => `${i} hours`),
        datasets: [
            {
                label: 'Number of Cases',
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
            {
                label: 'Number of Deaths',
                data: deaths,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
            {
                label: 'Number of Recovered',
                data: recovered,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },

            {
                label: 'Number of Critical',
                data: critical,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
            {
                label: 'Number of Active',
                data: active,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },

            
        ],
    };



    return (
        <Box component="main" sx={{ flexGrow: 1, p: 16 }} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Number of Cases
                        </Typography>
                        <Line data={graphData} />
                    </Paper>
                </Grid>
            </Grid>
            <Bar data={graphData} />
        </Box>
    );


};

export default Analysis;

