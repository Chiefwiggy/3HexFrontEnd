import React from 'react';
import {Box} from "@mui/material";
import CharacterSelectView from "../Views/CharacterSelectView";

interface ICharacterSelectPageInput {

}

const CharacterSelectPage = ({}: ICharacterSelectPageInput) => {
    return (
        <Box>
            <CharacterSelectView />
        </Box>
    )
}

export default CharacterSelectPage