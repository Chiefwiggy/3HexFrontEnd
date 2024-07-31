import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {Diamond, DiamondOutlined, RefreshOutlined} from "@mui/icons-material";

interface IActionPointsPanelInput {

}

const ActionPointsPanel = ({}: IActionPointsPanelInput) => {

    const {currentSheet, healthPing} = useCharacter();

    const [currentAP, setCurrentAP] = useState<number>(0);

    useEffect(() => {
        if (currentSheet) {
            setCurrentAP(currentSheet.data.currentActionPoints)
        }

    }, [healthPing]);

    const handleUseActionPoint = () => {
        if (currentSheet) {
            currentSheet?.useActionPoint()
            setCurrentAP(currentAP-1);
        }
    }

    return currentSheet ? (
        <Box>
            <Box>
                <Button
                    variant="contained"
                    color={"secondary"}
                    onClick={handleUseActionPoint}
                    sx={{
                        marginBottom: 2
                    }}
                >
                    <Typography> Use AP </Typography>
                    <DiamondOutlined/>
                </Button>
            </Box>
            <Box>
                <Typography>AP: {currentAP} / {currentSheet.getActionPointsMax()}</Typography>
            </Box>


        </Box>
    ) : <></>
}

export default ActionPointsPanel