import React, {ReactNode} from 'react'
import {ICommonCardData} from "../../Data/ICardData";
import {Box, Paper, Skeleton, Typography} from "@mui/material";
import CardList from "./CardList";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";

interface ICardListScrollableInput {
    cardList: Array<ICommonCardData>,
    header: ReactNode,
    onClickButton: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    canFavorite?: boolean,
    gridTemplate?: string
    skeletonMax?: number
}

const CardListScrollable = ({
    cardList,
    header,
    onClickButton,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    canFavorite = true,
    gridTemplate = "repeat(2, 1fr)",
    skeletonMax = 10
}: ICardListScrollableInput) => {



    return (
        <Box
            sx={{
                maxHeight: "90vh",
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: "center"
            }}
        >
            {header}
            <br />
            <Box
                sx={{
                    overflowY: 'scroll',
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    scrollbarWidth: 'thin',
                    backgroundColor: '#343434',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'grid',
                    gridTemplateColumns: gridTemplate,
                    gap: '20px',
                    maxHeight: '764px'
                }}
            >
                <CardList cardList={cardList} onClickButton={onClickButton} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite}/>
                {
                    Array.from({length: skeletonMax - cardList.length}, (_, index) => {
                       return <Skeleton variant="rounded" width={"16vw"} height={"132px"} sx={{minWidth: "264px"}} key={index}/>
                    })
                }

            </Box>

        </Box>
    )
}

export default  CardListScrollable