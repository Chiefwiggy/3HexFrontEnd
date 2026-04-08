import React from 'react';
import {Box, Typography} from "@mui/material";
import {IFatelineFullData, IFatelineSidedData} from "../../Data/IFatelineData";

interface IFatelineBlurbInput {
    sidedData: IFatelineSidedData
}

const FatelineBlurb = ({sidedData}: IFatelineBlurbInput) => {
    return (
        <Box>
            <Typography variant="body1">{sidedData.fatelineDescription}</Typography>
        </Box>
    )
}

export default FatelineBlurb