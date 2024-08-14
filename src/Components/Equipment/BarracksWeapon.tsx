import React, {useState} from 'react';
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton, InputLabel, MenuItem,
    Select, SelectChangeEvent,
    Typography
} from "@mui/material";
import {IWeaponBaseData} from "../../Data/ICardData";
import WeaponBaseCard from "../Cards/WeaponBaseCard";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import {
    AddCircleOutlined,
    CloseOutlined,
    RemoveCircleOutlined
} from "@mui/icons-material";
import useUser from "../../Hooks/useUser/useUser";
import useAPI from "../../Hooks/useAPI/useAPI";
import {IEnchantmentData} from "../../Data/ICharacterData";
import {useNavigate} from "react-router-dom";

interface IBarracksWeaponInput {
    weaponData: IWeaponBaseData
}

const BarracksWeapon = ({
    weaponData
}: IBarracksWeaponInput) => {

    const [currentScaling, setCurrentScaling] = useState(0);

    const [dialogOpen, setDialogOpen] = useState(false);

    const {loggedIn, charactersOwned} = useUser();

    const [charAdd, setCharAdd] = useState("");

    const {CharacterAPI} = useAPI();

    const navigate = useNavigate();

    const handleChangeCharacter = (event: SelectChangeEvent) => {
        setCharAdd(event.target.value)
    }

    const handleSendback = (cardData: ICardSendbackData) => {
        if (loggedIn) {
            setDialogOpen(true);
        }
    }

    const handleEditEnchantment = (delta: number) => (event: React.MouseEvent) => {
        setCurrentScaling(currentScaling + delta);
    }

    const handleCloseDialog = () => {
        setCharAdd("");
        setDialogOpen(false);
    }

    const handleSubmit = async() => {

        const char = charactersOwned.find(e => e._id === charAdd);
        if (char) {
            const existingEntryIndex = char.knownWeapons.findIndex(kw => kw.baseId === weaponData._id);
            if (existingEntryIndex >= 0) {
                if (char.knownWeapons[existingEntryIndex].enchantmentLevel != currentScaling) {
                    char.knownWeapons[existingEntryIndex].enchantmentLevel = currentScaling;
                    await CharacterAPI.UpdateWeaponsList(char._id, char.knownWeapons);
                    navigate(`/characters?id=${char._id}`)
                }
            } else {
                char.knownWeapons.push({
                    baseId: weaponData._id,
                    enchantmentLevel: currentScaling,
                });
                await CharacterAPI.UpdateWeaponsList(char._id, char.knownWeapons);
                navigate(`/characters?id=${char._id}`)
            }
        }
        handleCloseDialog();
    }

    return (
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 2
                }}
            >
                <IconButton
                    onClick={handleEditEnchantment(-1)}
                    disabled={currentScaling < 1}
                >
                    <RemoveCircleOutlined />
                </IconButton>
                <Typography variant={"h6"} sx={{userSelect: "none"}}>{weaponData.cardName}</Typography>
                <IconButton
                    onClick={handleEditEnchantment(1)}
                    disabled={currentScaling >= 10}
                >
                    <AddCircleOutlined />
                </IconButton>
            </Box>
            <WeaponBaseCard cardData={ConstructFinalWeapon(weaponData, currentScaling)} sendBack={handleSendback} canFavorite={false} />
        </Box>
        <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            fullWidth
        >
            <DialogTitle>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h4">Add {weaponData.cardName} +{currentScaling} to Character</Typography>
                    <Box
                    sx={{
                        marginTop: "-12px",
                        marginRight: "-20px"
                    }}>
                        <IconButton
                            onClick={handleCloseDialog}
                        >
                            <CloseOutlined />
                        </IconButton>
                    </Box>

                </Box>
            </DialogTitle>
            <DialogContent>
                <FormControl margin={"dense"}>
                    <InputLabel id="barracks-weapon">Weapon</InputLabel>
                    <Select
                        labelId={"barracks-weapon"}
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
                                    const r = char.knownWeapons.findIndex(w => w.baseId === weaponData._id && currentScaling === w.enchantmentLevel);
                                    return r < 0;

                                }).map(char => {
                                    return (
                                        <MenuItem key={char._id} value={char._id}>{char.characterName}</MenuItem>
                                    )
                                })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button disabled={charAdd == ""} onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default BarracksWeapon