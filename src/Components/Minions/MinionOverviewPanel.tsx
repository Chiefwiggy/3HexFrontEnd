import React, {ChangeEvent, useEffect, useState} from 'react';
import {Alert, Box, Button, Switch, Typography} from "@mui/material";
import MinionSimplePanel from "./MinionSimplePanel";
import MinionSheet from "../../Data/MinionSheet";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IMinionOverviewPanelInput {
    currentMinions: Array<MinionSheet>,
    displayMinions: Array<MinionSheet>
}

const MinionOverviewPanel = ({currentMinions, displayMinions}: IMinionOverviewPanelInput) => {

    const [hasBeenEdited, setHasBeenEdited] = useState(false);

    const [localPing, setLocalPing] = useState(false);

    const {currentSheet, healthPing} = useCharacter();

    const [currentPrep, setCurrentPrep] = useState(0)
    const [currentIndices, setCurrentIndices] = useState<Array<boolean>>([]);

    const [showStatus, setShowStatus] = useState(false);

    const [retrigger, setRetrigger] = useState(false);

    const [displayUnpreparedMinions, setDisplayUnpreparedMinions] = useState<boolean>(true);


    useEffect(() => {
        setCurrentPrep(currentMinions.reduce((pv, min) => pv + (min.isPrepared ? 1 : 0), 0));
        setCurrentIndices(currentMinions.map(e => e.isPrepared))
    }, [currentMinions]);

    const handleDisplayUnpreparedMinionsCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayUnpreparedMinions(event.target.checked);
    }

    useEffect(() => {
        setRetrigger(!retrigger);
    }, [healthPing]);

    const handleCheckboxChange = (minionIndex: number, delta: number) => (event: ChangeEvent) => {
        setHasBeenEdited(true);
        setCurrentPrep(currentPrep + delta);
        setCurrentIndices(prevState => {
            prevState[minionIndex] = delta == 1;
            return prevState;
        })
    }

    const handleCancel = () => {
        setHasBeenEdited(false);
        setLocalPing(!localPing);
    }

    const handleSave = async() => {
        setHasBeenEdited(false);
        setShowStatus(true);
        setTimeout(() => {
            setShowStatus(false);
        }, 2000);
        currentMinions.forEach((minion, index) => {
            minion.isPrepared = currentIndices[index];
        })
        if (currentSheet) {
            await currentSheet.InvokeUpdateMinionPreparation();
        }
    }

    return currentSheet ? (
        <Box
            sx={{
                padding: "12px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Typography>Minion Slots: {currentPrep} / {currentSheet.getCumulativeCommanderCard().minionSlots}</Typography>
                    <Typography>Show Unprepared?</Typography>
                    <Switch checked={displayUnpreparedMinions} onChange={handleDisplayUnpreparedMinionsCheckbox} />
                </Box>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >

                    <Alert severity="success" sx={{
                        transition: 'opacity 1s ease-out',
                        opacity: showStatus ? 1 : 0
                    }}> Success! </Alert>
                    <Button disabled={!hasBeenEdited} onClick={handleCancel}>Cancel</Button>
                    <Button disabled={!hasBeenEdited} onClick={handleSave}>Save</Button>
                </Box>

            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)"
                }}
            >
                {
                    (displayUnpreparedMinions ? currentMinions : displayMinions).map((minion, index) => {
                        return (
                            <MinionSimplePanel key={minion.data._id} minionData={minion} minionIndex={index} cancelPing={localPing} changeCallback={handleCheckboxChange}/>
                        )
                    })
                }
            </Box>
        </Box>
    ) : <></>
}

export default MinionOverviewPanel