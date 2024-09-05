import React from 'react';
import {Box, FormControl, IconButton, TextField} from "@mui/material";
import {FormikProps, getIn} from "formik";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";

interface IFormikNumericFieldInput {
    formik: FormikProps<any>,
    fieldName: string,
    variant?: "outlined" | "filled" | "standard"
    label?: string,
    max?: number,
    min?: number
}

const FormikNumericField = ({formik, fieldName, variant, label, max, min}: IFormikNumericFieldInput) => {

    const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        await formik.setFieldValue(fieldName, Number(event.target.value));
      };

    const handleButtonChange = (delta: number) => async(event: React.MouseEvent) => {
        await formik.setFieldValue(fieldName, Number(getIn(formik.values, fieldName)) + delta);
    }

    return (
        <FormControl>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr 1fr",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <IconButton
                        onClick={handleButtonChange(-1)}
                        disabled={min != undefined ? getIn(formik.values, fieldName) <= min : false}
                    >
                        <RemoveCircleOutlined />
                    </IconButton>
                </Box>
                <TextField
                    name={fieldName}
                    label={label}
                    variant={variant}
                    value={getIn(formik.values, fieldName)}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    error={getIn(formik.touched,fieldName) && Boolean(getIn(formik.errors,fieldName))}
                    type={"text"}
                    inputProps={{ pattern: '[0-9]*' }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <IconButton
                        onClick={handleButtonChange(1)}
                        disabled={max != undefined ? getIn(formik.values, fieldName) >= max : false}
                    >
                        <AddCircleOutlined />
                    </IconButton>

                </Box>
            </Box>

        </FormControl>

    )
}

export default FormikNumericField