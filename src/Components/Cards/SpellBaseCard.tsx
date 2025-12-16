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
import {GiHeartShield} from "react-icons/gi";
import {MdAccessTime, MdElectricBolt, MdFitnessCenter, MdOutlineSportsMma, MdOutlineWaterDrop} from "react-icons/md";


interface ISpellBaseCardInput {
    cardData: ISpellBaseCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
}
const SpellBaseCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
} : ISpellBaseCardInput) => {

    return (
        <GenericCardLayout isDraft={isDraft} cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} overrideSubtitle={cardData.isFromTemporarySource ? "TEMPORARY" : cardData.arcanotype.toUpperCase()} showPrerequisites={showPrerequisites} showAdd={showAdd} bannerOverride={cardData.isFromTemporarySource ? "spell.base.temporary" : null} >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >
                <NumericIcon val={cardData.tetherCost} icon={MdOutlineWaterDrop} align={"center"} title={"Tether Cost"}/>
                <NumericIcon val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase() + " " + getSkillFormat(cardData.baseSpellSet, false)} icon={GiHeartShield} align={"center"} title={"Base Spell Set"}/>
                <NumericIcon val={cardData.energyCost} icon={MdElectricBolt} align={"center"} title={"Action Cost"}/>
            </Box>
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr'
                }}
            >
                <Box>
                    <NumericIcon val={cardData.basePower} title="Base Power" icon={MdOutlineSportsMma} postText={getDamageShorthand(cardData.damageType as UDamageType)} postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>} />
                    <NumericIcon val={"x" + cardData.potency} icon={MdFitnessCenter} title={"Potency. Multiply your Might by this value and add that to the spell's Power."} />
                    <NumericIcon val={cardData.duration} icon={MdAccessTime} title={"Duration"}/>
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