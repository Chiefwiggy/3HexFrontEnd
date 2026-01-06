import React from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import GadgetCard from "../Components/Gadgets/GadgetCard";

interface IGadgetCompendiumInput {

}

const GadgetCompendium = ({}: IGadgetCompendiumInput) => {
    const {GadgetData} = usePreloadedContent()
    return (
        <Box>
            <Typography variant="h4" component="div">Gadgets</Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                }}
            >
                {
                    GadgetData.GetAllGadgets().map(gadget => {
                        return (
                            <GadgetCard gadgetData={gadget} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default GadgetCompendium