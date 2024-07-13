import React from 'react'
import {Box, Paper, Tab, Tabs} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import CustomTabPanel from "../Utils/CustomTabPanel";
import {getSkillFormat} from "../Utils/Shorthand";
import ClickPopup from "../Components/Generic/ClickPopup";
import DefensiveStatPopover from "../Components/Defenses/DefensiveStatPopover";
import DefenseWidget from "../Components/Defenses/DefenseWidget";

const DefensesView = () => {
    return (
        <Box
            sx={{
                paddingTop: 2
            }}
        >
            <DefenseWidget />
        </Box>
    )
}

export default DefensesView;