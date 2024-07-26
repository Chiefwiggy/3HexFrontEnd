import React, {useEffect, useState} from 'react';
import {Alert, Box, Button} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import WeaponEnchantmentCard from "../Equipment/WeaponEnchantmentCard";
import {IWeaponEnchantmentData} from "../../Data/ICharacterData";
import useAPI from "../../Hooks/useAPI/useAPI";

interface IEquipmentTabInput {

}

const EquipmentTab = ({}: IEquipmentTabInput) => {

    const {currentSheet} = useCharacter();

    const {WeaponData} = usePreloadedContent();

    const [currentWeaponMetadata, setCurrentWeaponMetadata] = useState<Array<IWeaponEnchantmentData>>([])

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);


    useEffect(() => {
        if (currentSheet) {
            const weaponDataCopy = currentSheet.data.knownWeapons.map(weapon => ({ ...weapon }));
            setCurrentWeaponMetadata(weaponDataCopy);
        }
    }, []);

    const handleChangeData = (delta: number, index: number) => {
        setJustUpdated(false);
        const nData: Array<IWeaponEnchantmentData> = [...currentWeaponMetadata]
        nData[index].enchantmentLevel += delta;
        setCurrentWeaponMetadata(nData);
    }

    const {CharacterAPI} = useAPI();

    const saveData = async() => {
        if (currentSheet) {
            currentSheet.data.knownWeapons = currentWeaponMetadata.map(weapon => ({...weapon}));
            await CharacterAPI.UpdateWeaponsList(currentSheet.data._id, currentWeaponMetadata);
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
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px"
                }}
            >
                {
                    currentWeaponMetadata.map(((weaponStruct, index) => {
                        const weapon = WeaponData.GetCardById(weaponStruct.baseId);
                        if (weapon) {
                            return (
                                <WeaponEnchantmentCard weaponData={weapon} index={index} callback={handleChangeData} weaponMetadata={weaponStruct} key={weapon._id}/>
                            )
                        } else {
                            return <></>
                        }
                    }))
                }
            </Box>
        </Box>
    ) : <></>
}

export default EquipmentTab