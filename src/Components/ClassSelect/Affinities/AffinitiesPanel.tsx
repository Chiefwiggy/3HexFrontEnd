import React from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import ArcanaLayout from "./ArcanaLayout"
import {IClassData} from "../../../Data/ICharacterData";

interface IAffinitiesPanelInput {
    myClasses: Array<IClassData>
}

const AffinitiesPanel = ({
    myClasses
}: IAffinitiesPanelInput) => {

    const {currentSheet} = useCharacter();

    return currentSheet ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2
            }}
        >
            <Typography variant={"h4"} textAlign={"center"}>Affinities</Typography>
            <ArcanaLayout myClasses={myClasses} arcana={"warrior"} affinities={["deft", "infantry", "guardian"]}/>
            <ArcanaLayout myClasses={myClasses} arcana={"arcane"} affinities={["hex", "soul", "rune"]}/>
            <ArcanaLayout myClasses={myClasses} arcana={"support"} affinities={["leadership", "erudite", "supply"]}/>
            <ArcanaLayout myClasses={myClasses} arcana={"hacker"} affinities={["machinery", "abjuration", "biohacking"]}/>

        </Box>
    ) : <></>
}

export default AffinitiesPanel