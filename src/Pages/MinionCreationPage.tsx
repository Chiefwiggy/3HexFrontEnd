import React from 'react';
import {Box} from "@mui/material";
import CreateMinionTemplate from "../Components/Minions/CreateTemplate/CreateMinionTemplate";
import {Helmet} from "react-helmet";

interface IMinionCreationPageInput {

}

const MinionCreationPage = ({}: IMinionCreationPageInput) => {


    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Create Minions - Ursura</title>
            </Helmet>
            <CreateMinionTemplate />
        </Box>
    )
}

export default MinionCreationPage