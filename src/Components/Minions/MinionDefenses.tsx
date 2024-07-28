import React from 'react';
import {Box, Typography} from "@mui/material";
import MinionSheet from "../../Data/MinionSheet";
import DefensesView from "../../Views/DefensesView";
import DefenseWidget from "../Defenses/DefenseWidget";

interface IMinionDefensesInput {
    minionData: MinionSheet
}

const MinionDefenses = ({
    minionData
}: IMinionDefensesInput) => {


    return (
        <Box
            sx={{
                paddingBottom: 2
            }}
        >
            <DefenseWidget sheet={minionData} />
        </Box>
    )
}

export default MinionDefenses;