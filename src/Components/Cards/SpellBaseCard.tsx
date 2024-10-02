import React, {ReactNode, useEffect, useState} from "react";
import {ISpellBaseCardData, UDamageType} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {Box, Typography} from "@mui/material";
import {
    AccessTimeOutlined,
    AutoFixOffOutlined, ElectricBoltOutlined,
    FitnessCenterOutlined, SaveAltOutlined,
    SportsMmaOutlined,
    WaterDropOutlined
} from "@mui/icons-material";
import NumericIcon from "./NumericIcon";
import CardEffect from "./CardEffect";
import {getDamageShorthand, getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";


interface ISpellBaseCardInput {
    cardData: ISpellBaseCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}
const SpellBaseCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
} : ISpellBaseCardInput) => {

    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} overrideSubtitle={cardData.arcanotype.toUpperCase()} showPrerequisites={showPrerequisites} showAdd={showAdd}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >
                <NumericIcon val={cardData.tetherCost} icon={WaterDropOutlined} align={"center"}/>
                <NumericIcon val={getSkillFormat(cardData.baseSpellSet)} icon={AutoFixOffOutlined} align={"center"}/>
                <NumericIcon val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase()} icon={SaveAltOutlined} align={"center"}/>
                <NumericIcon val={cardData.energyCost} icon={ElectricBoltOutlined} align={"center"}/>
            </Box>
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr'
                }}
            >
                <Box>
                    <NumericIcon val={cardData.basePower} icon={SportsMmaOutlined} postText={getDamageShorthand(cardData.damageType as UDamageType)}/>
                    <NumericIcon val={"x" + cardData.potency} icon={FitnessCenterOutlined} />
                    <NumericIcon val={cardData.duration} icon={AccessTimeOutlined} />
                </Box>
                <Box>
                    <Typography>Environment Bonus</Typography>
                    <Typography sx={{fontSize: '0.8rem'}}>{cardData.environmentBonus}</Typography>
                </Box>
            </Box>


        </GenericCardLayout>
    )
}

export default SpellBaseCard;