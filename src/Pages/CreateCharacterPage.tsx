import React, {useState} from 'react';
import {
    Box, Button, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl,
    SelectChangeEvent
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useAPI from "../Hooks/useAPI/useAPI";
import {Helmet} from "react-helmet";
import useUser from "../Hooks/useUser/useUser";

interface ICreateCharacterPageInput {}

const CreateCharacterPage = ({}: ICreateCharacterPageInput) => {
    const [charName, setCharName] = useState("");
    const [isMainCharacter, setIsMainCharacter] = useState(false);
    const [campaignId, setCampaignId] = useState("principego");

    const {userPermissions} = useUser();
    const navigate = useNavigate();
    const {CharacterAPI, UserAPI} = useAPI();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharName(event.target.value);
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMainCharacter(event.target.checked);
    }

    const handleCampaignChange = (event: SelectChangeEvent<string>) => {
        setCampaignId(event.target.value);
    }

    const handleSubmit = async(event: React.MouseEvent) => {
        const data = await CharacterAPI.CreateCharacter(charName, campaignId, isMainCharacter);
        const newCharId = data.data.data._doc._id;
        const resp = await UserAPI.AddCharacterToUser(newCharId);
        navigate(`/characters?id=${newCharId}`);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20
            }}
        >
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Create Character - Ursura</title>
            </Helmet>

            <Typography variant="body2">What would you like to name your character?</Typography>
            <TextField
                label={"Character Name"}
                variant={"outlined"}
                value={charName}
                onChange={handleChange}
                sx={{ marginTop: 2 }}
                autoComplete={"off"}
            />

            <FormControlLabel
                control={
                    <Checkbox checked={isMainCharacter} onChange={handleCheckboxChange} />
                }
                label="Main Character?"
                sx={{ marginTop: 2 }}
            />

            <FormControl sx={{ marginTop: 2, minWidth: 200 }} variant="outlined">
                <InputLabel id="campaign-label">Campaign</InputLabel>
                <Select
                    labelId="campaign-label"
                    id="campaign-select"
                    value={campaignId}
                    onChange={handleCampaignChange}
                    label="Campaign" // This ensures the label doesn't get crossed out
                >
                    <MenuItem value="principego">Principego</MenuItem>
                    <MenuItem value="elkarand">Elkarand</MenuItem>
                    <MenuItem value="demo">Demo</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                </Select>
            </FormControl>

            <br />
            <Button onClick={handleSubmit} sx={{ marginTop: 3 }}>Create</Button>
        </Box>
    );
}

export default CreateCharacterPage;
