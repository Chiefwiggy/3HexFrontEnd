import React from 'react';
import {Box} from "@mui/material";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {IHackModifierCardData, IHackProtocolCardData} from "../../Data/ICardData";
import NumericIcon from "./NumericIcon";
import {getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {AutoFixOffOutlined, SaveAltOutlined} from "@mui/icons-material";
import {GiTechnoHeart} from "react-icons/gi";
import ChannelType from "../../Utils/ChannelType";

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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >
                <NumericIcon val={getStatShorthand(cardData.saveType as UStat | "none" | "luck").toUpperCase() + " " + getSkillFormat(cardData.baseHackSet, false)} icon={GiTechnoHeart} align={"center"} title={"Base Spell Set"}/>
            </Box>
        </GenericCardLayout>
    )
}

export default HackProtocolCard