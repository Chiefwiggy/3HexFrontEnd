import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import FatelinePreviewView from "../../Components/Fatelines/FatelinePreviewView";
import {IFatelineData, IFatelineFullData} from "../../Data/IFatelineData";
import FatelinePageView from "../../Components/Fatelines/FatelinePageView";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {StringAction} from "../../Utils/StringReducer";

interface IFatelinesFeatureTabViewInput {
    myFates: Array<string>,
    fatelineUnlocks: Array<string>,
    invokeMyFates: React.Dispatch<StringAction>,
    invokeFateUnlocks: React.Dispatch<StringAction>,
}

const FatelinesFeatureTabView = ({myFates, fatelineUnlocks, invokeMyFates, invokeFateUnlocks}: IFatelinesFeatureTabViewInput) => {

    const {currentSheet} = useCharacter()
    const {FatelineData, isLoaded} = usePreloadedContent()

    const [onDetailedPage, setOnDetailedPage] = useState<boolean>(false)
    const [currentPageView, setCurrentPageView] = useState<string|null>(null)

    const [allFatelineData, setAllFatelineData] = useState<Array<IFatelineFullData>>()

    useEffect(() => {
        if (currentSheet) {
            const fd = currentSheet.data.fatelineIds
            if (fd.length > 0) {
                setCurrentPageView(fd[0])
                setOnDetailedPage(true)
            }
        }
    }, [])

    useEffect(() => {
        setAllFatelineData(FatelineData.GetAllFatelineData())
    }, [isLoaded]);

    const handleReturnToPreview = (e: React.MouseEvent) => {
        setOnDetailedPage(false)
        setCurrentPageView(null)
    }

    const handleSelectFateline = (fatelineId: string) => {
        setCurrentPageView(fatelineId)
        setOnDetailedPage(true);
    }

    return allFatelineData ? (
        <Box>
            {
                onDetailedPage
                ?
                    <Box>
                        <FatelinePageView invokeBack={handleReturnToPreview} currentFatelineId={currentPageView ?? "automaton"} allFatelineData={allFatelineData as Array<IFatelineFullData>} invokeChange={handleSelectFateline} myFates={myFates} fatelineUnlocks={fatelineUnlocks} invokeFateUnlocks={invokeFateUnlocks} invokeFates={invokeMyFates} />
                    </Box>
                    :
                    <Box>
                        <FatelinePreviewView gotoDetailedView={handleSelectFateline} allFatelineData={allFatelineData as Array<IFatelineFullData>} myFates={myFates}/>
                    </Box>
            }
        </Box>
    ) : <></>
}

export default FatelinesFeatureTabView