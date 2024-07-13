import React from 'react'
import {ISpellTargetCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";

interface ISpellTargetCardInput {
    cardData: ISpellTargetCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const SpellTargetCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: ISpellTargetCardInput) => {

    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites}>
        </GenericCardLayout>
    )
}

export default SpellTargetCard;