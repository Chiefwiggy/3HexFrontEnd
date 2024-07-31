import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IArmor} from "../../Data/IArmorData";
import {getArmorAffinityRequirement} from "../../Utils/Shorthand";

interface IArmorElementInput {
    armor: IArmor,
    enchantmentLevel: number
}

const ArmorElement = ({armor, enchantmentLevel}: IArmorElementInput) => {


    return (
        <Paper elevation={2} sx={{
            minWidth: "264px",
            width: "18vw",
            padding: "6px"
        }}>
            <Box sx={{
                textAlign: "center",
                paddingBottom: "4px"
            }}>
                <Typography variant={"h6"}>{armor.armorName} +{enchantmentLevel}</Typography>
                <Typography variant={"body2"} sx={{color: "darkgray"}}>VIT {armor.vitalityRequirement} {getArmorAffinityRequirement(armor.armorClass, enchantmentLevel)} </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography variant={"h6"}>pDEF {armor.pDEFBonus} <em>(+{armor.blockPDEFBonus})</em></Typography>
                <Typography variant={"h6"}>mDEF {armor.mDEFBonus} <em>(+{armor.blockMDEFBonus})</em></Typography>
            </Box>

        </Paper>
    )
}

export default ArmorElement