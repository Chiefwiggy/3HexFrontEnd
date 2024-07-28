import React from 'react';
import {Box, Typography} from "@mui/material";
import {getStatShorthand, UStat} from "../../Utils/Shorthand";

interface IMinionStatViewInput {
    stat: UStat | "command",
    value: number
}

const MinionStatView = ({
    stat,
    value
}: IMinionStatViewInput) => {


    return (
        <Box
            sx={{
                padding: "0 20px"
            }}
        >
            <Typography sx={{
                textAlign: "center"
            }}>
                {getStatShorthand(stat)?.toUpperCase()} {value}
            </Typography>
        </Box>
    )
}

export default MinionStatView