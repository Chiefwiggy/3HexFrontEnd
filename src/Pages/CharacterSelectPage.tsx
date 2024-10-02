import React from 'react';
import {Box} from "@mui/material";
import CharacterSelectView from "../Views/CharacterSelectView";
import {Helmet} from "react-helmet";

interface ICharacterSelectPageInput {

}

const CharacterSelectPage = ({}: ICharacterSelectPageInput) => {
    return (
        <Box>
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Character Select - Ursura</title>
            </Helmet>
            <CharacterSelectView />
        </Box>
    )
}

export default CharacterSelectPage