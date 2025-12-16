import React from 'react';
import {Box} from "@mui/material";
import CardCodeCreatorWithPreview from "../Components/Cards/CardCodeCreatorWithPreview";


interface ICardCreatorPageInput {

}

const CardCreatorPage = ({}: ICardCreatorPageInput) => {
    return (
        <Box>
            <CardCodeCreatorWithPreview />
        </Box>
    )
}

export default CardCreatorPage