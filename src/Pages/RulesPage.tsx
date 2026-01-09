import React, {useEffect, useRef} from "react";
import {Box, Paper, Tabs, Tab, Typography, Button} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import GettingStartedPage from "./Rules/GettingStartedPage";
import ActionsPage from "./Rules/ActionsPage";
import {FaArrowAltCircleUp} from "react-icons/fa";

interface IRulesPageInput {}

const RULE_TABS = [
    {
        label: "Getting Started",
        page: "getting-started",
        element: <GettingStartedPage />,
    },
    {
        label: "Actions",
        page: "actions",
        element: <ActionsPage />,
    },
    {
        label: "Technomagic",
        page: "technomagic",
        element: <Typography>Technomagic content</Typography>,
    },
] as const;

type RuleTab = typeof RULE_TABS[number];
type RulePage = RuleTab["page"];

const RulesPage = ({}: IRulesPageInput) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get("page") as RulePage | null;

    const selectedTab = Math.max(
        RULE_TABS.findIndex(t => t.page === pageParam),
        0
    );

    const handleBackToTop = () => {
        contentRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const contentRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!pageParam || !RULE_TABS.some(t => t.page === pageParam)) {
            setSearchParams({ page: RULE_TABS[0].page }, { replace: true });
        }
    }, [pageParam, setSearchParams]);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setSearchParams({ page: RULE_TABS[newValue].page });
    };

    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
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
                    variant="scrollable"
                    sx={{ flex: 1 }}
                >
                    {RULE_TABS.map(tab => (
                        <Tab key={tab.page} label={tab.label} />
                    ))}
                </Tabs>
            </Paper>

            {/* Right column - scrollable content */}
            <Box
                sx={{
                    flex: 1,
                    height: "calc(100vh - 64px)",
                    overflowY: "auto",
                    padding: 2,
                    /* Firefox */
                    scrollbarWidth: "thin",
                    scrollbarColor: "#555 #1e1e1e",

                    /* Chromium / WebKit */
                    "&::-webkit-scrollbar": {
                        width: "10px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#1e1e1e",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#555",
                        borderRadius: "6px",
                        border: "2px solid #1e1e1e",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#777",
                    }
                }}
                ref={contentRef}
            >
                {RULE_TABS[selectedTab]?.element}
            </Box>

            {/* Back to Top Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToTop}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    borderRadius: '50%',
                    minWidth: 0,
                    width: 48,
                    height: 48,
                    padding: 0,
                    zIndex: 1000,
                    boxShadow: 3,
                }}
            >
                <FaArrowAltCircleUp />
            </Button>
        </Box>
    );
};

export default RulesPage;
