import React, {useState} from 'react';
import {
    Box, Button,
    Card, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    Typography
} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";
import SpellBaseCard from "../Cards/SpellBaseCard";
import {ISpellBaseCardData, ISpellModifierCardData} from "../../Data/ICardData";
import SpellModifierCard from "../Cards/SpellModifierCard";
import SourceList from './SourceList';
import {AddOutlined, CloseOutlined} from "@mui/icons-material";
import useUser from "../../Hooks/useUser/useUser";
import useAPI from "../../Hooks/useAPI/useAPI";
import {useNavigate} from "react-router-dom";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";

interface ISourceComponentInput {
    sourceData: ISourceData
}

const SourceComponent = ({sourceData}: ISourceComponentInput) => {

    const [currentIndex, setCurrentIndex] = useState(0);

     const [dialogOpen, setDialogOpen] = useState(false);

    const {loggedIn, charactersOwned} = useUser();

    const [charAdd, setCharAdd] = useState("");

    const {CharacterAPI} = useAPI();

    const navigate = useNavigate();

    const handleChangeCharacter = (event: SelectChangeEvent) => {
        setCharAdd(event.target.value)
    }

    const handleOpen = () => {
        if (loggedIn) {
            setDialogOpen(true);
        }
    }

    const handleCloseDialog = () => {
        setCharAdd("");
        setDialogOpen(false);
    }

    const handleSubmit = async() => {

        const char = charactersOwned.find(e => e._id === charAdd);
        if (char) {
            char.knownSources.push({
                sourceId: sourceData._id,
                attunementLevel: 10
            })
            await CharacterAPI.UpdateSourceList(char._id, char.knownSources)
            navigate(`/characters?id=${char._id}`)
        }
        handleCloseDialog();
    }

    const handleSetIndex = (newIndex: number) => (event: React.MouseEvent<any>) => {
        setCurrentIndex(newIndex);
    }

    return (
        <Card elevation={2} sx={{
            padding: "12px",
            margin: "12px"
        }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center"
                }}
            >
                {sourceData.sourceName}
            </Typography>
            <Typography
                variant={"subtitle1"}
                sx={{
                    color: "lightgrey",
                    textAlign: "center"
                }}
            >
                {sourceData.sourceArcanotype.toUpperCase()}
            </Typography>
            <Divider sx={{margin: "12px"}} />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr"
                }}
            >
                <Box>
                    <SourceList sourceData={sourceData} handleSetIndex={handleSetIndex} currentIndex={currentIndex}/>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        {
                            sourceData.sourceTiers[currentIndex].cardType == "base" ?
                                <SpellBaseCard cardData={sourceData.sourceTiers[currentIndex].cardData as ISpellBaseCardData} sendBack={()=>{}} canFavorite={false} isExpanded={true} canToggleExpand={false}/>
                                :
                                <SpellModifierCard cardData={sourceData.sourceTiers[currentIndex].cardData as ISpellModifierCardData} sendBack={() => {}} canFavorite={false}  isExpanded={true} canToggleExpand={false}/>
                        }

                    </Box>
                </Box>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <IconButton onClick={handleOpen}><AddOutlined /></IconButton>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                fullWidth
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography variant="h4">Add {sourceData.sourceName} to Character</Typography>
                        <Box
                        sx={{
                            marginTop: "-12px",
                            marginRight: "-20px"
                        }}>
                            <IconButton
                                onClick={handleCloseDialog}
                            >
                                <CloseOutlined />
                            </IconButton>
                        </Box>

                    </Box>
                </DialogTitle>
                <DialogContent>
                    <FormControl margin={"dense"}>
                        <InputLabel id="barracks-weapon">Weapon</InputLabel>
                        <Select
                            labelId={"barracks-weapon"}
                            label={"Weapon"}
                            value={charAdd}
                            onChange={handleChangeCharacter}
                            margin="dense"
                            sx={{
                                minWidth: "200px"
                            }}
                        >
                            {
                                    charactersOwned.filter(char => {
                                        const r = char.knownSources.findIndex(w => w.sourceId === sourceData._id)
                                        return r < 0;

                                    }).map(char => {
                                        return (
                                            <MenuItem key={char._id} value={char._id}>{char.characterName}</MenuItem>
                                        )
                                    })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button disabled={charAdd == ""} onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default SourceComponent