import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import PathLayout from "./PathLayout"
import {IAffinitiesAndPath, IClassData} from "../../../Data/ICharacterData";
import {IFatelineData} from "../../../Data/IFatelineData";
import {GetPathAndAffinitiesFromClassList} from "../../../Utils/CalculateAffinities";

interface IAffinitiesPanelInput {
    myClasses: Array<IClassData>,
    myFate: IFatelineData|undefined
    affData: IAffinitiesAndPath
}

const AffinitiesPanel = ({
    myClasses,
    myFate,
    affData
}: IAffinitiesPanelInput) => {




    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2
            }}
        >
            <Typography variant={"h4"} textAlign={"center"}>Affinities</Typography>
            <PathLayout affData={affData} path={"warrior"} affinities={["nimble", "infantry", "guardian"]}/>
            <PathLayout affData={affData} path={"arcanist"} affinities={["focus", "creation", "alteration"]}/>
            <PathLayout affData={affData} path={"commander"} affinities={["leadership", "supply", "summoning"]}/>
            <PathLayout affData={affData} path={"navigator"} affinities={["swift", "riding", "adaptation"]}/>
            <PathLayout affData={affData} path={"scholar"} affinities={["rune", "sourcecraft", "research"]}/>
            <PathLayout affData={affData} path={"hacker"} affinities={["machinery", "abjuration", "biohacking"]}/>


        </Box>
    )
}

export default AffinitiesPanel