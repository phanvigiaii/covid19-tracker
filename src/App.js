import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryID, setSelectedCountryID] = useState("");
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            setCountries(res.data);
            setSelectedCountryID("vn");
        });
    }, []);

    const handleOnChange = (e) => {
        setSelectedCountryID(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryID) {
            const country = countries.find(
                (country) => country.ISO2.toLowerCase() === selectedCountryID
            );
            const { Slug } = country;

            getReportByCountry(Slug).then((res) => {
                // res.data.pop();
                setReport(res.data);
            });
        }
    }, [countries, selectedCountryID]);

    return (
        <>
            <CountrySelector
                countries={countries}
                handleOnChange={handleOnChange}
                value={selectedCountryID}
            />
            <HighLight report={report} />
            <Summary report={report} />
        </>
    );
}

export default App;
