import React from 'react';
import {Box} from "@mui/material";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {IHackModifierCardData, IHackProtocolCardData} from "../../Data/ICardData";
import NumericIcon from "./NumericIcon";
import {getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {AutoFixOffOutlined, SaveAltOutlined} from "@mui/icons-material";
import {GiBorderedShield, GiMagicShield, GiRun, GiTechnoHeart} from "react-icons/gi";
import ChannelType from "../../Utils/ChannelType";
import {FaHeartbeat, FaRunning} from "react-icons/fa";
import {FaRegClock} from "react-icons/fa6";

interface IHackProtocolCardInput {
    cardData: IHackProtocolCardData;
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
}

const HackProtocolCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
}: IHackProtocolCardInput) => {


    return (
        <GenericCardLayout isDraft={isDraft}  cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
            <Box
                sx={{
                    marginTop: "-16px",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px"
                }}
            >
                {cardData.protocolChannels.map((channel, index) => {
                    return (
                        <ChannelType channelType={channel.channelType} channelStrength={channel.channelStrength} color={"gray"} key={index} />
                    )
                })}
            </Box>
            {
                cardData.isSummon && cardData.summonData ?
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr"
                        }}
                    >

                        <NumericIcon fontSize={"16px"} val={cardData.summonData.pDEF} icon={GiBorderedShield} title={`pDEF`} />
                        <NumericIcon fontSize={"16px"} align="center" val={cardData.summonData.mDEF} icon={GiMagicShield} title={`mDEF`} />
                        <NumericIcon fontSize={"16px"} align="right" val={cardData.summonData.maxHealth} icon={FaHeartbeat} title={`Max Health`} />

                        <NumericIcon fontSize={"16px"} align="left" val={cardData.summonData.movement} icon={GiRun} title={`Base Movement `}/>
                        <NumericIcon fontSize={"12px"} val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase() + " " + getSkillFormat(cardData.baseHackSet, false)} icon={GiTechnoHeart} align={"center"} title={"Base Hack Set"}/>
                        <NumericIcon fontSize={"16px"} align="right" val={`${getSkillFormat(cardData.summonData.dodge, false)}`} icon={FaRunning} title={`dodge`} />
                    </Box>
                    :
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}
                    >
                        <NumericIcon val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase() + " " + getSkillFormat(cardData.baseHackSet, false)} icon={GiTechnoHeart} align={"center"} title={"Base Hack Set"}/>
                    </Box>
            }
        </GenericCardLayout>
    )
}

export default HackProtocolCard