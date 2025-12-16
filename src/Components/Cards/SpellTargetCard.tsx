import React from 'react'
import {ISpellTargetCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";

interface ISpellTargetCardInput {
    cardData: ISpellTargetCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
}

const SpellTargetCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
}: ISpellTargetCardInput) => {

    return (
        <GenericCardLayout isDraft={isDraft}  cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
        </GenericCardLayout>
    )
}

export default SpellTargetCard;