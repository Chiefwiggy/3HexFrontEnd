import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IShield} from "../../Data/IArmorData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {getArmorAffinityRequirement, getSkillFormat} from "../../Utils/Shorthand";

interface IShieldElementInput {
    shield: IShield,
    enchantmentLevel: number
}

const ShieldElement = ({
    shield,
    enchantmentLevel
}: IShieldElementInput) => {
    
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
                    <Typography variant={"h6"}>{shield.shieldName} +{enchantmentLevel}</Typography>
                    <Typography variant={"body2"} sx={{color: "darkgray"}}>SKL {shield.skillRequirement} {getArmorAffinityRequirement(shield.armorClass, enchantmentLevel, currentSheet?.getAbilityBonuses("armorAffinityRequirement") ?? 0)} </Typography>
                </Box>
                <Divider />
                <Box>
                    <Typography variant={"h6"}>pDEF: {shield.pDEFBonus} <em>(+{shield.blockPDEFBonus})</em></Typography>
                    <Typography variant={"h6"}>mDEF: {shield.mDEFBonus} <em>(+{shield.blockMDEFBonus})</em></Typography>
                    {
                        shield.armorClass != "light" ?
                            <Typography variant={"body1"}>Refresh: x{shield.armorClass == "standard" ? 0.75 : 0.5}</Typography>
                            : <></>
                    }

                    {
                        shield.armorClass == "heavy"
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

export default ShieldElement