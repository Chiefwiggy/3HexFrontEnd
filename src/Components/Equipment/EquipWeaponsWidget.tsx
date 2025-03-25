import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button, Checkbox, Chip,
    Divider,
    IconButton,
    MenuItem,
    Select, TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import WeaponEnchantmentCard from "./WeaponEnchantmentCard";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {AddCircleOutlined, CheckBox, CheckBoxOutlineBlank, RemoveCircleOutlined} from "@mui/icons-material";
import {getMaxArmorEnchant} from "../../Utils/ArmorCalc";
import ArmorElement from "../Armor/ArmorElement";
import {IWeaponBaseData} from "../../Data/ICardData";
import {IEnchantmentData} from "../../Data/ICharacterData";
import WeaponEnchantmentCard_New from "./WeaponEnchantmentCard_New";

interface IEquipWeaponsWidgetInput {
    currentWeaponMetadata: Array<IEnchantmentData>,
    setWeaponData: (weaponData: Array<IEnchantmentData>) => void
}

interface ISimplifiedWeaponData {
    cardName: string,
    _id: string
}

const EquipWeaponsWidget = ({
    currentWeaponMetadata,
    setWeaponData
}: IEquipWeaponsWidgetInput) => {

    const isTablet = useMediaQuery("(max-width: 1400px)");

    const {WeaponData} = usePreloadedContent();

    const [weaponSelectedData, setWeaponSelectedData] = useState<Array<ISimplifiedWeaponData>>([]);

    useEffect(() => {
        setWeaponSelectedData(WeaponData.GetCardsByEnchantmentValues(currentWeaponMetadata).map(e => {
            return {
                cardName: e.cardName,
                _id: e._id
            } as ISimplifiedWeaponData
        }));
    }, [currentWeaponMetadata]);


    const handleAutocomplete = (event: SyntheticEvent<any>, value: Array<ISimplifiedWeaponData>) => {
        setWeaponSelectedData(value);
        const enchantmentData: Array<IEnchantmentData> = value.map(e => {
            const oldValue = currentWeaponMetadata.find(old => old.baseId === e._id);
            if (oldValue) {
                return {
                    baseId: e._id,
                    enchantmentLevel: oldValue.enchantmentLevel,
                }
            }
            return {
                baseId: e._id,
                enchantmentLevel: 0
            }
        })
        setWeaponData(enchantmentData);
    }

    const handleChangeEnchantment = (delta: number, twoHanded: boolean, sharpened: boolean, id: string) => {
        const newWeaponsArray = currentWeaponMetadata.map(e => {
            if (e.baseId === id) {
                return {
                    baseId: e.baseId,
                    enchantmentLevel: e.enchantmentLevel + delta,
                    improvements: sharpened ? 1 : 0,
                    efficientUse: twoHanded
                }
            } else {
                return e
            }
        })
        setWeaponData(newWeaponsArray);
    }

    const isOneColumn = useMediaQuery("(max-width: 1853px)");

    return (
        <Box>
            <Typography variant={"h6"}>Weapons</Typography>
            <Box
                sx={{
                    padding: "12px"
                }}
            >
                <Autocomplete
                    multiple
                    filterSelectedOptions={true}
                    onChange={handleAutocomplete}
                    renderInput={(params) => {
                        return (
                            <TextField {...params} label={""} placeholder={"Weapons"}/>
                        )
                    }}
                    options={WeaponData.GetAllStandardWeapons().map(e => {
                        return {
                            cardName: e.cardName,
                            _id: e._id
                        } as ISimplifiedWeaponData
                    })}
                    getOptionLabel={(option) => option.cardName}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    value={weaponSelectedData}
                    renderOption={(props: any, option, { selected }) => {
                        return (
                            <li {...props} key={option._id}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize={"small"} />}
                                    checkedIcon={<CheckBox fontSize={"small"} />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.cardName}
                            </li>
                        );
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option._id} label={option.cardName} />
                      ))
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: "6px"
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: isOneColumn ? "1fr" : "repeat( auto-fill , max(264px, 19vw))",
                        gridGap: "10px"
                    }}
                >
                    {
                        WeaponData.GetCardPreparedStruct(currentWeaponMetadata).map((e, index) => {
                            return (
                                <WeaponEnchantmentCard_New key={e._id} weaponData={e} weaponMetadata={currentWeaponMetadata.find(md => md.baseId === e._id) ?? {baseId: e._id, enchantmentLevel: 0}} callback={handleChangeEnchantment} />
                            )
                        })

                    }

                </Box>


            </Box>
        </Box>
    )
}

export default EquipWeaponsWidget