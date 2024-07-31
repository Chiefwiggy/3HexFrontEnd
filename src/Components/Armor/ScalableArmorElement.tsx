import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    IconButton,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    Typography
} from "@mui/material";
import {IArmor, IBaseArmorData} from "../../Data/IArmorData";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {ConstructFinalArmor} from "../../Utils/ConstructFinalWeapon";
import ArmorElement from "./ArmorElement";
import SimpleClosableDialog from "../Generic/SimpleClosableDialog";
import useAPI from "../../Hooks/useAPI/useAPI";
import {useNavigate} from "react-router-dom";
import useUser from "../../Hooks/useUser/useUser";

interface IScalableArmorElementInput {
    armor: IBaseArmorData
}

const ScalableArmorElement = ({armor}: IScalableArmorElementInput) => {

    const [currentEnchantment, setCurrentEnchantment] = useState(0);
    const [currentArmor, setCurrentArmor] = useState<IArmor|null>(null)

    useEffect(() => {
        setCurrentArmor(ConstructFinalArmor(armor, currentEnchantment));
    }, [currentEnchantment]);
    const handleChangeEnchantment = (delta: number) => (event: React.MouseEvent) => {
        setCurrentEnchantment(currentEnchantment + delta)
    }

    const [addDialog, setAddDialog] = useState(false);

    const handleSubmitAddDialog = async() => {

        const char = charactersOwned.find(e => e._id === charAdd);
        if (char) {
            const edata = {
                baseId: armor._id,
                enchantmentLevel: currentEnchantment,
            }
            char.currentArmor = edata;
            await CharacterAPI.UpdateArmor(char._id, edata)
            navigate(`/characters?id=${char._id}`)
        }

        setAddDialog(false);
    }

    const handleCancelAddDialog = () => {
        setAddDialog(false);
    }

    const handleChangeDialogPanel = (open: boolean) => (event: React.MouseEvent) => {
        setAddDialog(open);
    }
    const [charAdd, setCharAdd] = useState("");
    const {CharacterAPI} = useAPI();

    const navigate = useNavigate();
    const {loggedIn, charactersOwned} = useUser();
    const handleChangeCharacter = (event: SelectChangeEvent) => {
        setCharAdd(event.target.value);
    }

    return currentArmor ? (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",

            }}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <IconButton
                        onClick={handleChangeEnchantment(-1)}
                        disabled={currentEnchantment <= 0}
                    >
                        <RemoveCircleOutlined />
                    </IconButton>
                    <Typography variant={"body1"} >{armor.armorName}</Typography>
                    <IconButton
                        onClick={handleChangeEnchantment(1)}
                        disabled={currentEnchantment >= 10}
                    >
                        <AddCircleOutlined />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <ArmorElement armor={currentArmor} enchantmentLevel={currentEnchantment} />
            </Box>
            <br />
            <Box>
                <Button variant={"contained"} onClick={handleChangeDialogPanel(true)}>Add</Button>
            </Box>
            <SimpleClosableDialog
                title={"Add Armor to Character"}
                buttons={[
                    {
                        label: "Cancel",
                        variant: "contained",
                        color: "error",
                        action: handleCancelAddDialog,
                    },
                    {
                        label: "Submit",
                        variant: "contained",
                        action: handleSubmitAddDialog
                    }
                ]}
                isOpen={addDialog}
                setIsOpen={setAddDialog}
                content={
                    <Box>
                        <Typography>Add {armor.armorName} +{currentEnchantment} to a character?</Typography>
                        <br />
                        <FormControl margin={"dense"}>
                            <InputLabel id="barracks-armor">Armor</InputLabel>
                            <Select
                                labelId={"barracks-armor"}
                                label={"Weapon"}
                                value={charAdd}
                                onChange={handleChangeCharacter}
                                margin="dense"
                                sx={{
                                    minWidth: "200px"
                                }}
                            >
                                {
                                        charactersOwned.filter(char => {
                                            return !(char.currentArmor?.baseId === armor._id && char.currentArmor?.enchantmentLevel === currentEnchantment)
                                        }).map(char => {
                                            return (
                                                <MenuItem key={char._id} value={char._id}>{char.characterName}</MenuItem>
                                            )
                                        })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                }
                fullWidth={true}
            />

        </Box>
    ) : <></>
}

export default ScalableArmorElement