import React from 'react';
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {IWeaponCommonData} from "../../Data/ICardData";

interface IWeaponModCardInput {
    cardData: IWeaponCommonData,
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const WeaponModCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: IWeaponModCardInput) => {
    return (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites}>
        </GenericCardLayout>
    )
}

export default WeaponModCard