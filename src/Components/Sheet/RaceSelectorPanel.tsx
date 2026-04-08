import React from 'react';
import {Box, Typography} from "@mui/material";
import {IRaceMetadata, ISubraceMetadata} from "../../Hooks/usePreloadedContent/PLC_RaceData";

interface IRaceSelectorPanelInput {
    currentRace: IRaceMetadata;
    currentSubrace: ISubraceMetadata;
}

const RaceSelectorPanel = ({
    currentRace,
    currentSubrace
}: IRaceSelectorPanelInput) => {
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#123456",
                    borderRadius: 1,
                    margin: "8px",
                    ml: 0,
                    padding: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Typography variant="h4" component="span">{currentRace.raceName}</Typography>
                    <Typography variant="h6" component="span" sx={{paddingLeft: "4px"}}>{currentSubrace.subraceName}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default RaceSelectorPanel