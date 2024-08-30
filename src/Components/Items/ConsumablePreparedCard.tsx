import React, {useEffect, useState} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {IConsumableTemplate} from "../../Data/IConsumable";
import ConsumableCard from "./ConsumableCard";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IConsumablePlayerData} from "../../Data/ICharacterData";

interface IConsumablePreparedCardInput {
    consumableTemplate: IConsumableTemplate,
    consumableData: IConsumablePlayerData,
    slotsUsed: number,
    consumableIndex: number,
    updateFunction: (consumableIndex: number, delta: number) => void
}

const ConsumablePreparedCard = ({consumableTemplate, consumableData, slotsUsed, consumableIndex, updateFunction}: IConsumablePreparedCardInput) => {

    const {currentSheet} = useCharacter()

    const handlePrepare = (delta: number) => (event: React.MouseEvent) => {
        updateFunction(consumableIndex, delta);
    }

    return currentSheet && consumableData ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "7fr 1fr"
            }}
        >
            <Box>
                <ConsumableCard consumableTemplate={consumableTemplate} defaultScaled={true} />
            </Box>
            <Box
                sx={{
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <IconButton onClick={handlePrepare(1)} disabled={(slotsUsed + consumableTemplate.slotCost) > currentSheet.getQuickSlots()}><ArrowDropUp /></IconButton>
                <Typography sx={{userSelect: "none"}}>{consumableData.amount }</Typography>
                <IconButton onClick={handlePrepare(-1)} disabled={consumableData.amount == 0}><ArrowDropDown /></IconButton>
            </Box>
        </Box>
    ) : <></>
}

export default ConsumablePreparedCard