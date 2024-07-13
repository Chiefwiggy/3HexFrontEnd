import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {IClassChoiceData, IClassMetaData} from "../Data/IClassMetaData";
import CompendiumClassElement from "../Components/Compendium/CompendiumClassElement";
import {useLocation, useSearchParams} from "react-router-dom";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent"
interface IClassCompendiumPageInput {

}

const ClassCompendiumPage = ({}: IClassCompendiumPageInput) => {

    const {ClassData, isLoaded} = usePreloadedContent();


    useEffect(() => {
        setClassData(ClassData.getClassesData());
    }, [isLoaded]);

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
            <Box
                sx={{
                    padding: "12px"
                }}
            >
                <CompendiumClassElement data={classData[currentTabValue]}/>
            </Box>

        </Box>
    ) : <></>
}

export default ClassCompendiumPage