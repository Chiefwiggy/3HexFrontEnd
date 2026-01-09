import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import BarracksWeapon from "../Components/Equipment/BarracksWeapon";
import {AddOutlined} from "@mui/icons-material";
import {ICharacterBaseData} from "../Data/ICharacterData";
import CharacterSelectCard from "../Components/Character Select/CharacterSelectCard";
import CompendiumSelect from "../Components/Character Select/CompendiumSelect";
import {Helmet} from "react-helmet";

interface IBarracksPageInput {

}

const BarracksPage = ({}: IBarracksPageInput) => {

    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Barracks - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    padding: "12px",
                    display: 'grid',
                    gridTemplateColumns: "repeat(3, 1fr)"
                }}
            >

                <Box></Box>
                <Typography variant="h3" component="div" textAlign={"center"}>Barracks</Typography>
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
                <CompendiumSelect text={"Weapons"} linkTo={"weapons"} />
                <CompendiumSelect text={"Armor"} linkTo={"armor"} />
                <CompendiumSelect text={"Sources"} linkTo={"sources"} />
                <CompendiumSelect text={"Consumables"} linkTo={"consumables"} />
                <CompendiumSelect text={"Minions"} linkTo={"minions"} />
                <CompendiumSelect text={"Fatelines"} linkTo={"fatelines"} />
                <CompendiumSelect text={"Datachips & Packages"} linkTo={"datachips"} />
                <CompendiumSelect text={"Gadgets"} linkTo={"gadgets"} />
                <CompendiumSelect text={"Conditions"} linkTo={"conditions"} />
            </Box>
        </Box>
    )
}

export default BarracksPage