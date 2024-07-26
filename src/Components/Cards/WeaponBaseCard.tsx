import React from 'react';
import {IScaledWeaponBaseData, ISpellBaseCardData, IWeaponBaseData, UDamageType} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {Box} from "@mui/material";
import NumericIcon from "./NumericIcon";
import {
    AdsClickOutlined, BackHandOutlined,
    CrisisAlertOutlined,
    FitnessCenterOutlined,
    LooksOutlined,
    SportsMmaOutlined
} from "@mui/icons-material";
import {getDamageShorthand, getSkillFormat} from "../../Utils/Shorthand";
import CritNumberBox from "../SmallComponents/CritNumberBox";
import {createRangeString} from "../../Utils/helper_functions";

interface IWeaponBaseCardInput {
    cardData: IScaledWeaponBaseData,
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}
const WeaponBaseCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: IWeaponBaseCardInput) => {
    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} overrideSubtitle={cardData.weaponType.toUpperCase()} showPrerequisites={showPrerequisites}
                           titleExtra={cardData.enchantmentLevel ? ("+" + cardData.enchantmentLevel) : ""}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                }}
            >
                <NumericIcon val={cardData.basePower} icon={SportsMmaOutlined}  postText={getDamageShorthand(cardData.damageType as UDamageType)}/>
                <NumericIcon val={"x" + cardData.potency} icon={FitnessCenterOutlined} />
                <NumericIcon val={cardData.skillRequirement} icon={BackHandOutlined} />
                <NumericIcon val={`${createRangeString(cardData.baseRange)}`} icon={LooksOutlined} />
                <NumericIcon val={getSkillFormat(cardData.baseHit)} icon={AdsClickOutlined} />
                <NumericIcon val={cardData.baseCrit} icon={CrisisAlertOutlined} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-around",
                    marginTop: '8px'
                }}
            >
                <CritNumberBox value={cardData.specialCrit.d1}/>
                <CritNumberBox value={cardData.specialCrit.d2}/>
                <CritNumberBox value={cardData.specialCrit.d3}/>
                <CritNumberBox value={cardData.specialCrit.d4}/>
                <CritNumberBox value={cardData.specialCrit.d5}/>
                <CritNumberBox value={cardData.specialCrit.d6}/>
            </Box>
        </GenericCardLayout>
    )
}

export default WeaponBaseCard