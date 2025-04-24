import React, {useEffect, useState} from 'react';
import {Box, Divider, IconButton, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {getMaxArmorEnchant} from "../../Utils/ArmorCalc";
import ArmorElement from "../Armor/ArmorElement";
import {IArmor} from "../../Data/IArmorData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IEnchantmentData} from "../../Data/ICharacterData";

interface IEquipArmorWidgetInput {
    currentArmor: IArmor | undefined,
    handleChangeSelectedArmor: (enchantment: number, armorId: string | undefined) => void
}

const EquipArmorWidget = ({
    currentArmor,
    handleChangeSelectedArmor
}: IEquipArmorWidgetInput) => {

    const { ArmorData} = usePreloadedContent();
    const {currentSheet, charPing, isReady} = useCharacter();

    const [currentArmorMax, setCurrentArmorMax] = useState(0);
    const [currentEnchant, setCurrentEnchant] = useState(0);



    useEffect(() => {
        if (currentSheet && currentArmor) {
            setCurrentArmorMax(getMaxArmorEnchant(currentSheet, currentArmor.armorClass))

            setCurrentEnchant(currentArmor.enchantmentLevel);
            console.log(currentEnchant, currentArmorMax);
        } else {
            setCurrentArmorMax(0);
            setCurrentEnchant(0);
        }
    }, [charPing, currentArmor, isReady, currentArmor?.enchantmentLevel]);

    useEffect(() => {
        console.log("cam:" + currentArmorMax);
    }, [currentArmorMax])


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
                                ArmorData.GetAllBaseData().sort((a,b) => {
                                    if (a.armorClass != b.armorClass) {
                                        return ["light", "standard", "heavy"].indexOf(a.armorClass) - ["light", "standard", "heavy"].indexOf(b.armorClass);
                                    } else {
                                        return a.armorName.localeCompare(b.armorName)
                                    }
                                }).map(ad => {
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
                                disabled={currentEnchant <= 0}
                            >
                                <RemoveCircleOutlined />
                            </IconButton>
                            <Typography variant={"body1"} >{(currentEnchant)}</Typography>
                            <IconButton
                                onClick={handleChangeEnchantment(1)}
                                disabled={currentArmor ? currentEnchant >= currentArmorMax : true}
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