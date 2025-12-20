import React, { useState } from "react";
import {
    Box,
    Card,
    Divider,
    Typography
} from "@mui/material";
import { ISourceData } from "../../Data/ISourceData";
import SpellBaseCard from "../Cards/SpellBaseCard";
import SpellModifierCard from "../Cards/SpellModifierCard";
import WeaponModCard from "../Cards/WeaponModCard";
import SourceList from "./SourceList";
import { ISpellBaseCardData, ISpellModifierCardData, IWeaponCommonData } from "../../Data/ICardData";

interface IUnmadeSourceComponentInput {
    sourceData: ISourceData;
}

const UnmadeSourceComponent = ({ sourceData }: IUnmadeSourceComponentInput) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSetIndex = (newIndex: number) => () => setCurrentIndex(newIndex);

    const currentTier = sourceData.sourceTiers[currentIndex];

    return (
        <Card elevation={2} sx={{ padding: "12px", margin: "12px" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                {sourceData.sourceName || "Untitled Source"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "lightgrey", textAlign: "center" }}>
                {sourceData.sourceArcanotype?.toUpperCase() || "UNKNOWN"}
            </Typography>
            <Divider sx={{ margin: "12px 0" }} />

            {sourceData.sourceTiers.length > 0 ? (
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
                    <Box>
                        <SourceList
                            sourceData={sourceData}
                            handleSetIndex={handleSetIndex}
                            currentIndex={currentIndex}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {currentTier?.cardType === "base" && currentTier.cardData ? (
                            <SpellBaseCard
                                cardData={currentTier.cardData as ISpellBaseCardData}
                                sendBack={() => {}}
                                canFavorite={false}
                                isExpanded={true}
                                canToggleExpand={false}
                                showAdd={false}
                            />
                        ) : currentTier?.cardType === "edict" && currentTier.cardData ? (
                            <SpellModifierCard
                                cardData={currentTier.cardData as ISpellModifierCardData}
                                sendBack={() => {}}
                                canFavorite={false}
                                isExpanded={true}
                                canToggleExpand={false}
                                showAdd={false}
                            />
                        ) : currentTier?.cardType === "order" && currentTier.cardData ? (
                            <WeaponModCard
                                cardData={currentTier.cardData as IWeaponCommonData}
                                sendBack={() => {}}
                                canFavorite={false}
                                isExpanded={true}
                                canToggleExpand={false}
                                showAdd={false}
                            />
                        ) : (
                            <Typography variant="body2" sx={{ color: "gray" }}>
                                No card selected
                            </Typography>
                        )}
                    </Box>
                </Box>
            ) : (
                <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
                    No layers added yet
                </Typography>
            )}
        </Card>
    );
};

export default UnmadeSourceComponent;
