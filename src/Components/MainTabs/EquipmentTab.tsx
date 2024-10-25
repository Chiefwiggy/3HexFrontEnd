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
import EquipArmorWidget from "../Equipment/EquipArmorWidget";
import EquipWeaponsWidget from '../Equipment/EquipWeaponsWidget';

interface IEquipmentTabInput {

}

const EquipmentTab = ({}: IEquipmentTabInput) => {

    const {currentSheet} = useCharacter();

    const {WeaponData, ArmorData} = usePreloadedContent();

    const [currentWeaponMetadata, setCurrentWeaponMetadata] = useState<Array<IEnchantmentData>>([])
    const [currentArmor, setCurrentArmor] = useState<IArmor | undefined>(undefined);

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const handleChangeSelectedArmor = (enchantment: number, armorId: string | undefined) => {
        setCurrentArmor(ArmorData.GetConstructedArmorById(armorId ?? "", enchantment) ?? undefined)
        setJustUpdated(false);
    }

    const handleChangeSelectedWeapons = (weaponData: Array<IEnchantmentData>) => {
        setCurrentWeaponMetadata(weaponData);
        setJustUpdated(false);
    }

    useEffect(() => {
        if (currentSheet) {
            const weaponDataCopy = currentSheet.data.knownWeapons.map(weapon => ({ ...weapon }));
            setCurrentWeaponMetadata(weaponDataCopy);
            setCurrentArmor(currentSheet.currentArmor);
        }
    }, []);


    const {CharacterAPI} = useAPI();



    const saveData = async() => {
        if (currentSheet) {
            const newWeaponArray: Array<IEnchantmentData> = currentWeaponMetadata;
            currentSheet.data.knownWeapons = newWeaponArray
            const nArmorData = currentSheet.UpdateArmor(currentArmor);
            await CharacterAPI.UpdateWeaponsAndArmorList(currentSheet.data._id, newWeaponArray, nArmorData);
            setCurrentWeaponMetadata(newWeaponArray);
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
            setCurrentArmor(currentSheet.currentArmor);
        }
    }

    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row-reverse",
                    marginBottom: "-42px"
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
                <EquipWeaponsWidget currentWeaponMetadata={currentWeaponMetadata} setWeaponData={handleChangeSelectedWeapons} />
                <EquipArmorWidget currentArmor={currentArmor} handleChangeSelectedArmor={handleChangeSelectedArmor}  />
            </Box>


        </Box>
    ) : <></>
}

export default EquipmentTab