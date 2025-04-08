import React, {useState} from 'react';
import {Box, Divider, IconButton, Paper} from "@mui/material";
import ConsumableCard from "../Items/ConsumableCard";
import {IConsumableTemplate} from "../../Data/IConsumable";
import {AddOutlined, HorizontalRule, PlusOneOutlined} from "@mui/icons-material";
import PlayerAddDialog from '../../Dialogs/PlayerAddDialog'
import {ICharacterBaseData} from "../../Data/ICharacterData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useAPI from "../../Hooks/useAPI/useAPI";
import ConsumableCard_New from '../Items/ConsumableCard_New';

interface IBarracksConsumableInput {
    consumable: IConsumableTemplate
}

const BarracksConsumable = ({consumable}: IBarracksConsumableInput) => {


    const [isOpen, setIsOpen] = useState(false);

    const {CharacterAPI} = useAPI();


    const filterFunction = (char: ICharacterBaseData) => {
        return !char.knownConsumables.map(e => e.consumableId).includes(consumable._id);
    }

    const submitFunction = async(char: ICharacterBaseData) => {
        char.knownConsumables.push({
            consumableId: consumable._id,
            prepared: 0,
            amount: 0
        });
        await CharacterAPI.UpdateConsumables(char._id, char.knownConsumables);
    }

    return (
        <Box>
        <Paper
            elevation={1}
            sx={{
                display: "grid",
                gridTemplateColumns: "7fr 1fr",
                borderRadius: "12px"
            }}
        >
            <ConsumableCard_New consumableTemplate={consumable} defaultScaled={false} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box>
                    <IconButton onClick={() => setIsOpen(true)}><AddOutlined /></IconButton>
                </Box>

            </Box>

            <PlayerAddDialog
                dialogState={isOpen}
                setDialogState={setIsOpen}
                closeAction={async() => {}}
                dialogTitle={`Add ${consumable.itemName} to Character`}
                filterFunction={filterFunction}
                submitFunction={submitFunction}
            />
        </Paper>
        </Box>
    )
}

export default BarracksConsumable