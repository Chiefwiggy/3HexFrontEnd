import React, {useEffect, useState} from 'react';
import {
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
    AddCircleOutlined, AddCircleSharp, AddCircleTwoTone,
    CancelOutlined,
    ModeEditOutlined,
    RemoveCircleOutlined, RemoveCircleSharp, RemoveCircleTwoTone,
    SaveOutlined
} from "@mui/icons-material";
import PreparedSpellsPanel from "../Components/CardBuilder/PreparedSpellsPanel";

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

    const handleChangeLevel = (delta: number) => (event: React.MouseEvent) => {
        setCurrentLevel(currentLevel + delta);
        if (currentSheet) {
            currentSheet.data.characterLevel = currentLevel + delta;
        }
    }

    return currentSheet ? (
        <Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "3fr 2fr 2fr 1fr"
                }}
            >
                <Box></Box>


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
                                    <IconButton
                                        onClick={handleChangeLevel(-10)}
                                        disabled={currentLevel < 10}
                                    >
                                        <RemoveCircleTwoTone/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleChangeLevel(-1)}
                                        disabled={currentLevel < 1}
                                    >
                                        <RemoveCircleOutlined/>
                                    </IconButton>
                                    <Typography variant={"subtitle2"}
                                                textAlign={"center"}>Level {currentLevel} - {currentSheet.getClassesString()}
                                    </Typography>
                                    <IconButton
                                        onClick={handleChangeLevel(1)}
                                        disabled={currentLevel >= 325}
                                    >
                                        <AddCircleOutlined/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleChangeLevel(10)}
                                        disabled={currentLevel >= 315}
                                    >
                                        <AddCircleTwoTone />
                                    </IconButton>
                                </Box>
                                :
                                <Typography variant={"subtitle2"}
                                            textAlign={"center"}>Level {currentLevel} - {currentSheet.getClassesString()}
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
                                    <ModeEditOutlined sx={{fontSize: 20}}/>
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


            <StatView pivot={isSmallScreen}/>
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

    // return currentSheet ? (
    //     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //         <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
    //             <Typography variant={"h3"}>{currentSheet.data.characterName}</Typography>
    //         </Box>
    //         <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
    //             <Box sx={{ display: 'flex' }}>
    //                 <StatView />
    //                 <AttributeView />
    //                 <DefensesView />
    //             </Box>
    //             <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: '100%' }}>
    //                 <Box sx={{ width: isSmallScreen ? '100%' : '70%' }}>
    //                     <MainContentView />
    //                 </Box>
    //                 <Box sx={{ paddingRight: isSmallScreen ? '0' : '96px', paddingTop: isSmallScreen ? '16px' : '0', width: isSmallScreen ? '100%' : '30%' }}>
    //                     <Typography variant={"h4"} textAlign={"center"}>Equipped Cards</Typography>
    //                     <br />
    //                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                         <PrebuiltSpellCardWrapper spellData={currentSpell} />
    //                         <br />
    //                         <PrebuiltWeaponCardWrapper weaponData={currentWeapon} />
    //                     </Box>
    //                 </Box>
    //             </Box>
    //         </Box>
    //     </Box>
    // ) : <></>;
};

export default CharacterSheetView;
