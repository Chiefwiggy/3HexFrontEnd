import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import BannerTitle from "../Generic/BannerTitle";
import {getFatelineNameFromId} from "../../Utils/Shorthand";
import FatelinePreviewCard from "./FatelinePreviewCard";
import {IFatelineFullData} from "../../Data/IFatelineData";
import BannerTitleWithToggle from "../Generic/BannerTitleWithToggle";
import {StringAction} from "../../Utils/StringReducer";
import FatelineBlurb from "./FatelineBlurb";
import FatelineCardsAndAbilities from "./FatelineCardsAndAbilities";

interface IFatelinePageViewInput {
    invokeBack: (e: React.MouseEvent) => void
    currentFatelineId: string,
    allFatelineData: Array<IFatelineFullData>,
    myFates: Array<string>,
    invokeFates: React.Dispatch<StringAction>
    fatelineUnlocks: Array<string>,
    invokeFateUnlocks: React.Dispatch<StringAction>,
    invokeChange: (fatelineId: string) => void
}

const FatelinePageView = ({invokeBack, currentFatelineId, allFatelineData, invokeChange, myFates, invokeFates, fatelineUnlocks, invokeFateUnlocks}: IFatelinePageViewInput) => {


    const [trueId, setTrueId] = useState<string>("automaton")
    const [isReversed, setReversed] = useState<boolean>(false);
    const [fatelineMetadata, setFatelineMetadata] = useState<IFatelineFullData|null|undefined>()

    const [selected, setSelected] = useState<boolean>(myFates.includes(currentFatelineId))
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const handleToggleSelected = () => {
        if (selected) {
            setSelected(false)
            invokeFates({type: "remove", str: currentFatelineId})
        } else {
            setSelected(true)
            invokeFates({type: "add", str: currentFatelineId})
        }
    }


    const initializeData = () => {
        console.log(currentFatelineId);
        if (currentFatelineId) {
            setSelected(myFates.includes(currentFatelineId))
            const reversed = currentFatelineId.endsWith("_reversed")
            const t_trueId = reversed
                ? currentFatelineId.slice(0, -"_reversed".length)
                : currentFatelineId;
            setReversed(reversed)
            setTrueId(t_trueId)
            setButtonDisabled(myFates.includes(t_trueId+(reversed ? "" : "_reversed")))
            const fullData = allFatelineData.find(e => e.fatelineId == t_trueId)
            setFatelineMetadata(fullData)
            console.log(myFates)
        }
    }

    useEffect(() => {
        initializeData()
    }, [currentFatelineId])

    useEffect(() => {
        initializeData()
    }, []);

    return fatelineMetadata ? (
        <Box
            sx={{
                height: "calc(100vh - 132px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "4fr 1fr"
                    }}
                >
                    { /* --- FATELINE CONTENT --- */ }
                    <Box>
                        <BannerTitleWithToggle
                            idTag={currentFatelineId}
                            title={`${getFatelineNameFromId(trueId)}${isReversed ? " - Reversed" : ""}`}
                            bannerColor={"#123456"}
                            toggleValue={selected}
                            invokeToggle={handleToggleSelected}
                            buttonTitleFalse={"Walk Path"}
                            buttonTitleTrue={"Unwalk Path"}
                            disabled={buttonDisabled}
                        >
                            <FatelineBlurb sidedData={isReversed ? fatelineMetadata.reversed : fatelineMetadata.upright}/>
                        </BannerTitleWithToggle>
                    </Box>
                    { /* --- CARD DISPLAY --- */ }
                    <Box>
                        {
                            fatelineMetadata && <FatelinePreviewCard gotoDetailedView={invokeChange} fatelineData={fatelineMetadata} forceReversed={isReversed} fateSelected={selected} uprightSelected={!isReversed} />
                        }
                    </Box>

                </Box>
                <Divider sx={{mt: 2}}/>
                { /* --- CARDS AND ABILITIES --- */ }
                <Box>
                    <FatelineCardsAndAbilities
                        sidedData={isReversed ? fatelineMetadata.reversed : fatelineMetadata.upright}
                        hasFateline={selected}
                        fatelineUnlocks={fatelineUnlocks}
                        invokeFatelineUnlocks={invokeFateUnlocks}
                    />
                </Box>
            </Box>
            <Box>
                <Button onClick={invokeBack}>
                    <ArrowBack />
                    <Typography variant={"body2"}>Back to Fatelines</Typography>
                </Button>
            </Box>

        </Box>
    ) : <></>
}

export default FatelinePageView