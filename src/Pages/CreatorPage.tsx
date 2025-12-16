import React from 'react';
import {Box, Typography} from "@mui/material";
import {Helmet} from "react-helmet";
import CompendiumSelect from "../Components/Character Select/CompendiumSelect";

interface ICreatorPageInput {

}

const CreatorPage = ({}: ICreatorPageInput) => {
    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Creator - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    padding: "12px",
                    display: 'grid',
                    gridTemplateColumns: "repeat(3, 1fr)"
                }}
            >

                <Box></Box>
                <Typography variant="h3" component="div" textAlign={"center"}>Creator</Typography>
                <Box></Box>

            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1,
                    margin: 4
                }}
            >
                <CompendiumSelect text={"Cards"} linkTo={"cards"}/>
                <CompendiumSelect text={"Sources"} linkTo={"sources"} />
                <CompendiumSelect text={"Requests"} linkTo={"requests"} />
                <CompendiumSelect text={"Consumables"} linkTo={"consumables"} disabled={true} />
                <CompendiumSelect text={"Minions"} linkTo={"minions"} disabled={true} />
                <CompendiumSelect text={"Fatelines"} linkTo={"fatelines"} disabled={true} />
            </Box>
        </Box>
    )
}

export default CreatorPage