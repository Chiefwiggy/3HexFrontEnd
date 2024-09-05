import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import {useSearchParams} from "react-router-dom";
import {IAffinities, IArcanaKeys} from "../Data/ICharacterData";
import CompendiumAffinityElement from "../Components/Compendium/CompendiumAffinityElement";

interface IAffinityCompendiumPageInput {

}

const AffinityCompendiumPage = ({}: IAffinityCompendiumPageInput) => {

    const {isLoaded} = usePreloadedContent();

    const [currentTabValue, setCurrentTabValue] = useState<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const [isArcana, setIsArcana] = useState<boolean>(true);

    const [currentName, setCurrentName] = useState<keyof IArcanaKeys | keyof IAffinities | "_">((searchParams.get("arcana") ?? searchParams.get("affinity") ?? "warrior") as keyof IArcanaKeys | keyof IAffinities | "_");

    const arcanas: Array<keyof IArcanaKeys> = ["warrior", "arcane", "support", "hacker"]
    const affinities: Array<keyof IAffinities | "_"> = ["_", "deft", "infantry", "guardian", "_", "focus", "rune", "soul", "_", "leadership", "erudite", "supply", "_", "machinery", "abjuration", "biohacking"]

    useEffect(() => {
        const arcana = searchParams.get("arcana") ?? "";
        const affinity = searchParams.get("affinity") ?? "";
        if (arcanas.includes(arcana as keyof IArcanaKeys)) {
            setCurrentTabValue(arcanas.findIndex(e => e === arcana) * 4);
            setIsArcana(true);
        } else if (affinities.includes(affinity as keyof IAffinities)) {
            setCurrentTabValue(affinities.findIndex(e => e === affinity));
            setIsArcana(false);
        }
    }, [searchParams])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabValue(newValue);
        if (newValue % 4 == 0) {
            setIsArcana(true);
            const newName = arcanas[Math.floor(newValue*0.25)]
            setSearchParams({
                arcana: newName
            })
            setCurrentName(newName);
        } else {
            setIsArcana(false);
            setSearchParams({
                affinity: affinities[newValue]
            })
            setCurrentName(affinities[newValue]);
        }
    }


    return isLoaded ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 9fr"
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={currentTabValue}
                onChange={handleTabChange}
            >
                <Tab label={<Typography variant={"h6"}>Warrior</Typography>}/>
                <Tab label={"Deft"}/>
                <Tab label={"Infantry"}/>
                <Tab label={"Guardian"}/>
                <Tab label={<Typography variant={"h6"}>Arcane</Typography>}/>
                <Tab label={"Focus"}/>
                <Tab label={"Rune"}/>
                <Tab label={"Soul"}/>
                <Tab label={<Typography variant={"h6"}>Support</Typography>}/>
                <Tab label={"Leadership"}/>
                <Tab label={"Erudite"}/>
                <Tab label={"Supply"}/>
                <Tab label={<Typography variant={"h6"}>Hacker</Typography>}/>
                <Tab label={"Machinery"}/>
                <Tab label={"Abjuration"}/>
                <Tab label={"Biohacking"}/>
            </Tabs>
            <Box
                sx={{
                        padding: "12px"
                    }}
            >
                <CompendiumAffinityElement elemName={currentName} isArcana={isArcana} description={""}/>
            </Box>
        </Box>
    ) : <></>
}

export default AffinityCompendiumPage;