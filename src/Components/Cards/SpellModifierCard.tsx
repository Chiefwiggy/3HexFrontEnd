import React from 'react'
import {ISpellModifierCardData, ISpellTargetCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";

interface ISpellModifierCardInput {
    cardData: ISpellModifierCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, isDraft?: boolean
}

const SpellModifierCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
}: ISpellModifierCardInput) => {

    return (
        <GenericCardLayout isDraft={isDraft}  cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
        </GenericCardLayout>
    )
}

export default SpellModifierCard