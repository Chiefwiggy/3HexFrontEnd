import React from 'react';
import {Box, Typography} from "@mui/material";
import {IHackBaseCardData, IHackModifierCardData, UDamageType} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import NumericIcon from "./NumericIcon";
import {
    MdAccessTime,
    MdElectricBolt,
    MdFitnessCenter,
    MdOutlineSportsMma,
    MdOutlineWaterDrop,
    MdPowerOff
} from "react-icons/md";
import {getDamageShorthand, getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {GiHeartShield, GiLaserBurst} from "react-icons/gi";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {GrTechnology} from "react-icons/gr";
import ChannelType from "../../Utils/ChannelType";

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
                    marginTop: "-16px",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px"
                }}
            >
                {cardData.channelRequirements?.map((channel, index) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            {index > 0 ? <Box sx={{
                                marginRight: "12px"
                            }}>OR</Box> : <></>}
                            <ChannelType channelType={channel.channelType} channelStrength={channel.channelStrength} color={"white"} />
                        </Box>

                    )
                })}

            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, auto)",
                    justifyContent: "center",   // centers the entire grid
                    justifyItems: "center",     // centers items in each column
                    alignItems: "center",
                    gap: 2,
                }}
            >


                <NumericIcon val={cardData.basePower}  title="Base Power" icon={MdOutlineSportsMma} postText={getDamageShorthand(cardData.damageType as UDamageType)} postIcon={<SubtypeDamageIcon damageSubtype={cardData.damageSubtype}/>} />
                <NumericIcon val={"x" + cardData.potency} icon={MdFitnessCenter} title={"Potency. Multiply your Might by this value and add that to the spell's Power."} />
                <NumericIcon val={cardData.technikCost} icon={GrTechnology} title={"Technik Cost"}/>
                <NumericIcon val={cardData.duration} icon={MdAccessTime} title={"Duration"}/>
                <Box></Box>
                <NumericIcon val={cardData.baseSurge ?? 0} icon={GiLaserBurst} iconColor={"#0096ff"} title={"Surge"}/>
            </Box>
        </GenericCardLayout>
    )
}

export default HackBaseCard