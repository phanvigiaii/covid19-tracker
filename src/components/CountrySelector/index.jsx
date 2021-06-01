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
        fontSize: 18,
        fontWeight: "bold",
    },
});

function CountrySelector({ value, handleOnChange, countries }) {
    const styles = useStyles();

    return (
        <FormControl>
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
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;
