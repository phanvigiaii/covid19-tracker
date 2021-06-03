import "@fontsource/roboto";
import { Container, Typography } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

moment.locale("vi");

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryID, setSelectedCountryID] = useState("");
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            const sortedData = _.sortBy(res.data, "Country");
            setCountries(sortedData);
            setSelectedCountryID("vn");
        });
    }, []);

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryID(e.target.value);
    }, []);

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
        <Container>
            <Typography variant="h2" component="h2">
                Số liệu COVID-19
            </Typography>
            <Typography variant="h4" component="h4">
                {moment().format("LLLL")}
            </Typography>
            <CountrySelector
                countries={countries}
                handleOnChange={handleOnChange}
                value={selectedCountryID}
            />
            <HighLight report={report} />
            <Summary report={report} selectedCountryID={selectedCountryID} />
        </Container>
    );
}

export default App;
