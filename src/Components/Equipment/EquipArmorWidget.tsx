import React, {useState} from 'react';
import {Box, Divider, IconButton, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {getMaxArmorEnchant} from "../../Utils/ArmorCalc";
import ArmorElement from "../Armor/ArmorElement";
import {IArmor} from "../../Data/IArmorData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IEquipArmorWidgetInput {
    currentArmor: IArmor | undefined,
    handleChangeSelectedArmor: (enchantment: number, armorId: string | undefined) => void
}

const EquipArmorWidget = ({
    currentArmor,
    handleChangeSelectedArmor
}: IEquipArmorWidgetInput) => {

    const { ArmorData} = usePreloadedContent();
    const {currentSheet} = useCharacter();


    const handleChangeEnchantment = (delta: number) => () => {
        if (currentArmor) {
            handleChangeSelectedArmor(currentArmor.enchantmentLevel + delta, currentArmor?._id ?? undefined)
        }
    }

    const handleChangeArmor = (event: SelectChangeEvent<string>) => {
        handleChangeSelectedArmor(0, event.target.value)
    }


    return currentSheet ? (
        <Box>
            <Typography variant={"h6"}>Armor</Typography>
            <Box>
                <Box
                    sx={{
                        padding: "12px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "space-around"
                        }}
                    >
                        <Select
                            value={currentArmor?._id ?? ""}
                            onChange={handleChangeArmor}
                            sx={{
                                minWidth: "200px"
                            }}
                        >
                            <MenuItem value={undefined} sx={{color: "darkgray"}}>Unarmored</MenuItem>
                            {
                                ArmorData.GetAllBaseData().map(ad => {
                                    return (
                                        <MenuItem value={ad._id} key={ad._id}>{ad.armorName}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <IconButton
                                onClick={handleChangeEnchantment(-1)}
                                disabled={(currentArmor?.enchantmentLevel ?? 0) <= 0}
                            >
                                <RemoveCircleOutlined />
                            </IconButton>
                            <Typography variant={"body1"} >{(currentArmor?.enchantmentLevel ?? 0)}</Typography>
                            <IconButton
                                onClick={handleChangeEnchantment(1)}
                                disabled={currentArmor ? currentArmor.enchantmentLevel >= getMaxArmorEnchant(currentSheet, currentArmor?.armorClass) : true}
                            >
                                <AddCircleOutlined />
                            </IconButton>
                        </Box>
                    </Box>


                    <Divider sx={{margin: "6px"}} />
                    {
                        currentArmor ?
                            <ArmorElement armor={currentArmor} enchantmentLevel={currentArmor.enchantmentLevel} />
                            :
                            <>No Armor Equipped...</>
                    }

                </Box>
            </Box>
        </Box>


    ) : <></>
}

export default EquipArmorWidget