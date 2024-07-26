import React from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import BarracksWeapon from "../Components/Equipment/BarracksWeapon";

interface IBarracksPageInput {

}

const BarracksPage = ({}: IBarracksPageInput) => {

    const {WeaponData} = usePreloadedContent();

    return (
        <Box>
            <Typography variant={"h4"}>Weapons</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat(5, 1fr)"
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

export default BarracksPage