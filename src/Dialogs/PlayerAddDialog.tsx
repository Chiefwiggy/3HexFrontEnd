import React, {SetStateAction, useState} from 'react';
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel, MenuItem,
    Select, SelectChangeEvent,
    Typography
} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";
import useAPI from "../Hooks/useAPI/useAPI";
import {useNavigate} from "react-router-dom";
import useUser from "../Hooks/useUser/useUser";
import {ICharacterBaseData} from "../Data/ICharacterData";

interface IPlayerAddDialogInput {
    dialogState: boolean,
    setDialogState: React.Dispatch<SetStateAction<boolean>>,
    closeAction: () => Promise<void>
    dialogTitle: string,
    filterFunction: (char: ICharacterBaseData) => boolean
    submitFunction: (char: ICharacterBaseData) => Promise<void>,
    doNavigate?: boolean
}

const PlayerAddDialog = ({
    dialogState,
    setDialogState,
    closeAction,
    dialogTitle,
    filterFunction,
    submitFunction,
    doNavigate = true
}: IPlayerAddDialogInput) => {

    const [charAdd, setCharAdd] = useState("");

    const {CharacterAPI} = useAPI();
    const navigate = useNavigate();
    const {loggedIn, charactersOwned} = useUser();
    const handleCloseDialog = async() => {
        setCharAdd("");
        setDialogState(false);
        await closeAction();
    }

    const handleChangeCharacter = (event: SelectChangeEvent) => {
        setCharAdd(event.target.value)
    }

    const handleSubmit = async(event: React.MouseEvent) => {
        const char = charactersOwned.find(e => e._id === charAdd);
        if (char) {
            await submitFunction(char);
            setCharAdd("");
            setDialogState(false);
            if (doNavigate) {
                navigate(`/characters?id=${char._id}`)
            }
        }

    }


    return (
        <Dialog
            open={dialogState}
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
                    <Typography variant="h4">{dialogTitle}</Typography>
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
                    <InputLabel id="barracks-weapon">Character</InputLabel>
                    <Select
                        labelId={"barracks-weapon"}
                        label={"Character"}
                        value={charAdd}
                        onChange={handleChangeCharacter}
                        margin="dense"
                        sx={{
                            minWidth: "200px"
                        }}
                    >
                        {
                                charactersOwned.filter(filterFunction).map(char => {
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
    )
}

export default PlayerAddDialog