import React, {useEffect, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {ICharacterBaseData} from "../Data/ICharacterData";
import CharacterSelectCard from "../Components/Character Select/CharacterSelectCard";
import Axios from 'axios'
import useAPI from "../Hooks/useAPI/useAPI";
import useUser from "../Hooks/useUser/useUser";
import {Link, useNavigate} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";


const CharacterSelectView = () => {

    const [allCharacters, setAllCharacters] = useState<Array<ICharacterBaseData>>([]);

    const {CharacterAPI} = useAPI();
    const {loggedIn, charactersOwned, userPermissions} = useUser();

    const [currentFilter, setCurrentFilter] = useState<string>();

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilter(event.target.value)
    }


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
                    loggedIn && (userPermissions.includes("registered") || userPermissions.includes("admin")) ?
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
                    padding: "2px 20%"
                }}
            >
                <TextField
                    value={currentFilter}
                    onChange={handleFilterChange}
                    placeholder={"Type here to filter..."}
                    fullWidth={true}
                    autoComplete="off"
                />
            </Box>
            {
                allCharacters.length > 0
                ?
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "repeat( auto-fill , max(264px, 15vw))",
                        gridGap: "10px",
                        margin: 4
                    }}
                >
                    {
                        allCharacters.filter(
                            char =>
                                currentFilter ? (char.characterName.toLowerCase().includes(currentFilter.toLowerCase()) || char.classes.map(clz => clz.className.toLowerCase()).includes(currentFilter.toLowerCase())) : true)
                            .sort((a, b) => {
                                if (a.isMainCharacter != b.isMainCharacter) {
                                    return b.isMainCharacter ? 1 : -1;
                                } else if (b.__times_accessed != a.__times_accessed) {
                                    return b.__times_accessed - a.__times_accessed
                                } else {
                                    return a.characterName.localeCompare(b.characterName);
                                }
                            })
                            .map((character: ICharacterBaseData) => {
                            return <CharacterSelectCard characterData={character} key={character.characterName}/>
                        })
                    }
                </Box>
                    :
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant={"body1"}>Seems you don't have any characters... maybe you should create one!</Typography>
                    </Box>

            }

        </Box>

    )

}

export default CharacterSelectView