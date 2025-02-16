import React, {useEffect, useState} from 'react';
import {Box, Divider, IconButton, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {getMaxArmorEnchant} from "../../Utils/ArmorCalc";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import ArmorElement from "../Armor/ArmorElement";
import {IShield} from "../../Data/IArmorData";
import ShieldElement from "../Armor/ShieldElement";

interface IEquipShieldWidgetInput {
    currentShield: IShield | undefined,
    handleChangeSelectedShield: (enchantment: number, shieldId: string | undefined) => void;
}

const EquipShieldWidget = ({
    currentShield,
    handleChangeSelectedShield
}: IEquipShieldWidgetInput) => {

    const { ShieldData} = usePreloadedContent();
    const {currentSheet, charPing, isReady} = useCharacter();

    const [currentShieldMax, setcurrentShieldMax] = useState(0);
    const [currentEnchant, setCurrentEnchant] = useState(0);



    useEffect(() => {
        if (currentSheet && currentShield) {
            console.log("storen down");
            setcurrentShieldMax(getMaxArmorEnchant(currentSheet, currentShield.armorClass))

            setCurrentEnchant(currentShield.enchantmentLevel);
            console.log(currentEnchant, currentShieldMax);
        } else {
            setcurrentShieldMax(0);
            setCurrentEnchant(0);
        }
    }, [charPing, currentShield, isReady, currentShield?.enchantmentLevel]);

    useEffect(() => {
        console.log("cam:" + currentShieldMax);
    }, [currentShieldMax])


    const handleChangeEnchantment = (delta: number) => () => {
        if (currentShield) {
            handleChangeSelectedShield(currentShield.enchantmentLevel + delta, currentShield?._id ?? undefined)
        }
    }

    const handleChangeShield = (event: SelectChangeEvent<string>) => {
        handleChangeSelectedShield(0, event.target.value)
    }


    return currentSheet ? (
        <Box>
            <Typography variant={"h6"}>Shield</Typography>
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
                            value={currentShield?._id ?? ""}
                            onChange={handleChangeShield}
                            sx={{
                                minWidth: "200px"
                            }}
                        >
                            <MenuItem value={undefined} sx={{color: "darkgray"}}>Unarmored</MenuItem>
                            {
                                ShieldData.GetAllBaseData().map(ad => {
                                    return (
                                        <MenuItem value={ad._id} key={ad._id}>{ad.shieldName}</MenuItem>
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
                                disabled={currentShield ? currentEnchant >= currentShieldMax : true}
                            >
                                <AddCircleOutlined />
                            </IconButton>
                        </Box>
                    </Box>


                    <Divider sx={{margin: "6px"}} />
                    {
                        currentShield ?
                            <ShieldElement shield={currentShield} enchantmentLevel={currentEnchant} />
                            :
                            <>No Shield Equipped...</>
                    }

                </Box>
            </Box>
        </Box>


    ) : <></>
}

export default EquipShieldWidget