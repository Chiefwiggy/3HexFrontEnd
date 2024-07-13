import React from 'react';
import {Box} from "@mui/material";

interface ICritNumberBoxInput {
    value: string
}
const CritNumberBox = ({value}: ICritNumberBoxInput) => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '35px',
                width: '35px',
                border: '1px solid white'
            }}
        >
            <Box>
                {value}
            </Box>
        </Box>
    )
}

export default CritNumberBox