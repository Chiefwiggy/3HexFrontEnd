import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {IWeaponBaseData} from "../../Data/ICardData";
import {
    AddCircleOutlined,
    AutoFixNormalOutlined,
    BackHandOutlined,
    CloseOutlined,
    RemoveCircleOutlined, UndoOutlined
} from "@mui/icons-material";
import {ConstructFinalWeapon, ScaleChainNumeric} from "../../Utils/ConstructFinalWeapon";
import useAPI from "../../Hooks/useAPI/useAPI";
import {IEnchantmentData} from "../../Data/ICharacterData";
import {getSkillFormat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IWeaponEnchantmentCardInput {
    weaponData: IWeaponBaseData,
    weaponMetadata: IEnchantmentData,
    primedToDelete: boolean,
    index: number
    callback: (delta: number, index: number) => void,
    deleteCallback: (doDelete: boolean, index: number) => void
}

const WeaponEnchantmentCard = ({
    weaponData,
    weaponMetadata,
    primedToDelete,
    index,
    callback,
    deleteCallback
}: IWeaponEnchantmentCardInput) => {



    const handleEditEnchantment = (delta: number) => (event: React.MouseEvent) => {
        callback(delta, index);
    }

    const handleSetRemoveWeapon = (doRemove: boolean) => () => {
        deleteCallback(doRemove, index);
    }

    const {currentSheet} = useCharacter();


    return currentSheet ? (
        <Box>

            <Paper
                elevation={1}
                sx={{
                    borderRadius: "20px",
                    padding: "12px",
                    display: "grid",
                    gridTemplateColumns: "2fr 3fr 2fr",
                    gap: "4px",
                    opacity: primedToDelete ? 0.6 : 1,
                    border: primedToDelete ? "1px solid red" : "0px solid white",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <Typography sx={{ userSelect: "none"}}>{weaponData.cardName} +{weaponMetadata.enchantmentLevel}</Typography>
                        <Typography variant={"body2"} sx={{ userSelect: "none"}}>{currentSheet.getHandedness(weaponData.weaponClass, weaponData.handedness, weaponMetadata.enchantmentLevel)}</Typography>
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2
                        }}
                    >
                            <IconButton
                                onClick={handleEditEnchantment(-1)}
                                disabled={weaponMetadata.enchantmentLevel < 1}
                            >
                                <RemoveCircleOutlined />
                            </IconButton>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {weaponData.damageType == "physical" ? <BackHandOutlined /> : <AutoFixNormalOutlined />}
                                <Typography sx={{ userSelect: "none"}}> {currentSheet.getSkillRequirementString(weaponData, weaponMetadata.enchantmentLevel)}</Typography>
                            </Box>
                            <IconButton
                                onClick={handleEditEnchantment(1)}
                                disabled={weaponMetadata.enchantmentLevel >= currentSheet.getMaxWeaponForClass(weaponData.weaponClass, weaponData.handedness)}
                            >
                                <AddCircleOutlined />
                            </IconButton>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "flex-end"
                    }}
                >
                    <Box>
                        <Typography sx={{userSelect: "none",fontSize: "14px"}}>Hit: {getSkillFormat(ScaleChainNumeric(weaponData.baseHit, weaponMetadata.enchantmentLevel))}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{userSelect: "none",fontSize: "14px"}}>Damage: {ScaleChainNumeric(weaponData.basePower, weaponMetadata.enchantmentLevel)} </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{userSelect: "none",fontSize: "14px"}}>Crit: +{ScaleChainNumeric(weaponData.baseCrit, weaponMetadata.enchantmentLevel)}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{userSelect: "none",fontSize: "14px"}}>Potency: x{ScaleChainNumeric(weaponData.potency, weaponMetadata.enchantmentLevel, false)}</Typography>
                    </Box>
                </Box>
            </Paper>
            <Box
                sx={{
                    marginLeft: "-16px",
                    marginTop: "-20px"
                }}
            >
                {
                    primedToDelete ?
                        <IconButton
                            onClick={handleSetRemoveWeapon(false)}
                        ><UndoOutlined /></IconButton>
                        :
                        <IconButton
                            onClick={handleSetRemoveWeapon(true)}
                        ><CloseOutlined /></IconButton>
                }
            </Box>
        </Box>
    ) : <></>
}

export default WeaponEnchantmentCard