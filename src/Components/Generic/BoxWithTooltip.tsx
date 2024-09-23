import React from 'react';
import {Box, IconButton, SxProps, Tooltip} from "@mui/material";
import {jsx} from "@emotion/react";

interface IBoxWithTooltipInput {
    title: string,
    placement: "top" | "bottom" | "left" | "right",
    sx: SxProps<any>,
    children: React.ReactNode
}

const BoxWithTooltip = ({
    title,
    placement,
    sx,
    children
}: IBoxWithTooltipInput) => {


    return (
        <Tooltip title={title} placement={placement} >
            <Box sx={sx}>
                {children}
            </Box>
        </Tooltip>
    )
}

export default BoxWithTooltip