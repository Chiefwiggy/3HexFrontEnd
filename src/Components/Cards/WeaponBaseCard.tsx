import React, {useEffect, useState} from 'react';
import {IScaledWeaponBaseData, ISpellBaseCardData, IWeaponBaseData, UDamageType} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {Box, Typography} from "@mui/material";
import NumericIcon from "./NumericIcon";
import {
    Accessibility, AccessibilityNewOutlined,
    AdsClickOutlined, BackHandOutlined,
    CrisisAlertOutlined,
    FitnessCenterOutlined,
    LooksOutlined, SportsHandballOutlined,
    SportsMmaOutlined
} from "@mui/icons-material";
import {getDamageShorthand, getHandedness, getSkillFormat} from "../../Utils/Shorthand";
import CritNumberBox from "../SmallComponents/CritNumberBox";
import {createRangeString} from "../../Utils/helper_functions";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";

interface IWeaponBaseCardInput {
    cardData: IWeaponBaseData,
    enchantmentData: number,
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}
const WeaponBaseCard = ({
    cardData,
    sendBack,
    enchantmentData,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: IWeaponBaseCardInput) => {

    const [constructedData, setConstructedData] = useState<IScaledWeaponBaseData>(ConstructFinalWeapon(cardData, enchantmentData));

    useEffect(() => {
        setConstructedData(ConstructFinalWeapon(cardData, cardData.tempEnchantValue ?? 0));
    }, [cardData, enchantmentData]);

    const handleCustomSendBack = (cd: ICardSendbackData) => {
        sendBack({
            cardData: cardData,
            action: cd.action
        })
    }


    return cardData.specialCrit ? (
        <GenericCardLayout cardData={constructedData} sendBack={handleCustomSendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} showAdd={showAdd} canFavorite={canFavorite} overrideSubtitle={cardData.weaponType.toUpperCase() + " • " + cardData.weaponClass.toUpperCase()} showPrerequisites={showPrerequisites}
                           titleExtra={constructedData.enchantmentLevel ? ("+" + constructedData.enchantmentLevel) : ""}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                }}
            >

                <NumericIcon val={constructedData.basePower} icon={SportsMmaOutlined}  postText={getDamageShorthand(cardData.damageType as UDamageType)}
                    postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>}
                />
                <NumericIcon val={"x" + constructedData.potency} icon={FitnessCenterOutlined} />
                <NumericIcon val={constructedData.skillRequirement} icon={BackHandOutlined} />
                <NumericIcon val={`${createRangeString(constructedData.baseRange)}`} icon={LooksOutlined} />
                <NumericIcon val={getSkillFormat(constructedData.baseHit)} icon={AdsClickOutlined} />
                <NumericIcon val={constructedData.baseCrit} icon={CrisisAlertOutlined} />
                <NumericIcon val={getHandedness(null, constructedData.handedness)} icon={AccessibilityNewOutlined} />
                {
                    cardData.canThrow ?
                        <NumericIcon val={createRangeString(constructedData.thrownRange)} icon={SportsHandballOutlined} />
                        : <NumericIcon val={"-"} icon={SportsHandballOutlined} />
                }
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-around",
                    marginTop: '8px'
                }}
            >
                <CritNumberBox value={constructedData.specialCrit.d1}/>
                <CritNumberBox value={constructedData.specialCrit.d2}/>
                <CritNumberBox value={constructedData.specialCrit.d3}/>
                <CritNumberBox value={constructedData.specialCrit.d4}/>
                <CritNumberBox value={constructedData.specialCrit.d5}/>
                <CritNumberBox value={constructedData.specialCrit.d6}/>
            </Box>

        </GenericCardLayout>
    ) : <>{JSON.stringify(cardData, null, 2)}</>
}

export default WeaponBaseCard