import React, {useState} from 'react';
import {Box, Typography, Tabs, Tab} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import DatachipCompendiumView from "../Components/Chipsets/DatachipCompendiumView";
import PackageCompendiumView from "../Components/Chipsets/PackageCompendiumView";

interface IDatachipCompendiumInput {}

const DatachipCompendium = ({}: IDatachipCompendiumInput) => {


    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    m: 2
                }}
            >
                <Typography variant="h4">Datachips & Packages</Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab label="Datachips" />
                    <Tab label="Packages" />
                </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                    <DatachipCompendiumView />
                )}

                {activeTab === 1 && (
                    <PackageCompendiumView />
                )}
            </Box>
        </Box>
    );
};

export default DatachipCompendium;
