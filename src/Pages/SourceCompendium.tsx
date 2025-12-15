import React, { useState, useMemo } from 'react';
import { Box, Tabs, Tab, Chip, Stack } from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import SourceComponent from '../Components/Sources/SourceComponent';
import { Helmet } from "react-helmet";
import useUser from "../Hooks/useUser/useUser";

type CampaignId =
    | "all"
    | "nature"
    | "elkarand"
    | "principego";

type Arcanotype =
    | "elemental"
    | "divine"
    | "primal"
    | "axum"
    | "mystic"
    | "animus"
    | "eonic"
    | "esoteric";

const ARCANOTYPE_OPTIONS: Arcanotype[] = [
    "elemental",
    "divine",
    "primal",
    "axum",
    "mystic",
    "animus",
    "eonic",
    "esoteric"
];

const SourceCompendium = () => {
    const { SourceData } = usePreloadedContent();
    const { userPermissions } = useUser();

    const [selectedCampaign, setSelectedCampaign] =
        useState<CampaignId>("all");

    const [selectedArcanotypes, setSelectedArcanotypes] =
        useState<Arcanotype[]>([]);

    /** Campaign-filtered sources (authoritative) */
    const campaignFilteredSources = SourceData.GetSourceDataForUser(
        userPermissions,
        "all",
        selectedCampaign === "all" ? ["all"] : [selectedCampaign]
    );

    /** Toggle arcanotype selection */
    const toggleArcanotype = (type: Arcanotype) => {
        setSelectedArcanotypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    /** Final visible sources */
    const visibleSources = useMemo(() => {
        if (selectedArcanotypes.length === 0) {
            return campaignFilteredSources;
        }

        return campaignFilteredSources.filter(source =>
            selectedArcanotypes.includes(source.sourceArcanotype as Arcanotype)
        );
    }, [campaignFilteredSources, selectedArcanotypes]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sources - Ursura</title>
            </Helmet>

            {/* Campaign Tabs */}
            <Tabs
                value={selectedCampaign}
                onChange={(_, value: CampaignId) => setSelectedCampaign(value)}
                centered
                sx={{ mb: 1 }}
            >
                <Tab value="all" label="All" />
                <Tab value="nature" label="Nature" />
                <Tab value="elkarand" label="Elkarand" />
                <Tab value="principego" label="Principego" />
            </Tabs>

            {/* Arcanotype Multi-Select */}
            <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent={"center"}
                sx={{ mb: 2 }}
            >
                {ARCANOTYPE_OPTIONS.map(type => (
                    <Chip
                        key={type}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                        clickable
                        color={
                            selectedArcanotypes.includes(type)
                                ? "primary"
                                : "default"
                        }
                        onClick={() => toggleArcanotype(type)}
                    />
                ))}
            </Stack>

            {/* Source Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns:
                        "repeat(auto-fill, max(532px, calc(33.3vw - 20px)))",
                    gap: "10px"
                }}
            >
                {visibleSources.map(source => (
                    <Box key={source._id}>
                        <SourceComponent sourceData={source} />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default SourceCompendium;
