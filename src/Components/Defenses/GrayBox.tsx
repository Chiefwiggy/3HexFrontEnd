import React from 'react';
import {Box} from "@mui/material";

interface IGrayBoxInput {
    currentTab: number,
    index: number,
    children: React.ReactNode
}

const GrayBox = ({currentTab, index, children}: IGrayBoxInput) => {
    return (
        <Box
            sx={{
                opacity: currentTab == index ? "100%" : "30%"
            }}
        >
            {children}
        </Box>
    )
}

export default GrayBox