import React from 'react'
import {SvgIconComponent, WaterDropOutlined} from "@mui/icons-material";
import {Box} from "@mui/material";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
interface INumericIconInput {
    val: string | number,
    icon: React.ElementType,
    title?: string,
    placement?: "top" | "bottom" | "left" | "right",
    align?: "left" | "center" | "right",
    postText?: string,
    postIcon?: React.ReactNode,
    fontSize?: string,
    iconColor?: string,
    textColor?: string
}
const NumericIcon = ({val, align="left", icon, title="", placement="top", postText="", postIcon=<></>, fontSize="0.9rem", iconColor="white", textColor="white"}: INumericIconInput) => {
    const IconComponent = icon;


    return (
        <BoxWithTooltip
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: align,
                fontSize: fontSize,
                color: textColor
            }}
            title={title}
            placement={placement}
        >
            <><IconComponent color={iconColor} fontSize={"24px"} /> { val } {postText} {postIcon} </>
        </BoxWithTooltip>
    )
}

export default NumericIcon