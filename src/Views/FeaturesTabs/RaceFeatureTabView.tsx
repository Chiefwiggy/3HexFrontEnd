import React, {useEffect, useState} from 'react';
import {Box, Divider, Tab, Tabs, Typography} from "@mui/material";
import {IRaceData} from "../../Data/IRacialData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IAffinities, IPathKeys} from "../../Data/ICharacterData";
import {IRaceMetadata, ISubraceMetadata} from "../../Hooks/usePreloadedContent/PLC_RaceData";
import RaceSelectorPanel from "../../Components/Sheet/RaceSelectorPanel";

interface IRaceFeatureTabViewInput {

}

const RaceFeatureTabView = ({}: IRaceFeatureTabViewInput) => {

    const {RaceData, isLoaded} = usePreloadedContent()

    const [allRaces, setAllRaces] = useState<Array<IRaceMetadata>>([]);
    const [currentSubraces, setCurrentSubraces] = useState<Array<ISubraceMetadata>>([])

    const [currentRaceMetadata, setCurrentRaceMetadata] = useState<IRaceMetadata|null>()
    const [currentSubraceMetadata, setCurrentSubraceMetadata] = useState<ISubraceMetadata|null>()

    const [tabIndex, setTabIndex] = useState(0);
    const [innerTabIndex, setInnerTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        setInnerTabIndex(0);
        setCurrentRaceMetadata(allRaces[newValue]);
        setCurrentSubraceMetadata(allRaces[newValue].availableSubraces[0])
        setCurrentSubraces(allRaces[newValue].availableSubraces)

    };

    const handleInnerTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setInnerTabIndex(newValue);
        setCurrentSubraceMetadata(currentRaceMetadata?.availableSubraces[newValue])
    }

    useEffect(() => {
        setAllRaces(RaceData.raceMetadata)
        setCurrentRaceMetadata(RaceData.raceMetadata[0])
        setCurrentSubraceMetadata(RaceData.raceMetadata[0].availableSubraces[0])
    }, [isLoaded])

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 9fr"
            }}
        >
            <Box
                sx={{
                    height: "calc(100dvh - 280px)",
                }}
            >
                <Typography variant={"h6"}>Races</Typography>
                <Box
                    sx={{
                        height: "70%",
                        overflowY: "auto",
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                        direction: "rtl"
                    }}
                >
                    <Tabs onChange={handleTabChange} value={tabIndex} orientation={"vertical"} sx={{direction: "ltr"}}>
                        {
                            allRaces.map((clz, index) => {
                                return (
                                    <Tab label={clz.raceName} value={index} key={index}/>
                                )
                            })
                        }
                    </Tabs>
                </Box>
                <Divider sx={{
                    m: 1
                }}/>
                <Typography variant={"h6"}>Variants</Typography>
                <Box
                    sx={{
                        height: "30%",
                        overflowY: "auto",
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                        direction: "rtl"
                    }}
                >
                    <Tabs onChange={handleInnerTabChange} value={innerTabIndex} orientation={"vertical"} sx={{direction: "ltr"}}>
                        {
                            currentSubraces.map((clz, index) => {
                                return (
                                    <Tab label={clz.subraceName} value={index} />
                                )
                            })
                        }
                    </Tabs>
                </Box>
            </Box>
            {
                (currentRaceMetadata && currentSubraceMetadata) ?
                    <RaceSelectorPanel currentRace={currentRaceMetadata} currentSubrace={currentSubraceMetadata} />
                    :
                    <></>
            }

        </Box>
    )
}

export default RaceFeatureTabView