import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Typography} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {IClassChoiceData, IClassMetaData, IClassServerOutput} from "../Data/IClassMetaData";
import CompendiumClassElement from "../Components/Compendium/CompendiumClassElement";
import {useLocation, useSearchParams} from "react-router-dom";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent"
import {getNameFromTier, getTierFromName} from "../Utils/Shorthand";
import {Helmet} from "react-helmet";

interface IClassCompendiumPageInput {

}

const ClassCompendiumPage = ({}: IClassCompendiumPageInput) => {

    const {ClassData, isLoaded} = usePreloadedContent();

    const [tier, setTier] = useState<string>('beginner');

    const handleChange = (event: SelectChangeEvent) => {
        setTier(event.target.value);
        setCurrentTabValue(0);
        setSearchParams({
            class: classData[getTierFromName(event.target.value)-1][0].className.toLowerCase()
        });
    };

    useEffect(() => {
        const newCD = ClassData.getAllClassesByTier();
        setClassData(newCD);
    }, [isLoaded]);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleTabChange = (event: any, newValue: number) => {
        setCurrentTabValue(newValue);
        setSearchParams({
            class: classData[getTierFromName(tier)-1][newValue].className.toLowerCase()
        });
    }



    const [currentTabValue, setCurrentTabValue] = useState<number>(0);

    const [classData, setClassData] = useState<Array<Array<IClassMetaData>>>([]);

    useEffect(() => {
        if (classData.length > 0) {
            const className = searchParams.get("class") ?? undefined;
            if (className) {
                const ctier = classData.flatMap(e => e).find(e => e.className.toLowerCase() == className)?.classTier;
                if (ctier) {
                    setTier(getNameFromTier(ctier));
                    const index = classData[ctier-1].findIndex(e => e.className.toLowerCase() == className);
                    if (index) {
                        setCurrentTabValue(index);
                    }
                }
            }
        }
    }, [classData, searchParams]);

    return classData.length > 0 ?  (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Class Guide - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 9fr"
                }}
            >
                <Box>
                    <Box
                        sx={{
                            padding: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "center",
                            alignItems: "flex-end"
                        }}
                    >
                        <FormControl fullWidth variant="outlined" sx={{width: "140px"}}>
                            <InputLabel id="tier-select-label">Tier</InputLabel>
                            <Select
                                labelId="tier-select-label"
                                id="tier-select"
                                value={tier}
                                onChange={handleChange}
                                label="Tier"
                                fullWidth
                            >
                                <MenuItem value="beginner">Beginner</MenuItem>
                                <MenuItem value="intermediate">Intermediate</MenuItem>
                                <MenuItem value="advanced">Advanced</MenuItem>
                                <MenuItem value="expert">Expert</MenuItem>
                                <MenuItem value="master">Master</MenuItem>
                                <MenuItem value="legend">Legend</MenuItem>
                            </Select>
                        </FormControl>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={currentTabValue}
                            onChange={handleTabChange}
                            aria-label="Vertical tabs example"
                        >
                            {
                                classData[getTierFromName(tier)-1].map(datum => {
                                    return (
                                        <Tab
                                            label={datum.className}
                                            key={datum.className}
                                        />
                                    )
                                })
                            }
                        </Tabs>
                    </Box>
                </Box>

                <Box
                    sx={{
                        padding: "12px"
                    }}
                >
                    <CompendiumClassElement data={classData[getTierFromName(tier)-1][currentTabValue]}/>
                </Box>

            </Box>
        </Box>

    ) : <></>
}

export default ClassCompendiumPage