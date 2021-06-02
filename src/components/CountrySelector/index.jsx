import {
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    NativeSelect,
} from "@material-ui/core";
import React from "react";

CountrySelector.propTypes = {};

const useStyles = makeStyles({
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    helper: {
        fontSize: 20,
    },
});

function CountrySelector({ value, handleOnChange, countries }) {
    const styles = useStyles();

    return (
        <FormControl style={{ marginTop: "50px" }}>
            <InputLabel
                htmlFor="country-selector"
                shrink
                className={styles.label}
            >
                Quốc gia
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: "country",
                    id: "country-selector",
                }}
            >
                {countries.map((country, index) => {
                    return (
                        <option key={index} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText className={styles.helper}>
                Lựa chọn quốc gia
            </FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;
