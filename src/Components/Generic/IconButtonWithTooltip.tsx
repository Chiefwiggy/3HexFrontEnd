import React from 'react';
import {Box, IconButton, Tooltip} from "@mui/material";
import {ViewCarouselOutlined} from "@mui/icons-material";

interface IIconButtonWithTooltipInput {
    title: string,
    placement: "top" | "bottom" | "left" | "right",
    onClick: (e: React.MouseEvent) => void,
    children: React.ReactNode,
    [x:string]: any
}

const IconButtonWithTooltip = ({
    title,
    placement,
    onClick,
    children,
    ...rest
}: IIconButtonWithTooltipInput) => {


    return (
        <Tooltip title={title} placement={placement} >
            <IconButton onClick={onClick} {...rest}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default IconButtonWithTooltip