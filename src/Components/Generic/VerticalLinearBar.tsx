import React from 'react';
import {Box, LinearProgress, LinearProgressProps, SxProps, Theme, withStyles} from "@mui/material";

interface IVerticalLinearBarInput extends LinearProgressProps {
    sxProps?: SxProps<Theme>
}

const VerticalLinearBar = ({value, sxProps = {}, ...rest}: IVerticalLinearBarInput) => {

    const defaultSx: SxProps<Theme> = {
        borderRadius: "5px",
        width: "50px",
        height: "100%",
        '& .MuiLinearProgress-bar': {
            transform: `translateY(${100 - (value ?? 0)}%) !important`
        }
    };

    return (
        <LinearProgress
          {...rest}
            value={value}
          sx={{
              ...defaultSx,
              ...sxProps,
          }}
        />
    )
}

export default VerticalLinearBar