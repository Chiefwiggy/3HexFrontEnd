import React from 'react';
import {Box} from "@mui/material";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {ICommanderCardData, ISpellModifierCardData} from "../../Data/ICardData";

interface ICommanderCardInput {
    cardData: ICommanderCardData;
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const CommanderCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: ICommanderCardInput) => {


    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
            <></>
        </GenericCardLayout>
    )
}

export default CommanderCard