import React from 'react';
import {Box, capitalize, FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";
import {FormikProps, getIn} from "formik";

interface IFormikSwitchInput {
    formik: FormikProps<any>
    fieldName: string,
    options: Array<string>,
    optionNames?: Array<string>,
    variant?: "outlined" | "filled" | "standard"
    label?: string,
    widthOverride?: string
}

const FormikSelect = ({
    formik,
    fieldName,
    options,
    optionNames,
    variant = "outlined",
    label = "",
    widthOverride = "200px"
}: IFormikSwitchInput) => {


    return (
        <FormControl>
            <InputLabel id={fieldName+"-label"}>{label}</InputLabel>
            <Select
                label={label}
                labelId={fieldName+"-label"}
                name={fieldName}
                variant={variant}
                value={getIn(formik.values, fieldName)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
                sx={{
                    width: widthOverride
                }}
            >
                <MenuItem value={""} disabled>Select an option</MenuItem>
                {
                    options.map((option, i) =>
                        <MenuItem key={option} value={option}>{optionNames ? optionNames[i] : capitalize(option)}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

export default FormikSelect