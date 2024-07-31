import React from 'react';
import {Box, Button, Card, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface ICompendiumSelectInput {
    text: string
    linkTo: string
}

const CompendiumSelect = ({text, linkTo}: ICompendiumSelectInput) => {

    const navigate = useNavigate();

    const handleLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(linkTo)
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
            <Typography variant={"h5"}>{text}</Typography>
            <br />
            <Button variant={"contained"} onClick={handleLinkClick}>Go!</Button>
        </Card>
    )
}

export default CompendiumSelect