import React from 'react';
import {Box, TextField} from "@mui/material";
import {FormikHelpers, FormikProps, FormikValues, getIn} from "formik";


interface IFormikTextFieldInput {
    formik: FormikProps<any>,
    fieldName: string,
    variant?: "outlined" | "filled" | "standard"
    label?: string
}

const FormikTextField = ({
    formik,
    fieldName,
    variant = "outlined",
    label = ""
}: IFormikTextFieldInput) => {


    return (
        <TextField
            name={fieldName}
            label={label}
            variant={variant}
            value={getIn(formik.values, fieldName)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
        />
    )
}

export default FormikTextField