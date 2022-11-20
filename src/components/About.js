import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function About() {
  return (
    <Box className="about-us">
      <Typography variant="h4" className="about-title">About Us</Typography>
      <Typography variant="body1" className="about-p">
        This is a simple dashboard to display COVID-19 data from around the
        world. The data is fetched from the RapidAPI COVID-19 API. The dashboard
        is built using ReactJS and Material UI.
      </Typography>

        <Typography variant="h4" className="about-title">API</Typography>
        <Typography variant="body1" className="about-p">
            The API used to fetch the data is the RapidAPI COVID-19 API. The API
            is free to use and does not require any authentication. The API
            provides data on the number of cases, deaths, and recoveries for
            each country. The API also provides data on the number of cases,
            deaths, and recoveries for each continent.
        </Typography>
    </Box>
  );
}
