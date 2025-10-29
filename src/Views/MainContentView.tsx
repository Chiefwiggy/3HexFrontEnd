import React from 'react';
import {Badge, Box, Tab, Tabs, Typography} from "@mui/material";
import {Settings, SettingsOutlined} from "@mui/icons-material";
import CustomTabPanel from "../Utils/CustomTabPanel";
import AbilityTab from "../Components/MainTabs/AbilityTab";
import EquipmentTab from "../Components/MainTabs/EquipmentTab";
import ConsumableTab from "../Components/MainTabs/ConsumableTab";
import BattalionTab from "../Components/MainTabs/BattalionTab";
import SkillsTab from "../Components/MainTabs/SkillsTab";
import DowntimeTab from "../Components/MainTabs/DowntimeTab";
import SettingsTab from "../Components/MainTabs/SettingsTab";
import ArmorTab from "../Components/MainTabs/ArmorTab";
import SourcesTab from "../Components/MainTabs/SourcesTab";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import MountTab from "../Components/MainTabs/MountTab";
import ConsumableTab_New from "../Components/MainTabs/ConsumableTab_New";
import ChipsetTab from "../Components/MainTabs/ChipsetTab";

const MainContentView = () => {

    const {currentSheet} = useCharacter();

    const [currentTab, setCurrentTab] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return currentSheet ? (
        <Box
            sx={{
                padding: 3
            }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    overflowX: "hidden"
                }}
            >
                <Tabs value={currentTab} onChange={handleTabChange} variant={"scrollable"}>
                    <Tab label={
                        <Badge invisible={currentSheet.getSkillPointsUsed() === currentSheet.getMaxSkillPoints()} color={"secondary"} variant={"dot"} sx={{
                            paddingRight: "5px"
                        }}>
                            <Typography variant={"body2"}>Skills</Typography>
                        </Badge>
                    } value={0} />
                    <Tab label={
                        <Badge invisible={currentSheet.getDowntimeRanks() === currentSheet.data.downtimeData.reduce((pv, cv) => {
                            return pv + cv.proficiency;
                        }, 0)} color={"secondary"} variant={"dot"} sx={{
                            paddingRight: "5px"
                        }}>
                            <Typography variant={"body2"}>Downtime</Typography>
                        </Badge>
                    } value={1} />
                    <Tab label={"Abilities"} value={2} />
                    <Tab label={"Equipment"} value={3} />
                    <Tab label={"Sources"} value={4} />
                    <Tab label={"Chipset"} value={5} />
                    <Tab label={"Consumables"} value={6} />
                    <Tab label={"Battalion"} value={7} />
                    <Tab label={"Mounts"} value={8} />
                </Tabs>
            </Box>
            <CustomTabPanel index={currentTab} value={0}> <SkillsTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={1}> <DowntimeTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={2}>  <AbilityTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={3}> <EquipmentTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={4}> <SourcesTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={5}> <ChipsetTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={6}> <ConsumableTab_New /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={7}> <BattalionTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={8}><MountTab /></CustomTabPanel>

        </Box>
    ) : <></>

}

export default MainContentView