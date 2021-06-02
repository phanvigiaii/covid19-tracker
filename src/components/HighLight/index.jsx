import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import HightLightCard from "./HightLightCard";

HighLight.propTypes = {};

const useStyles = makeStyles({
    grid: {
        marginTop: 50,
        marginBottom: 50,
    },
});

function HighLight({ report }) {
    const data = report[report.length - 1];
    const styles = useStyles();
    const summary = [
        {
            title: "Số ca nhiễm",
            count: data?.Confirmed,
            type: "confirmed",
        },
        {
            title: "Số ca khỏi",
            count: data?.Recovered,
            type: "recovered",
        },
        {
            title: "Số ca tử vong",
            count: data?.Deaths,
            type: "death",
        },
    ];

    return (
        <Grid container spacing={3} className={styles.grid}>
            {summary.map((item, index) => (
                <HightLightCard key={index} item={item} />
            ))}
        </Grid>
    );
}

export default HighLight;
