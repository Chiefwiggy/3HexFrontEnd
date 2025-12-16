import React from 'react';
import {Box} from "@mui/material";
import {IHackIOCardData, IHackModifierCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import NumericIcon from "./NumericIcon";
import {createRangeString} from "../../Utils/helper_functions";
import {LooksOutlined} from "@mui/icons-material";
import ChannelType from "../../Utils/ChannelType";

interface IHackIOCardInput {
    cardData: IHackIOCardData;
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
}

const HackIOCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
}: IHackIOCardInput) => {


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
                {cardData.channelRequirements?.map((channel, index) => {
                    return (
                        <ChannelType channelType={channel.channelType} channelStrength={channel.channelStrength} color={"white"} />
                    )
                })}
            </Box>
        </GenericCardLayout>

    )
}

export default HackIOCard