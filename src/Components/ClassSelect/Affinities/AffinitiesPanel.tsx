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
}

const AffinitiesPanel = ({
    myClasses,
    myFate
}: IAffinitiesPanelInput) => {


    const [affData, setAffData] = useState<IAffinitiesAndPath>({
        affinities: {
            nimble: 0,
            infantry: 0,
            guardian: 0,
            focus: 0,
            creation: 0,
            alteration: 0,
            leadership: 0,
            supply: 0,
            summoning: 0,
            swift: 0,
            riding: 0,
            versatile: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            machinery: 0,
            biohacking: 0,
            abjuration: 0
        },
        path: {
            warrior: 0,
            arcanist: 0,
            commander: 0,
            navigator: 0,
            scholar: 0,
            hacker: 0
        }
    })

    useEffect(() => {
        setAffData(GetPathAndAffinitiesFromClassList(myClasses, myFate));
    }, [myClasses, myFate]);

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
            <PathLayout affData={affData} path={"navigator"} affinities={["swift", "riding", "versatile"]}/>
            <PathLayout affData={affData} path={"scholar"} affinities={["rune", "sourcecraft", "research"]}/>
            <PathLayout affData={affData} path={"hacker"} affinities={["machinery", "abjuration", "biohacking"]}/>


        </Box>
    )
}

export default AffinitiesPanel