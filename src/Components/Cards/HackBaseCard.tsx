import React from 'react';
import {Box, Typography} from "@mui/material";
import {IHackBaseCardData, IHackModifierCardData, UDamageType} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import NumericIcon from "./NumericIcon";
import {MdAccessTime, MdElectricBolt, MdFitnessCenter, MdOutlineSportsMma, MdOutlineWaterDrop} from "react-icons/md";
import {getDamageShorthand, getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {GiHeartShield} from "react-icons/gi";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {GrTechnology} from "react-icons/gr";

interface IHackBaseCardInput {
    cardData: IHackBaseCardData;
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const HackBaseCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: IHackBaseCardInput) => {


    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2, // optional spacing
                }}
            >

                <NumericIcon val={cardData.basePower}  title="Base Power" icon={MdOutlineSportsMma} postText={getDamageShorthand(cardData.damageType as UDamageType)} postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>} />
                <NumericIcon val={"x" + cardData.potency} icon={MdFitnessCenter} title={"Potency. Multiply your Might by this value and add that to the spell's Power."} />
                <NumericIcon val={cardData.technikCost} icon={GrTechnology} title={"Technik Cost"}/>
                <NumericIcon val={cardData.duration} icon={MdAccessTime} title={"Duration"}/>
            </Box>
        </GenericCardLayout>
    )
}

export default HackBaseCard