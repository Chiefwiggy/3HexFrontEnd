import React from 'react'
import {SvgIconComponent, WaterDropOutlined} from "@mui/icons-material";
import {Box} from "@mui/material";
interface INumericIconInput {
    val: string | number,
    icon: React.ElementType,
    align?: "left" | "center" | "right",
    postText?: string,
    postIcon?: React.ReactNode
}
const NumericIcon = ({val, align="left", icon, postText="", postIcon=<></>}: INumericIconInput) => {
    const IconComponent = icon;


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: align,
            fontSize: "0.9rem"
        }}>
            <><IconComponent /> { val } {postText} {postIcon} </>
        </Box>
    )
}

export default NumericIcon