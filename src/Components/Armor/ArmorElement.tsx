import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IArmor, UArmorClass} from "../../Data/IArmorData";
import {getArmorAffinityRequirement, getSkillFormat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {GiBorderedShield, GiBrokenShield, GiMagicShield} from "react-icons/gi";
import ArmorBigIconDivider from "../SmallComponents/ArmorBigIconDivider";
import {IoMdRefresh} from "react-icons/io";
import {FaRunning} from "react-icons/fa";
import {MdOutlineDirectionsWalk} from "react-icons/md";

interface IArmorElementInput {
    armor: IArmor,
    enchantmentLevel: number
}

const ArmorElement = ({armor, enchantmentLevel}: IArmorElementInput) => {

    const {currentSheet} = useCharacter();

    const getRefreshIndex = (armorClass: UArmorClass) => {
        return ["heavy", "standard", "light"].indexOf(armor.armorClass) + 1
    }

    const getDodgeIndex = (armorClass: UArmorClass) => {
        if (armorClass == "light") {
            return 2.5;
        } else if (armorClass == "heavy") {
            return 1.0;
        }
        return 2.0;
    }


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
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr"
                    }}
                >
                    <ArmorBigIconDivider size={64} iconLabel={"pDEF"} icon={GiBorderedShield} topValue={`+${armor.pDEFBonus}`} topLabel={"pDEF Evade"} bottomValue={`+${armor.pDEFBonus + armor.blockPDEFBonus}`} bottomLabel={"pDEF Block"} />
                    <ArmorBigIconDivider size={64} iconLabel={"mDEF"} icon={GiMagicShield} topValue={`+${armor.mDEFBonus}`} topLabel={"mDEF Evade"} bottomValue={`+${armor.mDEFBonus + armor.blockMDEFBonus}`} bottomLabel={"mDEF Block"} />
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <ArmorBigIconDivider size={48} iconLabel={"Refresh"} icon={IoMdRefresh} topValue={`x${getRefreshIndex(armor.armorClass)}`} topLabel={"Stamina Refresh Bonus"} topColor={"lime"} bottomValue={`x${getRefreshIndex(armor.armorClass)}`} bottomColor={"#ac38ea"} bottomLabel={"Tether Refresh Bonus"} />

                    <ArmorBigIconDivider size={48} iconLabel={"Dodge Agility Multiplier"} icon={FaRunning} topValue={`x${getDodgeIndex(armor.armorClass)+1}`} topLabel={"Dodge Evade"} bottomValue={`x${getDodgeIndex(armor.armorClass)}`} bottomLabel={"Dodge Block"} />

                    <ArmorBigIconDivider size={48} iconLabel={"mDEF"} icon={MdOutlineDirectionsWalk} topValue={`${armor.armorClass == "heavy" ? ((currentSheet?.isUnlocked("evadeWithHeavyArmor") ?? false) ? 1 : "N/A") : 2}`} topLabel={"Evade Base Speed"} bottomValue={`${armor.armorClass == "heavy" ? 1 : 2}`} bottomLabel={"Block Base Speed"} />
                </Box>

            </Box>


        </Paper>
    )
}

export default ArmorElement