import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import CharacterSheetFullView from "../Views/CharacterSheetFullView";
import {useLocation, useNavigate} from "react-router-dom";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import useAPI from "../Hooks/useAPI/useAPI";
import CharacterConnection from "../Connections/CharacterConnection";
import DataLoadingScreen from "../Components/SmallComponents/DataLoadingScreen";

interface ICharacterPageInput {

}

const CharacterPage = ({}: ICharacterPageInput) => {

    const query = new URLSearchParams(useLocation().search);

    const {SetCurrentSheet, currentSheet, isReady} = useCharacter();
    const {CharacterAPI} = useAPI();

    const [doLoad, setDoLoad] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            SetCurrentSheet(await CharacterAPI.GetCharacter(query.get("id") ?? ""));
            console.log("GOT");
        })();
    }, []);

    useEffect(() => {
        setDoLoad(isReady);
    }, [isReady]);



    return doLoad ? (
        <Box>
            <CharacterSheetFullView />
        </Box>
    ) : <DataLoadingScreen message={`${currentSheet?.data.characterName} is loading...`}/>
}

export default CharacterPage