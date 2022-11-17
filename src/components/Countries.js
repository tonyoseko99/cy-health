import react, {useState, useEffect} from 'react';

const Countries = () => {
    // fetch country data from API
    const [countryData, setCountryData] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);




    return (
        <div>
            <h1>Countries</h1>
        </div>
    )
}

export default Countries;