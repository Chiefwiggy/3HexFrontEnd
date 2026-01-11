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
import {IEnchantmentData} from "../../Data/ICharacterData";
import {
    MdAccessibilityNew,
    MdAdsClick,
    MdBackHand,
    MdCrisisAlert,
    MdFitnessCenter,
    MdLooks,
    MdOutlineSportsMma
} from "react-icons/md";

interface IWeaponBaseCardInput {
    cardData: IWeaponBaseData,
    enchantmentData: IEnchantmentData,
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
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
    showPrerequisites=false, isDraft=false
}: IWeaponBaseCardInput) => {

    const [constructedData, setConstructedData] = useState<IScaledWeaponBaseData>(ConstructFinalWeapon(cardData, enchantmentData ?? {enchantmentLevel: 0, baseId: ""}));

    useEffect(() => {
        setConstructedData(ConstructFinalWeapon(cardData, cardData.tempEnchantValue ?? {enchantmentLevel: 0, baseId: ""}));
    }, [cardData, enchantmentData]);

    const handleCustomSendBack = (cd: ICardSendbackData) => {
        sendBack({
            cardData: cardData,
            action: cd.action
        })
    }


    return cardData.specialCrit ? (
        <GenericCardLayout isDraft={isDraft}  cardData={constructedData} sendBack={handleCustomSendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} showAdd={showAdd} canFavorite={canFavorite} overrideSubtitle={cardData.weaponType.toUpperCase() + " • " + cardData.weaponClass.toUpperCase()} showPrerequisites={showPrerequisites}
                           titleExtra={cardData.canScale ? `+${constructedData.enchantmentData.enchantmentLevel} ${constructedData.enchantmentData.efficientUse ? "2H" : ""}${(constructedData.enchantmentData?.improvements ?? 0) > 0 ? `-S${(constructedData.enchantmentData.improvements ?? 0) > 1 ? "+" : ""}` : ""}`: (constructedData.enchantmentData?.improvements ?? 0) > 0 ? "- Honed" : ""}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                }}
            >


                <NumericIcon val={constructedData.basePower} icon={MdOutlineSportsMma}  postText={getDamageShorthand(cardData.damageType as UDamageType)}
                    postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>}
                />
                <NumericIcon val={"x" + constructedData.potency} icon={MdFitnessCenter} />
                <NumericIcon val={`${createRangeString(constructedData.baseRange)}`} icon={MdLooks} />
                <NumericIcon val={getSkillFormat(constructedData.baseHit)} icon={MdAdsClick} />
                <NumericIcon val={constructedData.baseCrit} icon={MdCrisisAlert} />
                <NumericIcon val={getHandedness(constructedData.handedness)} icon={MdAccessibilityNew} />
                {
                    cardData.thrownRange.max.baseValue > 0 ?
                        <NumericIcon val={createRangeString(constructedData.thrownRange)} icon={SportsHandballOutlined} />
                        : <></>

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