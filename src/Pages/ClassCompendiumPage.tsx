import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Typography} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {IClassChoiceData, IClassMetaData} from "../Data/IClassMetaData";
import CompendiumClassElement from "../Components/Compendium/CompendiumClassElement";
import {useLocation, useSearchParams} from "react-router-dom";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent"
import {getTierFromName} from "../Utils/Shorthand";

interface IClassCompendiumPageInput {

}

const ClassCompendiumPage = ({}: IClassCompendiumPageInput) => {

    const {ClassData, isLoaded} = usePreloadedContent();

    const [tier, setTier] = useState('beginner');

    const handleChange = (event: SelectChangeEvent) => {
        setTier(event.target.value);
    };


    useEffect(() => {
        setClassData(ClassData.getClassesData(getTierFromName(tier)));
    }, [isLoaded, tier]);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabValue(newValue);
        setSearchParams({
            class: classData[newValue].className.toLowerCase()
        });
    }

    const [currentTabValue, setCurrentTabValue] = useState<number>(0);

    const [classData, setClassData] = useState<Array<IClassMetaData>>([]);

    useEffect(() => {
        if (classData.length > 0) {
            const className = searchParams.get("class") ?? undefined;
            if (className) {
                const index = classData.findIndex(e => e.className.toLowerCase() == className);
                setCurrentTabValue(index);
            }
        }
    }, [classData, searchParams]);

    return classData.length > 0 ? (
        <Box>
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
                                classData.map(datum => {
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
                    <CompendiumClassElement data={classData[currentTabValue]}/>
                </Box>

            </Box>
        </Box>

    ) :
        <Box>
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
                    </Box>
                </Box>

                <Box
                    sx={{
                        padding: "12px"
                    }}
                >
                </Box>

            </Box>
        </Box>
}

export default ClassCompendiumPage