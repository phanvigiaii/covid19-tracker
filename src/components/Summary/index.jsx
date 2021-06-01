import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart";

Summary.propTypes = {};

function Summary({ report }) {
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart report={report} />
            </Grid>
            <Grid item sm={4} xs={12}></Grid>
        </Grid>
    );
}

export default Summary;
