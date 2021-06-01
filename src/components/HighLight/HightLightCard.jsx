import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";

HightLightCard.propTypes = {};

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === "confirmed")
            return {
                borderLeft: "5px solid #c9302c",
                border: "1px solid rgba(0,0,0,0.1)",
            };
        else if (props.type === "recovered")
            return {
                borderLeft: "5px solid #28a745",
                border: "1px solid rgba(0,0,0,0.1)",
            };
        else
            return {
                borderLeft: "5px solid gray",
                border: "1px solid rgba(0,0,0,0.1)",
            };
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    count: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

function HightLightCard({ item }) {
    const { title, count, type } = item;
    const styles = useStyles({ type });
    return (
        <Grid item sm={4} xs={12}>
            <Card className={styles.wrapper}>
                <CardContent>
                    <Typography
                        component="p"
                        variant="body2"
                        className={styles.title}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        className={styles.count}
                    >
                        {count}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default HightLightCard;
