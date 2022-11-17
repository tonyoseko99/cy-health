import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";








import react, { useState, useEffect } from "react";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");

    useEffect(() => {
        // get statistics data for each country from the statistics endpoint
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setCountries(countries);
                    console.log(countries);
                });
        };
        getCountriesData();
    }, []);


  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={country}
          label="Age"
        //   onChange={handleChange}
        >
          <MenuItem >Ten</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Countries;
