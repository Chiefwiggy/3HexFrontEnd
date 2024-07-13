

import React, {useEffect, useState} from "react";
import {Box, Button, Drawer, Tab, Tabs, TextField} from "@mui/material";
import CharacterSheetView from "../Views/CharacterSheetView";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import CharacterSelectView from "../Views/CharacterSelectView";
import CharacterSheetFullView from "../Views/CharacterSheetFullView";


const HomePage = () => {


    return (
        <Box>
            <CharacterSelectView />
        </Box>
    )
}

export default HomePage;