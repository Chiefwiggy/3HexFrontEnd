import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useAPI from "../Hooks/useAPI/useAPI";



interface ICreateCharacterPageInput {

}

const CreateCharacterPage = ({}: ICreateCharacterPageInput) => {

    const [charName, setCharName] = useState("");

    const navigate = useNavigate();

    const {CharacterAPI, UserAPI} = useAPI();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharName(event.target.value);
    }

    const handleSubmit = async(event: React.MouseEvent) => {
        const data = await CharacterAPI.CreateCharacter(charName);
        await UserAPI.AddCharacterToUser(data.data.data._doc._id);
        navigate("/");
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
            <Typography variant="body2">What would you like to name your character?</Typography>
            <TextField
                label={"Character Name"}
                variant={"outlined"}
                value={charName}
                onChange={handleChange}
                sx={{
                    marginTop: 2
                }}
                autoComplete={"off"}
            />
            <br />
            <br />
            <Button onClick={handleSubmit}>Create</Button>
        </Box>
    )
}

export default CreateCharacterPage