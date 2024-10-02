import React from 'react';
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CompendiumSelect from "../Components/Character Select/CompendiumSelect";
import {Helmet} from "react-helmet";

interface IMinionLandingPageInput {

}

const MinionLandingPage = ({}: IMinionLandingPageInput) => {


    const navigate = useNavigate();


    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Minions - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    margin: 4
                }}
            >
                <CompendiumSelect text={"Existing Templates"} linkTo={"templates"} />
                <CompendiumSelect text={"Create"} linkTo={"create"} />
            </Box>
        </Box>
    )
}

export default MinionLandingPage