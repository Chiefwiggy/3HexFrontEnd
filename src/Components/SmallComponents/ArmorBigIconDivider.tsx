import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {GiBorderedShield} from "react-icons/gi";

interface IArmorBigIconDividerInput {
    size: number,
    iconLabel: string,
    icon: React.ElementType,
    topValue: string,
    topLabel: string,
    bottomValue: string
    bottomLabel: string,
    iconColor?: string,
    topColor?: string,
    bottomColor?: string
}

const ArmorBigIconDivider = ({
    size,
    iconLabel,
    icon,
    topValue,
    topLabel,
    bottomValue,
    bottomLabel,
    iconColor="white",
    topColor="white",
    bottomColor="white"
}: IArmorBigIconDividerInput) => {
    const IconComponent = icon;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: `${size/4}px`
            }}
        >
            <BoxWithTooltip title={iconLabel} placement={"top"}>
                <IconComponent size={size} color={iconColor} />
            </BoxWithTooltip>
            <Box>
                <BoxWithTooltip title={topLabel} placement={"top"}>
                    <Typography fontSize={size/3} textAlign={"end"} color={topColor}>{topValue}</Typography>
                </BoxWithTooltip>
                <Divider />
                <BoxWithTooltip title={bottomLabel} placement={"bottom"}>
                    <Typography fontSize={size/3} textAlign={"end"} color={bottomColor}>{bottomValue}</Typography>
                </BoxWithTooltip>
            </Box>
        </Box>
    )
}

export default ArmorBigIconDivider