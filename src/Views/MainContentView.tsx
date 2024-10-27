import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
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

const MainContentView = () => {


    const [currentTab, setCurrentTab] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box
            sx={{
                padding: 3
            }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label={"Skills"} value={0} />
                    <Tab label={"Downtime"} value={1} />
                    <Tab label={"Abilities"} value={2} />
                    <Tab label={"Equipment"} value={3} />
                    <Tab label={"Consumables"} value={4} />
                    <Tab label={"Battalion"} value={5} />


                </Tabs>
            </Box>
            <CustomTabPanel index={currentTab} value={0}> <SkillsTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={1}> <DowntimeTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={2}>  <AbilityTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={3}> <EquipmentTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={4}> <ConsumableTab /> </CustomTabPanel>
            <CustomTabPanel index={currentTab} value={5}> <BattalionTab /> </CustomTabPanel>

        </Box>
    )

}

export default MainContentView