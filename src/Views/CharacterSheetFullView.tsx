import React, {useState} from 'react'
import {Box, Button, Drawer, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import CharacterSheetView from "./CharacterSheetView";
import CharacterSelectView from "./CharacterSelectView";
import {Helmet} from 'react-helmet'
import {
    ArrowBackIosNewOutlined,
    AutoFixHighOutlined,
    AutoFixNormalOutlined, BackpackOutlined,
    ChatOutlined,
    EditNoteOutlined,
    EngineeringOutlined,
    FlareOutlined,
    LocalDiningOutlined, LooksTwoOutlined,
    MilitaryTechOutlined,
    ModeEditOutlined,
    SdCardOutlined, SettingsOutlined,
    TokenOutlined,
    ViewCarousel,
    ViewCarouselOutlined
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
import IconButtonWithTooltip from "../Components/Generic/IconButtonWithTooltip";
import ConditionsPanelView from "./ConditionsPanelView";
import BackpackView from "./BackpackView";
import SettingsPanel from "./SettingsPanel";
import CharacterSheetSidebar from "../Components/Character Sheet/CharacterSheetSidebar";
import RaceSelectView from "./RaceSelectView";
import {GiAxeSword, GiDaggers, GiDwarfFace, GiSave} from "react-icons/gi";
import {IoMan} from "react-icons/io5";
import SavedCardsView from "./SavedCardsView";
import {FaDice} from "react-icons/fa6";
import RollDiceView from "./RollDiceView";
import SubtypeDamageIcon from '../Components/SmallComponents/SubtypeDamageIcon';

const CharacterSheetFullView = () => {

    const [spellPanelOpen, setSpellPanelOpen] = useState<boolean>(false);
    const [eventPanelOpen, setEventPanelOpen] = useState<boolean>(false);
    const [notesPanelOpen, setNotesPanelOpen] = useState<boolean>(false);
    const [weaponsPanelOpen, setWeaponsPanelOpen] = useState<boolean>(false);
    const [offhandWeaponsPanelOpen, setOffhandWeaponsPanelOpen] = useState<boolean>(false);
    const [cardsPanelOpen, setCardsPanelOpen] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [classSelectOpen, setClassSelectOpen] = useState<boolean>(false);
    const [commanderPanelOpen, setCommanderPanelOpen] = useState<boolean>(false);
    const [effectPanelOpen, setEffectPanelOpen] = useState<boolean>(false);
    const [backpackPanelOpen, setBackpackPanelOpen] = useState<boolean>(false);
    const [settingsPanelOpen, setSettingsPanelOpen] = useState<boolean>(false);

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

    const handleOffhandWeaponsPanel = (open: boolean) => (event: React.MouseEvent) => {
        setOffhandWeaponsPanelOpen(open);
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

    const handleConditionsPanel = (open: boolean) => (event: React.MouseEvent) => {
        setEffectPanelOpen(open);
    }

    const handleBackpackPanel = (open: boolean) => (event: React.MouseEvent) => {
        setBackpackPanelOpen(open);
    }

    const handleSettingsPanel = (open: boolean) => (event: React.MouseEvent) => {
        setSettingsPanelOpen(open);
    }

    const {currentSheet, SetCurrentSheet, isReady} = useCharacter();

    const navigate = useNavigate();

    const handleGoBack = () => {
        SetCurrentSheet(undefined);
        navigate("/character_select")
    }


    return isReady && currentSheet ? (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                height: "calc(100vh - 64px)"
            }}
        >
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>{currentSheet.data.characterName} - Ursura</title>
            </Helmet>
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
                <CharacterSheetSidebar title={"Roll Dice"} icon={FaDice} panelComponent={RollDiceView} />
                <CharacterSheetSidebar title={"Prepare Cards"} icon={ViewCarouselOutlined} panelComponent={CardPreparationView} />
                <CharacterSheetSidebar title={"Create Spells"} icon={AutoFixHighOutlined} panelComponent={SpellCardBuilderView} />
                <CharacterSheetSidebar title={"Create Attacks"} icon={GiAxeSword} panelComponent={WeaponCardBuilderView} />
                <CharacterSheetSidebar title={"Create Offhand Attacks"} icon={GiDaggers} panelComponent={WeaponCardBuilderView}  doShow={currentSheet.canDualWield()} isOffhand={true}/>
                <CharacterSheetSidebar title={"Saved Cards"} icon={GiSave} panelComponent={SavedCardsView} />
                <CharacterSheetSidebar title={"Prepare Commander Cards"} icon={MilitaryTechOutlined} panelComponent={CommanderCardPrepView} />
                <CharacterSheetSidebar title={"Conditions"} icon={FlareOutlined} panelComponent={ConditionsPanelView} />
                <CharacterSheetSidebar title={"Backpack"} icon={BackpackOutlined} panelComponent={BackpackView} />
                <CharacterSheetSidebar title={"Classes & Affinities"} icon={EngineeringOutlined} panelComponent={ClassSelectView} />
                <CharacterSheetSidebar title={"Race & Build"} icon={IoMan} panelComponent={RaceSelectView}/>
                <CharacterSheetSidebar title={"Event Log"} icon={ChatOutlined} panelComponent={EventLogView} />
                <CharacterSheetSidebar title={"Settings"} icon={SettingsOutlined} panelComponent={SettingsPanel} />




            </Box>
        </Box>

    ) : <></>
}

export default CharacterSheetFullView;