import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import ArcanaLayout from "./ArcanaLayout"
import {IAffinitiesAndArcana, IClassData} from "../../../Data/ICharacterData";
import {IFatelineData} from "../../../Data/IFatelineData";
import {GetArcanaAndAffinitiesFromClassList} from "../../../Utils/CalculateAffinities";

interface IAffinitiesPanelInput {
    myClasses: Array<IClassData>,
    myFate: IFatelineData|undefined
}

const AffinitiesPanel = ({
    myClasses,
    myFate
}: IAffinitiesPanelInput) => {


    const [affData, setAffData] = useState<IAffinitiesAndArcana>({
        affinities: {
            focus: 0,
            rune: 0,
            soul: 0,
            deft: 0,
            infantry: 0,
            guardian: 0,
            leadership: 0,
            erudite: 0,
            supply: 0,
            biohacking: 0,
            abjuration: 0,
            machinery: 0
        },
        arcana: {
            arcane: 0,
            warrior: 0,
            support: 0,
            hacker: 0
        }
    })

    useEffect(() => {
        setAffData(GetArcanaAndAffinitiesFromClassList(myClasses, myFate));
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
            <ArcanaLayout affData={affData} arcana={"warrior"} affinities={["deft", "infantry", "guardian"]}/>
            <ArcanaLayout affData={affData} arcana={"arcane"} affinities={["focus", "soul", "rune"]}/>
            <ArcanaLayout affData={affData} arcana={"support"} affinities={["leadership", "erudite", "supply"]}/>
            <ArcanaLayout affData={affData} arcana={"hacker"} affinities={["machinery", "abjuration", "biohacking"]}/>

        </Box>
    )
}

export default AffinitiesPanel