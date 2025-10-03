import React from 'react';
import {Box} from "@mui/material";
import {IHackIOCardData, IHackModifierCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import NumericIcon from "./NumericIcon";
import {createRangeString} from "../../Utils/helper_functions";
import {LooksOutlined} from "@mui/icons-material";

interface IHackIOCardInput {
    cardData: IHackIOCardData;
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const HackIOCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: IHackIOCardInput) => {


    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
        </GenericCardLayout>

    )
}

export default HackIOCard