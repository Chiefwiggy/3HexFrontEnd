import React from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import BarracksWeapon from "../Components/Equipment/BarracksWeapon";
import {Helmet} from "react-helmet";

interface IWeaponCompendiumInput {

}

const WeaponCompendium = ({}: IWeaponCompendiumInput) => {

    const {WeaponData} = usePreloadedContent();

    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Weapons - Ursura</title>
            </Helmet>
            <Typography variant={"h4"}>Weapons</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    WeaponData.GetAllStandardWeapons().map(e => {
                        return (
                            <BarracksWeapon weaponData={e} key={e._id} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default WeaponCompendium