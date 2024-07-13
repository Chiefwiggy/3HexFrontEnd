import React from 'react';
import {Box, Grid} from "@mui/material";
import {ICommonCardData} from "../../Data/ICardData";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import CardBuilderGridItem from "./CardBuilderGridItem";

interface ICardBuilderGridListInput {
    cardList: Array<ICommonCardData>,
    cardTypes: Array<ICardBuilderType>,
    sendBack: Function
}
const CardBuilderGridList = ({
    cardList,
    cardTypes,
    sendBack = (num: number) => Function
}: ICardBuilderGridListInput) => {
    return (
        <>
            {
                cardList.map((card: ICommonCardData) => {
                    const typeIndex = cardTypes.findIndex((type) => card.cardSubtype === type.name.split(".")[1]);
                    const type = cardTypes[typeIndex];
                    return (
                        <Grid item key={card.cardName}>
                            <CardBuilderGridItem
                                cardData={card}
                                cardType={type}
                                sendBack={sendBack(typeIndex)}
                            />
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default CardBuilderGridList;