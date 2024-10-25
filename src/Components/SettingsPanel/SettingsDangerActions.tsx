import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import SimpleClosableDialog from "../Generic/SimpleClosableDialog";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useAPI from "../../Hooks/useAPI/useAPI";
import {useNavigate} from "react-router-dom";
import useUser from "../../Hooks/useUser/useUser";

interface ISettingsDangerActionsInput {

}

const SettingsDangerActions = ({}: ISettingsDangerActionsInput) => {

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [confirmationDialog, setConfirmationDialog] = useState<string>("");
    const [canDelete, setCanDelete] = useState<boolean>(false);

    const {currentSheet} = useCharacter();
    const {CharacterAPI} = useAPI();
    const {RemoveCharacterFromUser} = useUser();

    const navigate = useNavigate();

    const handleConfirmationInput = (event: React.ChangeEvent<HTMLInputElement> ) => {
        if (currentSheet) {
            setConfirmationDialog(event.target.value);
            if (event.target.value === currentSheet.data.characterName) {
                setCanDelete(true);
            } else {
                setCanDelete(false);
            }
        }
    }

    const handleDeleteDialogPanel = (open: boolean) => () => {
        setDeleteDialogOpen(open);
    }

    const handleSubmitDelete = async() => {
        if (currentSheet) {
            const result = await CharacterAPI.DeleteCharacter(currentSheet.data._id);
            if (result.status == 200) {
                await RemoveCharacterFromUser(currentSheet.data._id);
                navigate("/character_select")
            }
        }
    }


    return currentSheet ? (
        <Box>
            <Button variant="outlined" color="error" onClick={handleDeleteDialogPanel(true)}>Delete Character</Button>


            <SimpleClosableDialog
                title={"Delete Character"}
                buttons={
                    [
                        {
                            label: "Don't Delete",
                            variant: "contained",
                            color: "stamina",
                            action: handleDeleteDialogPanel(false),
                        },
                        {
                            label: "Delete Permanently",
                            variant: "contained",
                            color: "health",
                            action: handleSubmitDelete,
                            disableCondition: !canDelete
                        }
                    ]
                }
                content={
                    <Box>
                        <Typography sx={{paddingBottom: "12px"}}>
                            Please type
                            <Box
                                sx={{
                                    fontSize: "1.2rem",
                                    padding: 1,
                                    color: "#8e6dbd"
                                }}
                                component={"span"}
                            >
                                 {currentSheet.data.characterName}
                            </Box>
                            to delete.
                        </Typography>

                        <TextField
                            label={"Type Character's Name"}
                            variant="outlined"
                            value={confirmationDialog}
                            onChange={handleConfirmationInput}
                            fullWidth={true}
                        />
                    </Box>
                }
                isOpen={isDeleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                fullWidth={true}
                runOnClose={
                    () => {
                        setConfirmationDialog("");
                        setCanDelete(false)
                    }
                }
            />
        </Box>
    ) : <></>
}

export default SettingsDangerActions