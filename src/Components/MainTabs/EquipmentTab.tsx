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
import {IEnchantmentData} from "../../Data/ICharacterData";
import useAPI from "../../Hooks/useAPI/useAPI";
import {IArmor, IShield} from "../../Data/IArmorData";
import EquipArmorWidget from "../Equipment/EquipArmorWidget";
import EquipWeaponsWidget from '../Equipment/EquipWeaponsWidget';
import EquipShieldWidget from "../Equipment/EquipShieldWidget";

interface IEquipmentTabInput {

}

const EquipmentTab = ({}: IEquipmentTabInput) => {

    const {currentSheet} = useCharacter();

    const {WeaponData, ArmorData, ShieldData} = usePreloadedContent();

    const [currentWeaponMetadata, setCurrentWeaponMetadata] = useState<Array<IEnchantmentData>>([])
    const [currentArmor, setCurrentArmor] = useState<IArmor | undefined>(undefined);
    const [currentShield, setCurrentShield] = useState<IShield | undefined>(undefined);

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const handleChangeSelectedArmor = (enchantment: number, armorId: string | undefined) => {
        setCurrentArmor(ArmorData.GetConstructedArmorById(armorId ?? "", enchantment) ?? undefined)
        setJustUpdated(false);
    }

    const handleChangeSelectedShield = (enchantment: number, shieldId: string | undefined) => {
        setCurrentShield(ShieldData.GetConstructedShieldById(shieldId ?? "", enchantment) ?? undefined);
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
            setCurrentShield(currentSheet.currentShield)
        }
    }, []);


    const {CharacterAPI} = useAPI();



    const saveData = async() => {
        if (currentSheet) {
            const newWeaponArray: Array<IEnchantmentData> = currentWeaponMetadata;
            currentSheet.data.knownWeapons = newWeaponArray
            const nArmorData = currentSheet.UpdateArmor(currentArmor);
            const nShieldData = currentSheet.UpdateShield(currentShield);
            await CharacterAPI.UpdateWeaponsAndArmorList(currentSheet.data._id, newWeaponArray, nArmorData, nShieldData);
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
                <Box>
                    <EquipArmorWidget currentArmor={currentArmor} handleChangeSelectedArmor={handleChangeSelectedArmor}  />
                    {/*<EquipShieldWidget currentShield={currentShield} handleChangeSelectedShield={handleChangeSelectedShield} />*/}
                </Box>

            </Box>


        </Box>
    ) : <></>
}

export default EquipmentTab