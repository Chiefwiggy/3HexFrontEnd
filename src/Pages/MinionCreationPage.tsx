import React from 'react';
import {Box} from "@mui/material";
import CreateMinionTemplate from "../Components/Minions/CreateTemplate/CreateMinionTemplate";

interface IMinionCreationPageInput {

}

const MinionCreationPage = ({}: IMinionCreationPageInput) => {


    return (
        <Box>
            <CreateMinionTemplate />
        </Box>
    )
}

export default MinionCreationPage