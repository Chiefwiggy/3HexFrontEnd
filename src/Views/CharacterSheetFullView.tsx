import React, {useState} from 'react'
import {Box, Button, Drawer, IconButton, TextField, Typography} from "@mui/material";
import CharacterSheetView from "./CharacterSheetView";
import CharacterSelectView from "./CharacterSelectView";
import {
    ArrowBackIosNewOutlined,
    AutoFixNormalOutlined,
    ChatOutlined,
    EditNoteOutlined, EngineeringOutlined, MilitaryTechOutlined, ModeEditOutlined, SdCardOutlined,
    TokenOutlined
} from "@mui/icons-material";
import CardBuilderView from "./CardBuilderView";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import EventLogView from "./EventLogView";
import CardPreparationView from "./CardPreparationView";
import CardBuilder from "../Layouts/CardBuilder";
import WeaponCardBuilderView from "./WeaponCardBuilderView";
import SpellCardBuilderView from "./SpellCardBuilderView";
import {useNavigate} from "react-router-dom";
import ClassSelectView from './ClassSelectView'
import CommanderCardPrepView from "./CommanderCardPrepView";

const CharacterSheetFullView = () => {

    const [spellPanelOpen, setSpellPanelOpen] = useState<boolean>(false);
    const [eventPanelOpen, setEventPanelOpen] = useState<boolean>(false);
    const [notesPanelOpen, setNotesPanelOpen] = useState<boolean>(false);
    const [weaponsPanelOpen, setWeaponsPanelOpen] = useState<boolean>(false);
    const [cardsPanelOpen, setCardsPanelOpen] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [classSelectOpen, setClassSelectOpen] = useState<boolean>(false);
    const [commanderPanelOpen, setCommanderPanelOpen] = useState<boolean>(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    }

    const handleSpellPanel = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setSpellPanelOpen(open)
    }

    const handleEventPanel = (open: boolean) => (event: React.MouseEvent) => {
        setEventPanelOpen(open);
    }

    const handleNotesPanel = (open: boolean) => (event: React.MouseEvent) => {
        setNotesPanelOpen(open);
    }

    const handleWeaponsPanel = (open: boolean) => (event: React.MouseEvent) => {
        setWeaponsPanelOpen(open);
    }

    const handleCardsPanel = (open: boolean) => (event: React.MouseEvent) => {
        setCardsPanelOpen(open);
    }

    const handleClassSelectPanel = (open: boolean) => (event: React.MouseEvent) => {
        setClassSelectOpen(open);
    }

    const handleCommanderSelectPanel = (open: boolean) => (event: React.MouseEvent) => {
        setCommanderPanelOpen(open);
    }

    const {currentSheet, SetCurrentSheet, isReady} = useCharacter();

    const navigate = useNavigate();

    const handleGoBack = () => {
        SetCurrentSheet(undefined);
        navigate("/")
    }


    return isReady ? (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                height: "calc(100vh - 64px)"
            }}
        >
            <Box>
                <IconButton
                    onClick={handleGoBack}
                >
                    <ArrowBackIosNewOutlined/>
                </IconButton>
                <br />
            </Box>
            <Box
                sx={{
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            marginRight: "52px",
                            padding: "12px",
                            height: "100%"
                        }}
                    >
                        <CharacterSheetView/>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    position: 'fixed', // Use fixed positioning
                    right: 0,
                    top: 64, // Adjust this value to account for any header height if needed
                    backgroundColor: "#232323",
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 1,
                    height: 'calc(100vh - 64px)', // Adjust this value to account for any header height if needed
                    zIndex: 10 // Ensure it's above other content
                }}
            >
                <IconButton onClick={handleCardsPanel(true)}><SdCardOutlined/></IconButton>
                <IconButton onClick={handleSpellPanel(true)}><AutoFixNormalOutlined/></IconButton>
                <IconButton onClick={handleWeaponsPanel(true)}><TokenOutlined/></IconButton>
                <IconButton onClick={handleCommanderSelectPanel(true)}><MilitaryTechOutlined /></IconButton>
                <IconButton onClick={handleEventPanel(true)}><ChatOutlined/></IconButton>
                <IconButton onClick={handleClassSelectPanel(true)}><EngineeringOutlined /></IconButton>
                <IconButton onClick={handleNotesPanel(true)}><EditNoteOutlined/></IconButton>


            </Box>
            <Drawer
                anchor={"right"}
                open={cardsPanelOpen}
                onClose={handleCardsPanel(false)}
            >
                <CardPreparationView closeSelf={handleCardsPanel(false)}/>
            </Drawer>


            <Drawer
                anchor={"right"}
                open={spellPanelOpen}
                onClose={handleSpellPanel(false)}
            >
                {/*<CardBuilderView closeSelf={handleSpellPanel(false)} />*/}
                <SpellCardBuilderView closeSelf={handleSpellPanel(false)}/>
            </Drawer>
            <Drawer
                anchor={"right"}
                open={weaponsPanelOpen}
                onClose={handleWeaponsPanel(false)}
            >
                <WeaponCardBuilderView closeSelf={handleWeaponsPanel(false)}/>
            </Drawer>
            <Drawer
                anchor={"right"}
                open={commanderPanelOpen}
                onClose={handleCommanderSelectPanel(false)}
            >
                <CommanderCardPrepView closeSelf={handleCommanderSelectPanel(false)}/>
            </Drawer>
            <Drawer
                anchor={"right"}
                open={eventPanelOpen}
                onClose={handleEventPanel(false)}
            >
                <EventLogView/>
            </Drawer>
            <Drawer
                anchor={"right"}
                open={classSelectOpen}
                onClose={handleClassSelectPanel(false)}
            >
                <ClassSelectView />
            </Drawer>

            <Drawer
                anchor={"right"}
                open={notesPanelOpen}
                onClose={handleNotesPanel(false)}
            >
                <TextField
                    sx={{
                        width: "90vw",
                        height: "90vh",
                    }}
                    multiline={true}
                    variant={"outlined"}
                    size={"small"}
                    minRows={35}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        padding: "16px"
                    }}
                >
                    <Button
                        variant={"contained"}
                    >Save</Button>
                </Box>
            </Drawer>
        </Box>

    ) : <></>
}

export default CharacterSheetFullView;