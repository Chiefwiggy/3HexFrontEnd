import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Divider, IconButton,
    MenuItem,
    Select,
    SelectChangeEvent, TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import WeaponEnchantmentCard from "../Equipment/WeaponEnchantmentCard";
import {IEnchantmentData} from "../../Data/ICharacterData";
import useAPI from "../../Hooks/useAPI/useAPI";
import ArmorElement from "../Armor/ArmorElement";
import {IArmor} from "../../Data/IArmorData";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {getMaxArmorEnchant} from "../../Utils/ArmorCalc";

interface IEquipmentTabInput {

}

const EquipmentTab = ({}: IEquipmentTabInput) => {

    const {currentSheet} = useCharacter();

    const {WeaponData, ArmorData} = usePreloadedContent();

    const [currentWeaponMetadata, setCurrentWeaponMetadata] = useState<Array<IEnchantmentData>>([])

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [primedToDelete, setPrimedToDelete] = useState<Array<boolean>>([]);

    const [currentArmor, setCurrentArmor] = useState<IArmor | undefined>(undefined);

    const [currentEnchantmentArmor, setCurrentEnchantmentArmor] = useState<number>(0);

    useEffect(() => {
        if (currentSheet) {
            setCurrentArmor(currentSheet.currentArmor)
            setCurrentEnchantmentArmor(currentSheet.currentArmor?.enchantmentLevel ?? 0);
        }

    }, [currentSheet]);

    const handleChangeEnchantment = (delta: number) => () => {
        setCurrentEnchantmentArmor(currentEnchantmentArmor + delta)
        setJustUpdated(false);
    }

    const handleChangeSelectedArmor = (event: SelectChangeEvent<string>) => {
        setCurrentEnchantmentArmor(0);
        changeSelectedArmor(event.target.value);
        setJustUpdated(false);
    }


    const changeSelectedArmor = (armorId: string) => {
        setCurrentArmor(ArmorData.GetConstructedArmorById(armorId, currentEnchantmentArmor) ?? undefined)
    }

    useEffect(() => {
        if (currentArmor) {
            changeSelectedArmor(currentArmor._id);
        }
    }, [currentEnchantmentArmor]);


    useEffect(() => {
        if (currentSheet) {
            const weaponDataCopy = currentSheet.data.knownWeapons.map(weapon => ({ ...weapon }));
            setCurrentWeaponMetadata(weaponDataCopy);
            setPrimedToDelete(Array(weaponDataCopy.length).fill(false));
        }
    }, []);

    const handleChangeData = (delta: number, index: number) => {
        setJustUpdated(false);
        const nData: Array<IEnchantmentData> = [...currentWeaponMetadata]
        nData[index].enchantmentLevel += delta;
        setCurrentWeaponMetadata(nData);
    }

    const handleDeleteData = (doDelete: boolean, index: number) => {
        setJustUpdated(false);
        const nData: Array<boolean> = [...primedToDelete];

        nData[index] = doDelete;
        setPrimedToDelete(nData);
    }

    const {CharacterAPI} = useAPI();

    const isTablet = useMediaQuery("(max-width: 1400px)");

    const saveData = async() => {
        if (currentSheet) {
            const newWeaponArray: Array<IEnchantmentData> = [];
            primedToDelete.forEach((value, index) => {
                if (!value) {
                    newWeaponArray.push(currentWeaponMetadata[index]);
                }
            })
            currentSheet.data.knownWeapons = newWeaponArray
            const nArmorData = currentSheet.UpdateArmor(currentArmor);
            await CharacterAPI.UpdateWeaponsAndArmorList(currentSheet.data._id, newWeaponArray, nArmorData);
            setCurrentWeaponMetadata(newWeaponArray);
            setPrimedToDelete(Array(newWeaponArray.length).fill(false));
            currentSheet.manualCharPing()
            setJustUpdated(true);
            setShowStatus(true);
            setTimeout(() => {
                setShowStatus(false);
            }, 2000)
        }
    }

    const cancelSaveData = () => {
        if (currentSheet) {
            setJustUpdated(true);
            const weaponDataCopy = currentSheet.data.knownWeapons.map(weapon => ({ ...weapon }));
            setCurrentWeaponMetadata(weaponDataCopy);
            setPrimedToDelete(Array(weaponDataCopy.length).fill(false));
            setCurrentArmor(currentSheet.currentArmor);
            if (currentSheet.currentArmor) {
                setCurrentEnchantmentArmor(currentSheet.currentArmor.enchantmentLevel);
            }

        }
    }

    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row-reverse"
                }}
            >

                <Button onClick={cancelSaveData} color={"error"} disabled={justUpdated}> Cancel </Button>
                <Button onClick={saveData} color={"success"} disabled={justUpdated}> Save </Button>

                <Alert severity="success" sx={{
                    transition: 'opacity 1s ease-out',
                    opacity: showStatus ? 1 : 0
                }}> Success! </Alert>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "5fr 2fr"
                }}
            >
                <Box>
                    <Typography variant={"h6"}>Weapons</Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: isTablet ? "1fr" : "repeat(2, 1fr)",
                            gap: "12px"
                        }}
                    >
                        {
                            currentWeaponMetadata.map(((weaponStruct, index) => {
                                const weapon = WeaponData.GetCardById(weaponStruct.baseId);
                                if (weapon) {
                                    return (
                                        <WeaponEnchantmentCard weaponData={weapon} index={index} callback={handleChangeData} weaponMetadata={weaponStruct} key={weapon._id} primedToDelete={primedToDelete[index]} deleteCallback={handleDeleteData} />
                                    )
                                } else {
                                    return <Box key={index}></Box>
                                }
                            }))
                        }
                    </Box>
                </Box>
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
                                    onChange={handleChangeSelectedArmor}
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
                                        disabled={currentEnchantmentArmor <= 0}
                                    >
                                        <RemoveCircleOutlined />
                                    </IconButton>
                                    <Typography variant={"body1"} >{currentEnchantmentArmor}</Typography>
                                    <IconButton
                                        onClick={handleChangeEnchantment(1)}
                                        disabled={currentArmor ? currentEnchantmentArmor >= getMaxArmorEnchant(currentSheet, currentArmor?.armorClass) : true}
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

            </Box>


        </Box>
    ) : <></>
}

export default EquipmentTab