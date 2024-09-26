import React from 'react'
import {ICharacterBaseData} from "../../Data/ICharacterData";
import {Button, Card, Divider, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useEventHistory from "../../Hooks/useEventHistory/useEventHistory";
import {useNavigate} from "react-router-dom";


interface ICharacterSelectCardInput {
    characterData: ICharacterBaseData
}
const CharacterSelectCard = ({
    characterData
}: ICharacterSelectCardInput) => {

    const {SetCurrentSheet} = useCharacter();
    const navigate = useNavigate();


    const handleSelectCharacter = () => {
        navigate(`/characters?id=${characterData._id}`)
    }


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                padding: 4
            }}
        >
            <Typography variant={"h5"}>{characterData.characterName}</Typography>
            <Typography variant={"body2"} color={"gray"}>Level {characterData.characterLevel} • {characterData.classes.at(-1)?.className} / {characterData.classes.at(-2)?.className}</Typography>
            <br />
            <Button variant={"contained"} onClick={handleSelectCharacter}>Use</Button>
        </Card>
    )
}

export default CharacterSelectCard;