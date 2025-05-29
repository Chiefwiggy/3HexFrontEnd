import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, IconButton, Paper, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAffinities, IClassData} from "../../Data/ICharacterData";

import {OpenInNewOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import SelectAffinitiesDialog from '../ClassSelect/SelectAffinitiesDialog';
import {IFatelineData, IFatelineFullData} from "../../Data/IFatelineData";

interface IClassPreviewInput {
    fateData: IFatelineFullData,
    equipData: IFatelineData | undefined,
    isEquipped: boolean,
    canEquip: boolean,
    sendBack: (doPick: boolean, classData: IFatelineData) => void
}

const FatelinePreview = ({fateData, isEquipped, canEquip, sendBack, equipData}: IClassPreviewInput) => {

    const {currentSheet} = useCharacter();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleEquipClassDialog = (open: boolean, reversed: boolean) => (event: React.MouseEvent) => {
        setDialogOpen(open);
        setSendReversed(reversed);
    }

    const [sendReversed, setSendReversed] = useState(false);

    const navigate = useNavigate();

    const handleNavigateToClass = (event: React.MouseEvent) => {
        window.open(`/barracks/fatelines?fate=${fateData.fatelineId}`, "_blank");
    }


    const handleButton = (doPick: boolean, cancel=false, affinityData: IAffinities = {
        nimble: 0,
        infantry: 0,
        guardian: 0,
        focus: 0,
        creation: 0,
        alteration: 0,
        leadership: 0,
        supply: 0,
        summoning: 0,
        swift: 0,
        riding: 0,
        adaptation: 0,
        rune: 0,
        sourcecraft: 0,
        research: 0,
        machinery: 0,
        abjuration: 0,
        biohacking: 0,
    }) => (event: React.MouseEvent) => {
        setDialogOpen(false);

        if (!cancel) {
                sendBack(doPick, {
                    fatelineName: fateData.fatelineName,
                    fatelineId: fateData.fatelineId,
                    affinities: affinityData,
                    isReversed: sendReversed
                }
            );
        }
    }

    return currentSheet && fateData ? (
        <Paper
            elevation={1}
            sx={{
                backgroundColor: "gray",
                padding: "20px",
                margin: '20px',
                borderRadius: "20px",
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center"
                    }}
                    variant={"h5"}
                >
                    {fateData.fatelineName}
                </Typography>
                <IconButton onClick={handleNavigateToClass}><OpenInNewOutlined sx={{fontSize: "14px", marginLeft: "2px"}} /></IconButton>
            </Box>

            <br/>
            {
                isEquipped
                    ?
                    <Box>
                        <Box>
                            {
                                equipData ?
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '6px'
                                        }}
                                    >
                                        {
                                            Object.entries(equipData.affinities)
                                              .filter(([key, value]) => value > 0)
                                              .map(([key, value]) => (
                                                    <Paper key={key} elevation={2} sx={{
                                                        padding: "4px",
                                                        borderRadius: "4px"
                                                    }}>
                                                        <Typography>{capitalize(key)} {value}</Typography>
                                                    </Paper>
                                              ))
                                        }

                                    </Box>
                                    :
                                    <></>
                            }
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "center"
                            }}
                        >
                             <Button
                                onClick={handleButton(false)}
                            >
                                Remove {sendReversed ? "Reversed" : "Upright"}
                            </Button>
                        </Box>
                    </Box>


                    :
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}
                    >
                        <Button
                            disabled={!canEquip}
                            onClick={handleEquipClassDialog(true, false)}
                        >
                            Add Upright
                        </Button>
                        <Button
                            disabled={!canEquip}
                            onClick={handleEquipClassDialog(true, true)}
                        >
                            Add Reversed
                        </Button>
                    </Box>

            }
            <SelectAffinitiesDialog choiceName={fateData.fatelineName} choiceData={sendReversed ? fateData.reversed.affinityChoices : fateData.upright.affinityChoices} open={isDialogOpen} sendClose={handleButton}  existingData={equipData?.affinities}/>
        </Paper>
    ) : <></>
}

export default FatelinePreview