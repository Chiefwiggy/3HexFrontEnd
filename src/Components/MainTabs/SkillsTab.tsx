import React from 'react';
import {Box, Divider} from "@mui/material";
import ExpertiseWidget from "../Skills/ExpertiseWidget";
import SkillsTable from "../Skills/SkillsTable"

interface ISkillsTabInput {

}

const SkillsTab = ({}: ISkillsTabInput) => {


    return (
        <Box>
            <ExpertiseWidget />
            <Divider sx={{margin: 2}} />
            <SkillsTable />
        </Box>
    )
}

export default SkillsTab