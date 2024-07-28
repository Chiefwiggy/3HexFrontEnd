import React from 'react';
import {Box, Typography} from "@mui/material";
import StatView from "../../Views/StatView";
import {IMinionData} from "../../Data/IMinionData";
import MinionSheet from "../../Data/MinionSheet";
import {getStatShorthand, UStat} from "../../Utils/Shorthand";
import MinionStatView from "./MinionStatView";

interface IMinionStatBarInput {
    minionData: MinionSheet
}

const MinionStatBar = ({
    minionData
}: IMinionStatBarInput) => {


    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)"
                }}
            >
                {
                    Object.entries(minionData.data.minionStats).map(([stat, value]) => {
                        return (
                            <MinionStatView key={stat} stat={stat as UStat | "command"} value={value.value} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default MinionStatBar