import React, {useState} from 'react'
import {Box, Button, Drawer, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import CharacterSheetView from "./CharacterSheetView";
import CharacterSelectView from "./CharacterSelectView";
import {Helmet} from 'react-helmet'
import {
    ArrowBackIosNewOutlined,
    AutoFixHighOutlined,
    AutoFixNormalOutlined, BackpackOutlined,
    ChatOutlined, Diversity3Outlined,
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
import BattalionAssignmentView from "./BattalionAssignmentView";
import {MdMemory} from "react-icons/md";
import HackCardBuilderView from "./HackCardBuilderView";

const CharacterSheetFullView = () => {

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
                <CharacterSheetSidebar title={"Roll Dice"} icon={FaDice} panelComponent={RollDiceView} placement={"top"} darkenBackground={false} />
                <CharacterSheetSidebar title={"Prepare Cards"} icon={ViewCarouselOutlined} panelComponent={CardPreparationView} />
                <CharacterSheetSidebar title={"Create Spells"} icon={AutoFixHighOutlined} panelComponent={SpellCardBuilderView} />
                <CharacterSheetSidebar title={"Create Attacks"} icon={GiAxeSword} panelComponent={WeaponCardBuilderView} />
                <CharacterSheetSidebar title={"Create Offhand Attacks"} icon={GiDaggers} panelComponent={WeaponCardBuilderView}  doShow={currentSheet.canDualWield()} isOffhand={true}/>
                <CharacterSheetSidebar title={"Create Hacks"} icon={MdMemory} panelComponent={HackCardBuilderView} />
                <CharacterSheetSidebar title={"Saved Cards"} icon={GiSave} panelComponent={SavedCardsView} />
                <CharacterSheetSidebar title={"Prepare Commander Cards"} icon={MilitaryTechOutlined} panelComponent={CommanderCardPrepView} />
                {/*<CharacterSheetSidebar title={"Prepare Battalion"} icon={Diversity3Outlined} panelComponent={BattalionAssignmentView} />*/}
                {/*<CharacterSheetSidebar title={"Conditions"} icon={FlareOutlined} panelComponent={ConditionsPanelView} />*/}
                {/*<CharacterSheetSidebar title={"Backpack"} icon={BackpackOutlined} panelComponent={BackpackView} />*/}
                <CharacterSheetSidebar title={"Classes & Affinities"} icon={EngineeringOutlined} panelComponent={ClassSelectView} badgeCondition={
                    currentSheet.getDevelopmentPoints() != currentSheet.data.developmentIds.length
                    ||
                    currentSheet.getClassPointsSpent() != currentSheet.getMaxClassPoints()
                } />
                <CharacterSheetSidebar title={"Race & Build"} icon={IoMan} panelComponent={RaceSelectView} badgeCondition={
                    !(currentSheet.data.race && currentSheet.data.race.subraceId
                        &&
                    currentSheet.data.race.pointsSpentOn.length == currentSheet.getRacialAbilityTokens()
                        &&
                    currentSheet.data.race.customVulnerability)
                }/>
                {/*<CharacterSheetSidebar title={"Event Log"} icon={ChatOutlined} panelComponent={EventLogView} />*/}
                <CharacterSheetSidebar title={"Settings"} icon={SettingsOutlined} panelComponent={SettingsPanel} />




            </Box>
        </Box>

    ) : <></>
}

export default CharacterSheetFullView;