import React from 'react';
import {Box, Typography} from "@mui/material";
import {ShieldOutlined} from "@mui/icons-material";
import {TbShieldHeart} from "react-icons/tb";
import {LuShield} from "react-icons/lu";

interface IStatShieldWithSecondaryInput {
    value: number | string,
    title: string
}

const StatShieldWithSecondary = ({value, title}: IStatShieldWithSecondaryInput) => {


    return (
        <Box
            sx={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center"
            }}
        >
            <Typography>{title}</Typography>
            <Box sx={{ gridColumn: 1, gridRow: 2}}>
                <LuShield size={70} strokeWidth={1}  />
            </Box>
            <Box sx={{ gridColumn: 1, gridRow: 2, display: 'flex', flexDirection: "column"}}>
                <Typography sx={{fontSize: "1.1rem"}}>{value}</Typography>
                <Typography>gamer</Typography>
            </Box>

        </Box>
    )
}

export default StatShieldWithSecondary