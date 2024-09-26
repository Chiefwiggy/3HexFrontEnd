import React from 'react';
import {Box, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";

interface IBackpackViewInput {
    closeSelf: (event: React.MouseEvent) => void;
}


const BackpackView = ({closeSelf}: IBackpackViewInput) => {

    const {currentSheet} = useCharacter();

    const {ConsumableData} = usePreloadedContent();



    return currentSheet ? (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Typography variant={"h4"}>Backpack</Typography>
            </Box>
            {
                ConsumableData.GetAllConsumablesForPlayer(currentSheet).map(consumable => {
                   return (
                       <Box key={consumable._id}>
                           {consumable.itemName}
                       </Box>
                   )
                })
            }
        </Box>
    ) : <></>
}

export default BackpackView