import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import ConsumableCard from "../Components/Items/ConsumableCard";
import BarracksConsumable from "../Components/Equipment/BarracksConsumable";

interface IConsumableCompendiumInput {

}

const ConsumableCompendium = ({}: IConsumableCompendiumInput) => {

    const {ConsumableData} = usePreloadedContent();

    return (
        <Box
            sx={{
                padding: 2
            }}
        >
            <Box
                sx={{
                    marginBottom: 2
                }}
            >
                <Typography variant={"h4"}>Consumables</Typography>
                <Divider />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    ConsumableData.GetAllConsumableData().map((consumable) => {
                        return (
                            <BarracksConsumable consumable={consumable} key={consumable._id} />
                        )
                    })
                }

            </Box>
        </Box>
    )
}

export default ConsumableCompendium