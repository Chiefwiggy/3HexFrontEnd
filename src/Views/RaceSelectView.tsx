import React from 'react';
import {Box, Typography} from "@mui/material";

interface IRaceSelectViewInput {

}

const RaceSelectView = ({}: IRaceSelectViewInput) => {


    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Typography variant={"h4"}>Race and Build</Typography>
            </Box>
        </Box>
    )
}

export default RaceSelectView