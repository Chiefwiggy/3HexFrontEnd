import React from 'react'
import {ICharacterBaseData} from "../../Data/ICharacterData";
import {Box, Button, Card, Divider, IconButton, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useEventHistory from "../../Hooks/useEventHistory/useEventHistory";
import {Link, useNavigate} from "react-router-dom";
import {getClassesString} from "../../Utils/Shorthand";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import {ArrowForwardOutlined} from "@mui/icons-material";


interface ICharacterSelectCardInput {
    characterData: ICharacterBaseData
}
const CharacterSelectCard = ({
    characterData
}: ICharacterSelectCardInput) => {

    const {SetCurrentSheet} = useCharacter();



    return (
        <Card
            sx={{
                display: "grid",
                gridTemplateColumns: "7fr 1fr",
                border: characterData.isMainCharacter ? "1px inset gold" : ""
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    padding: 3
                }}
            >
                <Typography variant={"h6"}>{characterData.characterName}</Typography>
                <Typography variant={"body2"} color={"gray"}>Level {characterData.characterLevel} - {getClassesString(characterData.classes)}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <IconButton component={Link} to={`/characters?id=${characterData._id}`}><ArrowForwardOutlined /></IconButton>
            </Box>
        </Card>
    )
}

export default CharacterSelectCard;