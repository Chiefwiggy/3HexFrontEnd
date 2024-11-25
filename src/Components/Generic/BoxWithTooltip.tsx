import React, {ClassAttributes} from 'react';
import {Box, IconButton, SxProps, Tooltip} from "@mui/material";
import {jsx} from "@emotion/react";

interface IBoxWithTooltipInput {
    title: string,
    placement: "top" | "bottom" | "left" | "right",
    sx?: SxProps<any>,
    component?: React.ElementType
    children: React.ReactNode
}

const BoxWithTooltip = ({
    title,
    placement,
    sx = {},
    component="div",
    children
}: IBoxWithTooltipInput) => {


    return (
        <Tooltip title={title} placement={placement} >
            <Box sx={sx} component={component}>
                {children}
            </Box>
        </Tooltip>
    )
}

export default BoxWithTooltip