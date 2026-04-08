import React from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import {getStatShorthand, UStat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IAttributeCardSmallInput {
    stat: UStat,
    statValueOverride?: number
}

const AttributeCardSmall = ({stat, statValueOverride=0}: IAttributeCardSmallInput) => {

    const {currentSheet} = useCharacter()

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography
                variant={"h6"}
                sx={{
                    fontSize: "14px"
                }}
            > {getStatShorthand(stat).toUpperCase()}</Typography>
            <Typography variant={"h6"}>{currentSheet ? currentSheet.getStat(stat) : statValueOverride }</Typography>

        </Box>
    )
}

export default AttributeCardSmall