import React from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";

interface IRaceSelectViewInput {

}

const RaceSelectView = ({}: IRaceSelectViewInput) => {

    const {currentSheet} = useCharacter();


    return currentSheet && currentSheet.data.race ? (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Typography variant={"h4"}>Race and Build</Typography>
                <Typography>{capitalize(currentSheet.data.race.raceId)} {currentSheet.data.race.subraceId ? `- ${capitalize(currentSheet.data.race.subraceId)}` : ""}</Typography>
            </Box>
        </Box>
    ) : <></>
}

export default RaceSelectView