import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, useMediaQuery} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import WeaponEnchantmentCard from "../Equipment/WeaponEnchantmentCard";
import {IEnchantmentData} from "../../Data/ICharacterData";
import useAPI from "../../Hooks/useAPI/useAPI";

interface IEquipmentTabInput {

}

const EquipmentTab = ({}: IEquipmentTabInput) => {

    const {currentSheet} = useCharacter();

    const {WeaponData} = usePreloadedContent();

    const [currentWeaponMetadata, setCurrentWeaponMetadata] = useState<Array<IEnchantmentData>>([])

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [primedToDelete, setPrimedToDelete] = useState<Array<boolean>>([]);


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
        console.log(nData);
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
            await CharacterAPI.UpdateWeaponsList(currentSheet.data._id, newWeaponArray);
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
    ) : <></>
}

export default EquipmentTab