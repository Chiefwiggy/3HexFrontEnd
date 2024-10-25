import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import SettingsDangerActions from "../Components/SettingsPanel/SettingsDangerActions";

interface ISettingsPanelInput {

}

const SettingsPanel = ({}: ISettingsPanelInput) => {



    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Typography variant={"h4"}>Settings</Typography>
            </Box>
            <Box>
                <SettingsDangerActions />
            </Box>

        </Box>
    )
}

export default SettingsPanel