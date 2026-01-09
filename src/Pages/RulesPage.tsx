import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import GettingStartedPage from "./Rules/GettingStartedPage";
import ActionsPage from "./Rules/ActionsPage";

interface IRulesPageInput {}

const RulesPage = ({}: IRulesPageInput) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Left column - vertical tabs */}
            <Paper
                elevation={1}
                sx={{
                    width: 200,
                    height: "calc(100vh - 64px)",
                    position: "sticky",
                    top: 64,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h5" sx={{ p: 1, textAlign: "center" }}>
                    Rules
                </Typography>

                <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                    variant="scrollable"
                >
                    <Tab label="Getting Started" />
                    <Tab label="Actions" />
                    <Tab label="Technomagic" />
                </Tabs>
            </Paper>

            {/* Right column - scrollable content */}
            <Box
                sx={{
                    flex: 1,
                    height: "100%",
                    overflowY: "auto",
                    padding: 2,
                }}
            >
                {selectedTab === 0 && <GettingStartedPage />}
                {selectedTab === 1 && <ActionsPage />}
                {selectedTab === 2 && <Typography>Technomagic content</Typography>}
            </Box>
        </Box>
    );
};

export default RulesPage;
