import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {IWeaponBaseData} from "../../Data/ICardData";
import {AddCircleOutlined, BackHandOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {ConstructFinalWeapon, ScaleChainNumeric} from "../../Utils/ConstructFinalWeapon";
import useAPI from "../../Hooks/useAPI/useAPI";
import {IWeaponEnchantmentData} from "../../Data/ICharacterData";
import {getSkillFormat} from "../../Utils/Shorthand";

interface IWeaponEnchantmentCardInput {
    weaponData: IWeaponBaseData,
    weaponMetadata: IWeaponEnchantmentData,
    index: number
    callback: (delta: number, index: number) => void
}

const WeaponEnchantmentCard = ({
    weaponData,
    weaponMetadata,
    index,
    callback
}: IWeaponEnchantmentCardInput) => {



    const handleEditEnchantment = (delta: number) => (event: React.MouseEvent) => {
        callback(delta, index);
    }


    return (
        <Box
            sx={{
                backgroundColor: "#343434",
                borderRadius: "20px",
                padding: "12px",
                display: "grid",
                gridTemplateColumns: "2fr 2fr 2fr",
                gap: "4px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Typography sx={{ userSelect: "none"}}>{weaponData.cardName} +{weaponMetadata.enchantmentLevel}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "center",
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
                                alignItems: "center"
                            }}
                        >
                            <BackHandOutlined />
                            <Typography sx={{ userSelect: "none", width: "12px"}}>{ScaleChainNumeric(weaponData.skillRequirement, weaponMetadata.enchantmentLevel)}</Typography>
                        </Box>
                        <IconButton
                            onClick={handleEditEnchantment(1)}
                            disabled={weaponMetadata.enchantmentLevel >= 10}
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
        </Box>
    )
}

export default WeaponEnchantmentCard