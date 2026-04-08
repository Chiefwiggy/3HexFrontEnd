import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {IScaledWeaponBaseData, IWeaponBaseData, UDamageType} from "../../Data/ICardData";
import {IEnchantmentData} from "../../Data/ICharacterData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {ConstructFinalGadget, ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import NumericIcon from "./NumericIcon";
import {
    MdAccessibilityNew,
    MdAdsClick,
    MdCrisisAlert,
    MdFitnessCenter,
    MdLooks,
    MdOutlineSportsMma
} from "react-icons/md";
import {getDamageShorthand, getHandedness, getSkillFormat} from "../../Utils/Shorthand";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {createRangeString} from "../../Utils/helper_functions";
import {SportsHandballOutlined} from "@mui/icons-material";
import CritNumberBox from "../SmallComponents/CritNumberBox";
import {IGadgetData} from "../../Data/IGadgetData";
import DieIcon from "../Generic/DieIcon";

interface IWeaponGadgetBaseCardInput {
    cardData: IScaledWeaponBaseData,
    sendBack: (gadgetData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean, meetsPrerequisites?: boolean
}

const WeaponGadgetBaseCard = ({    cardData,
  sendBack,
  isExpanded = false,
  canToggleExpand = true,
  isAdd = true,
  showAdd = true,
  canFavorite = true,
  showPrerequisites=false, isDraft=false, meetsPrerequisites=false
}: IWeaponGadgetBaseCardInput) => {


    const handleCustomSendBack = (cd: ICardSendbackData) => {
        sendBack({
            cardData: cardData,
            action: cd.action
        })
    }

    return cardData && cardData.specialCrit ? (
        <GenericCardLayout isDraft={isDraft}  cardData={cardData} sendBack={handleCustomSendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} showAdd={showAdd} canFavorite={canFavorite} meetsPrerequisites={meetsPrerequisites} overrideSubtitle={cardData.weaponType.toUpperCase() + " • " + cardData.weaponClass.toUpperCase()} showPrerequisites={showPrerequisites}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                }}
            >


                <NumericIcon val={cardData.basePower} icon={MdOutlineSportsMma} postText={getDamageShorthand(cardData.damageType as UDamageType)}
                             postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>}
                />
                <NumericIcon val={"x" + cardData.potency} icon={MdFitnessCenter} />
                <NumericIcon val={`${createRangeString(cardData.baseRange)}`} icon={MdLooks} />
                <NumericIcon val={getSkillFormat(cardData.baseHit)} icon={MdAdsClick} />
                <NumericIcon val={cardData.baseCrit} icon={MdCrisisAlert} />
                <NumericIcon val={getHandedness(cardData.handedness)} icon={MdAccessibilityNew} />
            </Box>
            {
                Object.values(cardData.specialCrit).filter(e => e != '-').map(die => {
                    return (
                        <DieIcon value={die} size={50} mode={"dark"} />
                    )})
            }

        </GenericCardLayout>
    ) : <>{JSON.stringify(cardData, null, 2)}</>
}

export default WeaponGadgetBaseCard