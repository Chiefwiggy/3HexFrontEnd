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

    const handleGoToCharacterMetadata = (event: React.MouseEvent) => {
        characterData.__times_accessed += 2;
    }



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
                <Typography variant={characterData.characterName.length > 22 ? "body1" : "h6"}>{ characterData.characterName.length > 28 ? characterData.characterName.substring(0, 25).trimEnd() + "..." : characterData.characterName}</Typography>
                <Typography variant={"body2"} color={"darkgray"}>Level {characterData.characterLevel} </Typography>
                <Typography variant={"body2"} color={"darkgray"}>{getClassesString(characterData.classes)} </Typography>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <IconButton component={Link} to={`/characters?id=${characterData._id}`} onClick={handleGoToCharacterMetadata}><ArrowForwardOutlined /></IconButton>
            </Box>
        </Card>
    )
}

export default CharacterSelectCard;