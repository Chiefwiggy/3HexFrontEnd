import React from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import ScalableArmorElement from "../Components/Armor/ScalableArmorElement";
import {Helmet} from "react-helmet";

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
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Armor - Ursura</title>
            </Helmet>
            {ArmorData.GetAllBaseData().map((armor) => {
                return (
                    <ScalableArmorElement armor={armor} key={armor._id} />
                )
            })}
        </Box>
    )
}

export default ArmorCompendium