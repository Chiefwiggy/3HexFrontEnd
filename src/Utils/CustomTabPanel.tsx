import React from 'react'
import {Box} from "@mui/material";

interface ICustomTabPanelInput {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const CustomTabPanel = ({
    children,
    index,
    value
}: ICustomTabPanelInput) => {
    return (
        <Box
            hidden={value !== index}
            role="tabpanel"
        >
            {children}
        </Box>
    )
}

export default CustomTabPanel;