import React from 'react'
import {SvgIconComponent, WaterDropOutlined} from "@mui/icons-material";
import {Box} from "@mui/material";
interface INumericIconInput {
    val: string | number,
    icon: React.ElementType,
    align?: "left" | "center" | "right",
    postText?: string
}
const NumericIcon = ({val, align="left", icon, postText=""}: INumericIconInput) => {
    const IconComponent = icon;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: align,
            fontSize: "0.9rem"
        }}>
            <><IconComponent /> { val } {postText} </>
        </Box>
    )
}

export default NumericIcon