import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, IconButton, Paper, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAffinities, IClassData} from "../../Data/ICharacterData";
import SelectAffinitiesDialog from "./SelectAffinitiesDialog";
import {OpenInNewOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

    const handleNavigateToClass = (event: React.MouseEvent) => {
        window.open(`/compendium/classes?class=${classData.className.toLowerCase()}`, "_blank");
    }


    const handleButton = (doPick: boolean, cancel=false, affinityData: IAffinities = {
        focus: 0,
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
                    {classData.className}{equipData?.isPromoted ? "+" : ""}
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
            <SelectAffinitiesDialog choiceName={classData.className} choiceData={isPrestige ? classData.choices.prestigeChoice : classData.choices.baseChoice} open={isDialogOpen} sendClose={handleButton} existingData={equipData?.affinities}/>
        </Paper>
    ) : <></>
}

export default ClassPreview