import React from 'react'
import {ICharacterBaseData} from "../../Data/ICharacterData";
import {Box, Button, Card, Divider, IconButton, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useEventHistory from "../../Hooks/useEventHistory/useEventHistory";
import {Link, useNavigate} from "react-router-dom";
import {getClassesString} from "../../Utils/Shorthand";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import {ArrowForwardOutlined} from "@mui/icons-material";
import useImageLibrary from "../../Hooks/useImageLibrary/useImageLibrary";


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

    const {GetImageById} = useImageLibrary();



    return (
        <Card
            sx={{
                display: "grid",
                gridTemplateColumns: characterData.characterImageKey ? "5fr 2fr 1fr" : "7fr 1fr",
                border: characterData.isMainCharacter ? "1px inset gold" : "",
                backgroundColor: characterData.isDead ? "rgba(159,66,66,0.3)" : "inherit"
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
                <Typography variant={"body2"} sx={{
                    textAlign: "center"
                }}>{ characterData.characterName.length > 28 ? characterData.characterName.substring(0, 25).trimEnd() + "..." : characterData.characterName}</Typography>
                <Typography variant={"body2"} color={"darkgray"} sx={{
                    textAlign: "center"
                }}>Level {characterData.characterLevel} </Typography>
                <Typography variant={"body2"} color={"darkgray"} sx={{
                    textAlign: "center"
                }}>{getClassesString(characterData.classes)} </Typography>
                <Typography variant={"body2"} color={"darkgray"} sx={{
                    textAlign: "center"
                }}>Owner: {characterData.creatorName} </Typography>

            </Box>
            {
                characterData.characterImageKey ?

                    <Box
                       component={"img"}
                       src={`${GetImageById(characterData.characterImageKey).imageUrl}`}
                       sx={{
                            width: "100%",
                           alignSelf: "center"
                      }}
                    >

                    </Box>
                    :
                    <></>
            }
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