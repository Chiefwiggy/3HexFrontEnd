import React from 'react'
import {Box} from "@mui/material";
import {ICommonCardData} from "../../Data/ICardData";
import {ICardBuilderType} from "../../Layouts/CardBuilder";

interface ICardBuilderGridItemInput {
    cardData: ICommonCardData,
    cardType: ICardBuilderType|undefined|null,
    sendBack: Function
}
const CardBuilderGridItem = ({
    cardData,
    cardType,
    sendBack
}: ICardBuilderGridItemInput) => {

    if (cardType) {
        const SpellCard = cardType.component

        return (
            <Box>
                <SpellCard
                    cardData={cardData}
                    sendBack={sendBack}
                    isExpanded={false}
                    canToggleExpand={true}
                    isAdd={true}
                    canFavorite={true}
                />
            </Box>
        )
    } else {
        return <></>
    }



}


export default CardBuilderGridItem