import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Typography} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {IClassChoiceData, IClassMetaData, IClassServerOutput} from "../Data/IClassMetaData";
import CompendiumClassElement from "../Components/Compendium/CompendiumClassElement";
import {useLocation, useSearchParams} from "react-router-dom";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent"
import {getNameFromClassTier, getTierFromName} from "../Utils/Shorthand";
import {Helmet} from "react-helmet";
import ArchetypesFeatureTabView from "../Views/FeaturesTabs/ArchetypesFeatureTabView";

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
                    setTier(getNameFromClassTier(ctier));
                    const index = classData[ctier-1].sort((a, b) => a.className.localeCompare(b.className)).findIndex(e => e.className.toLowerCase() == className);
                    if (index) {
                        setCurrentTabValue(index);
                    }
                }
            }
        }
    }, [classData, searchParams]);

    return classData.length > 0 ?  (
        <Box
            sx={{
                padding: "12px"
            }}
        >
            {/*<CompendiumClassElement data={classData[getTierFromName(tier)-1][currentTabValue]}/>*/}
            <ArchetypesFeatureTabView isCompendium={true} myClasses={[]} classDispatch={null} />
        </Box>

    ) : <></>
}

export default ClassCompendiumPage