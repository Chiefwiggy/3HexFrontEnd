import React, {useState} from 'react';
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {IEnchantmentData} from "../../Data/ICharacterData";
import {IWeaponBaseData} from "../../Data/ICardData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {BackHandOutlined, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {GiAnvilImpact, GiRearAura, GiStarMedal, GiSwordHilt, GiSwordSmithing} from "react-icons/gi";
import CkSwordTwoHanded from '../Icons/CkSwordTwoHanded';
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {FaCircleInfo} from "react-icons/fa6";
import {MdMilitaryTech, MdReadMore} from "react-icons/md";
import {PiKeyReturn} from "react-icons/pi";
import {ScaleChainNumeric} from "../../Utils/ConstructFinalWeapon";
import {getSkillFormat} from "../../Utils/Shorthand";


interface IWeaponEnchantmentCard_NewInput {
    weaponData: IWeaponBaseData,
    weaponMetadata: IEnchantmentData,
    callback: (delta: number, twoHanded: boolean, sharpened: boolean, id: string) => void
}

const WeaponEnchantmentCard_New = ({
   weaponData,
   weaponMetadata,
   callback
}: IWeaponEnchantmentCard_NewInput) => {

    const [isDetailedPage, setDetailedPage] = useState<boolean>(false)

    const handleEditEnchantment = (delta: number) => (event: React.MouseEvent) => {
        callback(delta, weaponMetadata.efficientUse ?? false, weaponMetadata.improvements == 1, weaponData._id)
    }

    const handleSharpen = () => {
        callback(0, weaponMetadata.efficientUse ?? false, weaponMetadata.improvements == 0, weaponData._id)
    }

    const handleTwoHand = () => {
        callback(0, !weaponMetadata.efficientUse ?? true, weaponMetadata.improvements == 1, weaponData._id)
    }



    const {currentSheet} = useCharacter();

    return currentSheet ? (
        <Box>
            <Paper
                elevation={1}
                sx={{
                    borderRadius: "20px",
                    padding: "12px",
                    gridTemplateColumns: "10fr 2fr 2fr 1fr",
                    display: "grid"
                }}
            >
                {
                    isDetailedPage ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box>
                                <Typography textAlign={"center"}>{weaponData.cardName} +{weaponMetadata.enchantmentLevel}
                                    <Typography fontSize={14} component={"span"} color={"grey"} sx={{paddingLeft: "4px"}}>{currentSheet.getHandedness(weaponData.weaponClass, weaponData.handedness, weaponMetadata.enchantmentLevel)}</Typography>
                                </Typography>

                                <Typography fontSize={14} color={"grey"} textAlign={"center"}>{weaponData.isCreatureWeapon ? "Commander" : (weaponData.damageType == "magical" ? "Arcanist" : "Warrior")} {weaponMetadata.enchantmentLevel} • {weaponData.damageType == "magical" ? "Presence" : "Skill"} {ScaleChainNumeric(weaponData.skillRequirement, weaponMetadata.enchantmentLevel)}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    width: "100%",
                                    justifyItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography fontSize={14}>HIT: {getSkillFormat(ScaleChainNumeric(weaponData.baseHit, weaponMetadata.enchantmentLevel+(weaponMetadata.improvements ?? 0 )+(weaponMetadata.efficientUse? 1 : 0)))}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize={14}>DMG: {ScaleChainNumeric(weaponData.basePower, weaponMetadata.enchantmentLevel+(weaponMetadata.improvements ?? 0 )+(weaponMetadata.efficientUse? 1 : 0))}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize={14}>CRIT: {ScaleChainNumeric(weaponData.baseCrit, weaponMetadata.enchantmentLevel+(weaponMetadata.improvements ?? 0 )+(weaponMetadata.efficientUse? 1 : 0))}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize={14}>POT: x{ScaleChainNumeric(weaponData.potency, weaponMetadata.enchantmentLevel+(weaponMetadata.improvements ?? 0 )+(weaponMetadata.efficientUse? 1 : 0), false)}</Typography>
                                </Box>


                            </Box>

                        </Box>
                        :
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <Typography fontSize={"1.3rem"}>{weaponData.cardName} +{weaponMetadata.enchantmentLevel}</Typography>
                            <Typography variant={"body2"}>{currentSheet.getHandedness(weaponData.weaponClass, weaponData.handedness, weaponMetadata.enchantmentLevel)} • {weaponData.isCreatureWeapon ? "Commander" : (weaponData.damageType == "magical" ? "Arcanist" : "Warrior")} {weaponMetadata.enchantmentLevel} </Typography>
                            <BoxWithTooltip title={weaponData.isCreatureWeapon ? "Authority Requirement" : (weaponData.damageType == "magical" ? "Presence Requirement" : "Skill Requirement")} placement={"bottom"}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingTop: "4px"
                                    }}
                                >
                                    {
                                        weaponData.isCreatureWeapon ?
                                            <MdMilitaryTech size={24}/>
                                            : (
                                        weaponData.damageType == "magical"
                                        ?
                                            <GiRearAura size={24}/>
                                            :
                                            <GiSwordHilt size={24}/>
                                            )
                                    }
                                    <Typography>{ScaleChainNumeric(weaponData.skillRequirement, weaponMetadata.enchantmentLevel)}</Typography>

                                </Box>
                            </BoxWithTooltip>


                        </Box>
                }

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "column"
                    }}
                >
                    <Box>
                        <IconButton onClick={handleSharpen}>
                            <GiAnvilImpact color={(weaponMetadata.improvements ?? 0) > 0 ? "gold" : "gray"}/>
                        </IconButton>
                    </Box>
                    {
                        currentSheet.getHandedness(weaponData.weaponClass, weaponData.handedness, weaponMetadata.enchantmentLevel) == "Versatile" && currentSheet.isUnlocked("ironGrasp")
                        ?
                            <IconButton onClick={handleTwoHand}>
                                <CkSwordTwoHanded color={(weaponMetadata.efficientUse ?? false) ? "gold" : "gray"}/>
                            </IconButton>
                            :
                            <></>
                    }

                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Button color={"secondary"} size={"small"} sx={{padding: "4px 0"}} onClick={handleEditEnchantment(1)} disabled={!weaponData.canScale}>
                            <KeyboardArrowUp/>
                        </Button>
                    </Box>
                    <Typography variant={"h6"} textAlign={"center"} fontSize={20}>
                        {weaponMetadata.enchantmentLevel}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Button color={"secondary"} size={"small"} sx={{padding: "4px 0"}} onClick={handleEditEnchantment(-1)} disabled={weaponMetadata.enchantmentLevel === 0 || !weaponData.canScale} >
                            <KeyboardArrowDown/>
                        </Button>

                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column",
                        height: "100%"
                    }}
                >
                    {
                        isDetailedPage ?
                            <IconButtonWithTooltip title={"More Details"} placement={"top"} onClick={() => {
                                setDetailedPage(false)
                            }}>
                                <PiKeyReturn size={24}/>
                            </IconButtonWithTooltip>
                            :
                            <IconButtonWithTooltip title={"More Details"} placement={"top"} onClick={() => {
                                setDetailedPage(true)
                            }}>
                                <MdReadMore size={24}/>
                            </IconButtonWithTooltip>
                    }

                </Box>
            </Paper>

        </Box>
    ) :  <></>
}

export default WeaponEnchantmentCard_New