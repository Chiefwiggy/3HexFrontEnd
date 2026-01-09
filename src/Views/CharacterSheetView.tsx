import React, {useEffect, useState} from 'react';
import {
    Badge,
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton,
    Typography,
    useMediaQuery
} from "@mui/material";
import {ICalculatedSpell, ICalculatedWeapon} from "../Data/ICharacterData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import AttributeView from "./AttributeView";
import StatView from "./StatView";
import DefensesView from "./DefensesView";
import PrebuiltSpellCardWrapper from "../Components/CardBuilder/PrebuiltSpellCardWrapper";
import PrebuiltWeaponCardWrapper from "../Components/CardBuilder/PrebuiltWeaponCardWrapper";
import MainContentView from "./MainContentView";
import {
    AddCircleOutlined, AddCircleSharp, AddCircleTwoTone, BedOutlined, BedtimeOutlined,
    CancelOutlined,
    ModeEditOutlined,
    RemoveCircleOutlined, RemoveCircleSharp, RemoveCircleTwoTone,
    SaveOutlined
} from "@mui/icons-material";
import PreparedSpellsPanel from "../Components/CardBuilder/PreparedSpellsPanel";
import AddSubtractPanel from '../Components/Generic/AddSubtractPanel';
import {getClassesString} from "../Utils/Shorthand";
import NumberSpinner from "../Utils/NumberSpinner";

const CharacterSheetView = () => {
    const {
        currentSheet,
        charPing,
        isInEditMode,
        setEditMode,
        savePing,
        invokeSave,
        cancelPing,
        invokeCancel
    } = useCharacter();

    const isSmallScreen = true;

    const [classesLine, setClassesLine] = useState(currentSheet ? getClassesString(currentSheet.data.classes) : "")


    const handleEditClick = (doEdit: boolean) => (event: React.MouseEvent) => {
        if (currentSheet) {
            setEditMode(doEdit);
            if (!doEdit) {
                invokeCancel();
            } else {
                currentSheet.EnterEditMode();
            }
        }
    }

    const handleFullHeal = async() => {
        if (currentSheet) {
            await currentSheet.rest();
        }
    }

    const [saveDialog, setSaveDialog] = useState<boolean>(false);

    const handleSaveDialog = (isOpen: boolean) => (event: React.MouseEvent) => {
        setSaveDialog(isOpen);
    }

    const handleDialogResult = (doSave: boolean) => async (event: React.MouseEvent) => {
        setSaveDialog(false);
        setEditMode(false);
        if (currentSheet) {
            if (doSave) {
                invokeSave(!savePing);
                currentSheet.data.characterLevel = currentLevel
                await currentSheet.SaveCharacterSheet();
            } else {
                invokeCancel();
            }
        }
    }

    const [currentLevel, setCurrentLevel] = useState<number>(0);

    useEffect(() => {
        if (currentSheet) {
            setCurrentLevel(currentSheet.data.characterLevel);
        }
    }, []);

    useEffect(() => {
        if (currentSheet) {
            setCurrentLevel(currentSheet.data.characterLevel);
        }
    }, [cancelPing]);

    const handleChangeLevel = (value: number | null) => {
        if (value != null && currentSheet) {
            setCurrentLevel(value)
            currentSheet.data.characterLevel = currentLevel
        }

    }
    return currentSheet ? (
        <Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr"
                }}
            >
                <Box></Box>
                <Box>
                    <IconButton
                        onClick={handleFullHeal}
                    >
                        <BedOutlined sx={{fontSize: 20}} />
                    </IconButton>
                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                        <Typography variant={"h4"} textAlign={"center"}>{currentSheet.data.characterName}</Typography>
                        {
                            isInEditMode ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 2
                                    }}
                                >

                                    <NumberSpinner
                                        min={0}
                                        max={200}
                                        size={"small"}
                                        value={currentLevel}
                                        onValueChange={handleChangeLevel}
                                        preText={"Level"}
                                        postText={classesLine}
                                    />

                                </Box>
                                :
                                <Typography variant={"subtitle2"}
                                            textAlign={"center"}>Level {currentLevel} - {classesLine}
                                </Typography>
                        }

                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: 2,
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: 2
                        }}
                    >
                        {
                            !isInEditMode ?
                                <IconButton
                                    onClick={handleEditClick(true)}
                                >
                                    <Badge invisible={currentSheet.getTotalStatPoints(currentLevel) - currentSheet.getTotalStatPointsUsed() == 0} color={currentSheet.getTotalStatPoints(currentLevel) - currentSheet.getTotalStatPointsUsed() > 0 ? "secondary" : "error"} variant={"dot"} sx={{
                                        paddingRight: "5px"
                                    }}>
                                        <ModeEditOutlined sx={{fontSize: 20}}/>
                                    </Badge>

                                </IconButton>
                                :
                                <>
                                    <IconButton
                                        onClick={handleSaveDialog(true)}
                                    >
                                        <SaveOutlined sx={{fontSize: 20}}/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleEditClick(false)}
                                    >
                                        <CancelOutlined sx={{fontSize: 20}}/>
                                    </IconButton>
                                </>

                        }

                    </Box>
                    <Box></Box>
                </Box>

            </Box>


            <StatView pivot={isSmallScreen} currentLevel={currentLevel} />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "1fr 2fr"
                }}
            >
                <DefensesView/>
                <AttributeView pivot={isSmallScreen}/>
            </Box>
            <br/>
            <Divider/>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "1fr 2fr",
                    paddingTop: 2
                }}
            >
                <PreparedSpellsPanel/>

                <MainContentView/>
            </Box>
            <Dialog open={saveDialog} onClose={handleSaveDialog(false)}>
                <DialogTitle>{"Would you like to save?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your changes will be saved if you press "Yes".
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogResult(false)} color="error">
                        No
                    </Button>
                    <Button onClick={handleDialogResult(true)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    ) : <></>
};

export default CharacterSheetView;
