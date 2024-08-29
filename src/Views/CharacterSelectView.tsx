import React, {useEffect, useState} from 'react'
import {Box, Button, Typography} from "@mui/material";
import {ICharacterBaseData} from "../Data/ICharacterData";
import CharacterSelectCard from "../Components/Character Select/CharacterSelectCard";
import Axios from 'axios'
import useAPI from "../Hooks/useAPI/useAPI";
import useUser from "../Hooks/useUser/useUser";
import {useNavigate} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";


const CharacterSelectView = () => {

    const [allCharacters, setAllCharacters] = useState<Array<ICharacterBaseData>>([]);

    const {CharacterAPI} = useAPI();
    const {loggedIn, charactersOwned} = useUser();


    useEffect(() => {
        if (loggedIn) {
            setAllCharacters(charactersOwned)
        } else {
            setAllCharacters([]);
        }
    }, [charactersOwned]);

    const navigate = useNavigate();

    const handleGotoNewCharacter = (event: React.MouseEvent) => {
        navigate("/new/character")
    }

    return (
        <Box>
            <Box
                sx={{
                    padding: "12px",
                    display: 'grid',
                    gridTemplateColumns: "repeat(3, 1fr)"
                }}
            >
                <Box></Box>
                <Typography variant="h3" component="div" textAlign={"center"}>My Characters</Typography>
                {
                    loggedIn ?
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: "center",
                                paddingLeft: "20px",
                                flexDirection: "row-reverse"
                            }}
                        >
                            <Button
                                variant={"contained"}
                                onClick={handleGotoNewCharacter}
                            ><AddOutlined/> New Character</Button>
                        </Box>
                        :
                        <Box></Box>
                }

            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1,
                    margin: 4
                }}
            >
                {
                    allCharacters.map((character: ICharacterBaseData) => {
                        return <CharacterSelectCard characterData={character} key={character.characterName}/>
                    })
                }
            </Box>
        </Box>

    )

}

export default CharacterSelectView