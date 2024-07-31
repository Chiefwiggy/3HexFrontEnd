import React from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import ScalableArmorElement from "../Components/Armor/ScalableArmorElement";

interface IArmorCompendiumInput {

}

const ArmorCompendium = ({}: IArmorCompendiumInput) => {

    const {ArmorData} = usePreloadedContent();

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                gridGap: "10px"
            }}
        >
            {ArmorData.GetAllBaseData().map((armor) => {
                return (
                    <ScalableArmorElement armor={armor} key={armor._id} />
                )
            })}
        </Box>
    )
}

export default ArmorCompendium