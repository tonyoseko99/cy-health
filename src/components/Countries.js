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
                });
        };
        getCountriesData();
    }, []);

    // make a dropdown menu for each country
    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };

    // map through the countries array and return a single MenuItem for each country
    return (
        <div>
            <FormControl>
                <InputLabel>Choose a country</InputLabel>
                <Select
                    value={country}
                    onChange={onCountryChange}
                    variant="standard"
                >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map((country) => (
                        <MenuItem value={country.value}>
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};











//   return (
//     <>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Country</InputLabel>
        
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={country}
//           label="Age"
//           onChange={onCountryChange}
//         >
//           <MenuItem >Ten</MenuItem>
//         </Select>
//       </FormControl>
//     </>
//   );

export default Countries;
