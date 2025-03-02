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
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";


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
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} overrideSubtitle={cardData.isFromTemporarySource ? "TEMPORARY" : cardData.arcanotype.toUpperCase()} showPrerequisites={showPrerequisites} showAdd={showAdd} bannerOverride={cardData.isFromTemporarySource ? "spell.base.temporary" : null}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >
                <NumericIcon val={cardData.tetherCost} icon={WaterDropOutlined} align={"center"} title={"Tether Cost"}/>
                <NumericIcon val={getSkillFormat(cardData.baseSpellSet, false)} icon={AutoFixOffOutlined} align={"center"} title={"Base Spell Set"}/>
                <NumericIcon val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase()} icon={SaveAltOutlined} align={"center"} title={"Save Type"}/>
                <NumericIcon val={cardData.energyCost} icon={ElectricBoltOutlined} align={"center"} title={"Action Cost"}/>
            </Box>
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr'
                }}
            >
                <Box>
                    <NumericIcon val={cardData.basePower} title="Base Power" icon={SportsMmaOutlined} postText={getDamageShorthand(cardData.damageType as UDamageType)} postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>} />
                    <NumericIcon val={"x" + cardData.potency} icon={FitnessCenterOutlined} title={"Potency. Multiply your Might by this value and add that to the spell's Power."} />
                    <NumericIcon val={cardData.duration} icon={AccessTimeOutlined} title={"Duration"}/>
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