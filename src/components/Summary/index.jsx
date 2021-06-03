import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart";
import HighMap from "../Charts/HighMap";

Summary.propTypes = {};

function Summary({ report, selectedCountryID }) {
    const [reportCountry, setReportCountry] = useState({});

    useEffect(() => {
        if (selectedCountryID) {
            import(
                `@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`
            )
                .then((res) => {
                    setReportCountry(res);
                })
                .catch((e) => console.log(e));
        }
    }, [selectedCountryID]);

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart report={report} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighMap reportCountry={reportCountry} />
            </Grid>
        </Grid>
    );
}

export default Summary;
