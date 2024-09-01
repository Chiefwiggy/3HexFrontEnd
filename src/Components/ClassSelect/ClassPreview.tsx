import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, Paper, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAffinities, IClassData} from "../../Data/ICharacterData";
import SelectAffinitiesDialog from "./SelectAffinitiesDialog";

interface IClassPreviewInput {
    classData: IClassMetaData,
    equipData: IClassData | undefined,
    isEquipped: boolean,
    canEquip: boolean,
    canPromote: boolean,
    sendBack: (doPick: boolean, classData: IClassData) => void
}

const ClassPreview = ({classData, isEquipped, canEquip, sendBack, equipData, canPromote}: IClassPreviewInput) => {

    const {currentSheet} = useCharacter();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const [isPrestige, setIsPrestige] = useState(false);

    const handleEquipClassDialog = (open: boolean, prestige: boolean) => (event: React.MouseEvent) => {
        setIsPrestige(prestige);
        setDialogOpen(open);
    }


    const handleButton = (doPick: boolean, cancel=false, affinityData: IAffinities = {
        hex: 0,
        rune: 0,
        soul: 0,
        deft: 0,
        infantry: 0,
        guardian: 0,
        leadership: 0,
        erudite: 0,
        supply: 0,
        biohacking: 0,
        abjuration: 0,
        machinery: 0
    }) => (event: React.MouseEvent) => {
        setDialogOpen(false);

        if (!cancel) {
                sendBack(doPick, {
                    className: classData.className,
                    classExpertises: classData.classExpertises,
                    downtimeActivities: classData.downtimeActivities,
                    classTier: classData.classTier,
                    affinities: affinityData,
                    isPromoted: isPrestige
                }
            );
        }
    }

    return currentSheet && classData ? (
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
            <Typography
                sx={{
                    textAlign: "center"
                }}
                variant={"h5"}
            >{classData.className}{equipData?.isPromoted ? "+" : ""}</Typography>
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
                                Remove
                            </Button>
                            {
                                !equipData?.isPromoted ?
                                <Button
                                    color={"secondary"}
                                    disabled={!canPromote}
                                    onClick={handleEquipClassDialog(true, true)}
                                >
                                    Promote
                                </Button>
                                :
                                <Button
                                    disabled={true}
                                >
                                    PROMOTED
                                </Button>
                            }
                        </Box>
                    </Box>


                    :
                    <Button
                        disabled={!canEquip}
                        onClick={handleEquipClassDialog(true, false)}
                    >
                        Add
                    </Button>
            }
            <SelectAffinitiesDialog classData={classData} open={isDialogOpen} sendClose={handleButton} isPromotion={isPrestige} existingData={equipData}/>
        </Paper>
    ) : <></>
}

export default ClassPreview