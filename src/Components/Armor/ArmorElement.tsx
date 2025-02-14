import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IArmor} from "../../Data/IArmorData";
import {getArmorAffinityRequirement, getSkillFormat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IArmorElementInput {
    armor: IArmor,
    enchantmentLevel: number
}

const ArmorElement = ({armor, enchantmentLevel}: IArmorElementInput) => {

    const {currentSheet} = useCharacter();


    return (
        <Paper elevation={2} sx={{
            minWidth: "264px",
            width: "18vw",
            padding: "6px",
            borderRadius: "12px"
        }}>
            <Box
                sx={{
                    margin: "12px"
                }}
            >

                <Box sx={{
                    textAlign: "center",
                    paddingBottom: "4px"
                }}>
                    <Typography variant={"h6"}>{armor.armorName} +{enchantmentLevel}</Typography>
                    <Typography variant={"body2"} sx={{color: "darkgray"}}>VIT {armor.vitalityRequirement} {getArmorAffinityRequirement(armor.armorClass, enchantmentLevel, currentSheet?.getAbilityBonuses("armorAffinityRequirement") ?? 0)} </Typography>
                </Box>
                <Divider />
                <Box>
                    <Typography variant={"h6"}>pDEF {armor.pDEFBonus} <em>(+{armor.blockPDEFBonus})</em></Typography>
                    <Typography variant={"h6"}>mDEF {armor.mDEFBonus} <em>(+{armor.blockMDEFBonus})</em></Typography>
                    <Typography variant={"h6"}>Dodge {armor.armorClass == "heavy" ? "-" : "+"}{getSkillFormat(armor.armorClass == "standard" ? 0 : 8, false)}</Typography>
                    {
                        armor.armorClass == "heavy"
                        ?
                            <>
                                <Typography variant={"body1"}>Dash Steps -1</Typography>
                                <Typography variant={"body1"}>Cannot Evade</Typography>
                            </>
                            :<></>
                    }
                </Box>

            </Box>


        </Paper>
    )
}

export default ArmorElement