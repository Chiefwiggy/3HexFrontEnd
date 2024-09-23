import React, {ReactElement, ReactNode} from 'react'
import {Box, Paper, Typography} from "@mui/material";
import {ICommonCardData} from "../../Data/ICardData";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {CardGetColor} from "../../Utils/CardColorUtils";

interface ICardSkeletonInput {
    placeholderText: string,
    CardElement: React.FC<any>
    cardData: ICommonCardData | null
    sendBack: (data: ICardSendbackData) => void
    type: string
}
const CardSkeleton = ({
    placeholderText,
    CardElement,
    cardData,
    sendBack,
    type
}: ICardSkeletonInput) => {

    return cardData ? (
        <CardElement
            cardData={cardData}
            sendBack={sendBack}
            isAdd={false}
            isExpanded={true}
            canToggleExpand={false}
            canFavorite={false}
        />
    ) : (type.split(".")[0] == "condition" ? <></> : (
        <Paper elevation={1} sx={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: "264px",
            alignItems: 'center',
            borderTop: `4px outset ${CardGetColor(type)}`
        }}>
            <Typography variant={"h5"}>{placeholderText}</Typography>
        </Paper>
    ))
}

export default CardSkeleton