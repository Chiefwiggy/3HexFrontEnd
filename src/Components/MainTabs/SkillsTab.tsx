import React from 'react';
import {Box} from "@mui/material";
import ExpertiseWidget from "../Skills/ExpertiseWidget";
import SkillsTable from "../Skills/SkillsTable"

interface ISkillsTabInput {

}

const SkillsTab = ({}: ISkillsTabInput) => {


    return (
        <Box>
            <ExpertiseWidget />
            <SkillsTable />
        </Box>
    )
}

export default SkillsTab