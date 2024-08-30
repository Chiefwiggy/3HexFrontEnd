import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

import ConsumableCard from "../Items/ConsumableCard";
import {FlipOutlined} from "@mui/icons-material";
import ConsumablePreparedCard from '../Items/ConsumablePreparedCard';
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IConsumablePlayerData} from "../../Data/ICharacterData";
import TabSaveBar from "../SmallComponents/TabSaveBar";
import useAPI from "../../Hooks/useAPI/useAPI";

interface IConsumableTabInput {

}

const ConsumableTab = ({}: IConsumableTabInput) => {

    const {currentSheet} = useCharacter();
    const {ConsumableData} = usePreloadedContent();
    const {CharacterAPI} = useAPI();

    const [consumablePlayerData, setConsumablePlayerData] = useState<Array<IConsumablePlayerData>>(currentSheet?.data.knownConsumables ?? []);

    const [currentSlotsUsed, setCurrentSlotsUsed] = useState(0);

    useEffect(() => {
        if (currentSheet) {
            setConsumablePlayerData(currentSheet.data.knownConsumables.sort((a,b) => a.consumableId.localeCompare( b.consumableId)));
            setHasChanged(false);
        }
    }, [currentSheet]);

    const handleEditConsumableAmount = (consumableIndex: number, delta: number) => {

        setConsumablePlayerData((prevState) => {
            const newState = [...prevState];
            newState[consumableIndex] = {
                ...newState[consumableIndex],
                amount: newState[consumableIndex].amount + delta,
            };
            console.log(newState);
            return newState;
        });
        setHasChanged(true);
    }

    useEffect(() => {
        calculateSlotsUsed();
    }, [consumablePlayerData]);

    const calculateSlotsUsed = () => {
        const finalCost = consumablePlayerData.reduce((pv, cv) => {
            const cost = (ConsumableData.GetConsumableById(cv.consumableId)?.slotCost ?? 0) * cv.amount;
            return pv + cost;
        }, 0)
        setCurrentSlotsUsed(finalCost);
    }

    const [hasChanged, setHasChanged] = useState(false);

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.knownConsumables = consumablePlayerData;
            await CharacterAPI.UpdateConsumables(currentSheet.data._id, consumablePlayerData);
            setHasChanged(false);
        }
    }

    const handleCancel = () => {
        if (currentSheet) {
            setConsumablePlayerData(currentSheet.data.knownConsumables.sort((a,b) => a.consumableId.localeCompare( b.consumableId)));
            setHasChanged(false);
        }
    }





    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        padding: 1,
                        gap: 1
                    }}
                >
                    <FlipOutlined />
                    <Typography>   {currentSlotsUsed} / {currentSheet.getQuickSlots()} Slots Used </Typography>
                </Box>
                <Box>
                    <TabSaveBar submitSave={handleSave} submitCancel={handleCancel} isChanged={hasChanged} />
                </Box>

            </Box>


            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    ConsumableData.GetAllConsumablesForPlayer(currentSheet).map((consumable, index) => {
                        return (
                            <ConsumablePreparedCard consumableTemplate={consumable} consumableData={consumablePlayerData[index]} slotsUsed={currentSlotsUsed} key={index} consumableIndex={index} updateFunction={handleEditConsumableAmount} />
                        )
                    })
                }
            </Box>

        </Box>
    ) : <></>
}

export default ConsumableTab