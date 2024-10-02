import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import FatelineTab from '../Components/Fatelines/FatelineTab';
import {IFatelineFullData} from "../Data/IFatelineData";
import {useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet";

interface IFatelinesPageInput {

}

const FatelinesPage = ({

}: IFatelinesPageInput) => {


    const {FatelineData, isLoaded} = usePreloadedContent();

    const [currentFateline, setCurrentFateline] = useState<IFatelineFullData|undefined>(undefined);
    const [tabIndex, setTabIndex] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setCurrentFateline(FatelineData.GetFatelineDataByNumber(0))
    }, [isLoaded]);

    useEffect(() => {
        console.log(currentFateline);
    }, [currentFateline]);

    useEffect(() => {
        const fateName = searchParams.get("fate") ?? undefined;
        if (fateName) {
            const startData = FatelineData.GetFatelineDataById(fateName);
            if (startData) {
                setTabIndex(startData.fatelineNumber);
                setCurrentFateline(startData);
            }
        }
    }, [searchParams, isLoaded]);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        const newData = FatelineData.GetFatelineDataByNumber(value);
        if (newData) {
            setSearchParams({
                fate: newData.fatelineId
            })
        }
        setCurrentFateline(newData);
        setTabIndex(value);

    }

    return isLoaded ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 8fr",

            }}
        >

            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Fatelines - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    minWidth: "160px",
                    maxHeight: "calc(100vh - 64px)"
                }}
            >
                <Tabs onChange={handleTabChange} value={tabIndex} orientation={"vertical"} variant={"scrollable"} sx={{maxHeight: "calc(100vh - 64px)"}}>
                    {
                        FatelineData.GetAllFatelineData().sort((a,b) => a.fatelineNumber - b.fatelineNumber).map(fd => {
                            return (
                                <Tab label={fd.fatelineName} value={fd.fatelineNumber} key={fd.fatelineId}/>
                            )
                        })
                    }
                </Tabs>
            </Box>
            <Box>
                {
                    currentFateline ?
                        <FatelineTab fateline={currentFateline} />
                        :
                        <></>
                }
            </Box>
        </Box>
    ) : <></>
}

export default FatelinesPage