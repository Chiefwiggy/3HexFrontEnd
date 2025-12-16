import React from 'react';
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {IWeaponCommonData} from "../../Data/ICardData";

interface IWeaponModCardInput {
    cardData: IWeaponCommonData,
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean, 
    isDraft?: boolean
}

const WeaponModCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false, isDraft=false
}: IWeaponModCardInput) => {
    return (
        <GenericCardLayout isDraft={isDraft}  cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
        </GenericCardLayout>
    )
}

export default WeaponModCard