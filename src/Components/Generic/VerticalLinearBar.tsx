import React from 'react';
import {Box, LinearProgress, LinearProgressProps, withStyles} from "@mui/material";

interface IVerticalLinearBarInput extends LinearProgressProps {

}

const VerticalLinearBar = ({value, ...rest}: IVerticalLinearBarInput) => {


    return (
        <LinearProgress
          {...rest}
            value={value}
          sx={{
            borderRadius: "5px",
            width: "50px",
            height: "100%",
            '& .MuiLinearProgress-bar': {
              transform: `translateY(${100-(value??0)}%) !important`
            }
          }}
        />
    )
}

export default VerticalLinearBar