import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Countries from "./Countries";

export default function Home({countries}) {
    //   fetch stats from API
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      fetchCountryData();
    }, []);
  
    const fetchCountryData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };
  
      const response = await fetch(
        "https://covid-193.p.rapidapi.com/statistics",
        options
      );
      const data = await response.json();
      setStats(data.response);
      console.log(data.response);
      setLoading(false);
    };
  
    // function to get total cases, recovered
    const getTotal = (type) => {
      let total = 0;
      stats.forEach((country) => {
        total += country.cases[type];
      });
      return total;
    };
  
    // function to get total deaths
    const getTotalDeaths = () => {
      let total = 0;
      stats.forEach((country) => {
        total += country.deaths.total;
      });
      return total;
    };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="home-container">
      <div style={{ padding: "10px 0" }} />
      <Typography className="dashcard-container">
        {/* card to display total number of covid-19 cases */}
        <Card className="dashcard">
          <CardHeader title="Total Cases" />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              <strong>
                {loading ? "Loading..." : getTotal("total").toLocaleString()}
              </strong>
            </Typography>
          </CardContent>
          <CardActions className="card-actions">
            <Link to={"/countries"} onClick={() => <Countries />}>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
        {/* card to display total number of covid-19 deaths */}
        <Card className="dashcard">
          <CardHeader title="Total Deaths" />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              <strong>
                {loading ? "Loading..." : getTotalDeaths().toLocaleString()}
              </strong>
            </Typography>
          </CardContent>
          <CardActions className="card-actions">
            <Link to={"/countries"} onClick={() => <Countries />}>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
        {/* card to display total number of covid-19 recovered */}
        <Card className="dashcard">
          <CardHeader title="Total Recovered" />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              <strong>
                {loading
                  ? "Loading..."
                  : getTotal("recovered").toLocaleString()}
              </strong>
            </Typography>
          </CardContent>
          <CardActions className="card-actions">
            <Link to={"/countries"} onClick={() => <Countries countries={countries} />}>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Typography>
    </Box>
  );
}
