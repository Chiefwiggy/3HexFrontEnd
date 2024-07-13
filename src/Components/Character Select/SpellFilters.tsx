import React, {useState} from 'react'
import {Box, Button, IconButton} from "@mui/material";
import {USpellTypes} from "../../Data/ICardData";
import {FavoriteBorderOutlined, FavoriteOutlined} from "@mui/icons-material";

interface ISpellFiltersInput {
    canCreateSpell: boolean,
    createSpellCallback: () => (event: React.MouseEvent) => void,
    sendSpellFilterCallback: (type: USpellTypes | "favorite") => (event: React.MouseEvent) => void
}

const SpellFilters = ({
    canCreateSpell,
    createSpellCallback,
    sendSpellFilterCallback
}: ISpellFiltersInput) => {

    const [currentFilter, setCurrentFilter] = useState<USpellTypes | "favorite">(null);

    const handleFilterButton = (type: USpellTypes | "favorite") => (event: React.MouseEvent) => {
        if (currentFilter !== type) {
            setCurrentFilter(type);
            sendSpellFilterCallback(type)(event);
        } else {
            setCurrentFilter(null)
            sendSpellFilterCallback(null)(event);
        }

    }


    return (
        <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                <IconButton
                    onClick={handleFilterButton("favorite")}
                >
                    {
                        currentFilter == "favorite" ? <FavoriteOutlined /> : <FavoriteBorderOutlined />
                    }
                </IconButton>
                <Button variant={currentFilter == "base" ? "outlined" : "text"} onClick={handleFilterButton("base")}>Bases</Button>
                <Button variant={currentFilter == "target" ? "outlined" : "text"} onClick={handleFilterButton("target")}>Targets</Button>
                <Button variant={currentFilter == "skill" ? "outlined" : "text"} onClick={handleFilterButton("skill")}>Skills</Button>
                <Button variant={currentFilter == "edict" ? "outlined" : "text"} onClick={handleFilterButton("edict")}>Edicts</Button>
                <Button variant={"contained"} onClick={createSpellCallback()} disabled={!canCreateSpell}>Create Spell</Button>
            </Box>
    )
}

export default SpellFilters