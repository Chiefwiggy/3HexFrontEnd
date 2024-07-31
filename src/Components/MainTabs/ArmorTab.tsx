import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import ArmorElement from "../Armor/ArmorElement";
import {IArmor} from "../../Data/IArmorData";
import {ConstructFinalArmor} from "../../Utils/ConstructFinalWeapon";

interface IArmorTabInput {

}

const ArmorTab = ({}: IArmorTabInput) => {

    const {currentSheet} = useCharacter();

    const [currentArmor, setCurrentArmor] = useState<IArmor | undefined>(undefined);

    useEffect(() => {
        if (currentSheet) {
            setCurrentArmor(currentSheet.currentArmor)
        }

    }, [currentSheet]);


    return currentArmor ?(
        <Box
            sx={{
                padding: "12px"
            }}
        >
            <ArmorElement armor={currentArmor} enchantmentLevel={currentArmor.enchantmentLevel} />
        </Box>
    ) : <></>
}

export default ArmorTab