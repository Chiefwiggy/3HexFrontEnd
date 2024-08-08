import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, LinearProgress, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {AddCircleOutlined, Diamond, DiamondOutlined, RefreshOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import {Utils} from "../../Utils/LanguageLacking";

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

    const handleActionPointChange = (delta: number) => (event: React.MouseEvent) => {
        if (currentSheet) {
            currentSheet.changeActionPoints(delta);
            setCurrentAP(currentAP+delta);
        }
    }

    return currentSheet ? (
        <Box>
            <Typography textAlign={"center"}>Action Points</Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >
                <IconButton onClick={handleActionPointChange(-1)}><RemoveCircleOutlined/></IconButton>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "4px"
                    }}
                >
                    {
                        Array(currentSheet.getActionPointsMax()).fill(0).map((_, index) => {
                            return (
                                <LinearProgress key={index} value={ Utils.Clamp((currentSheet.data.currentActionPoints)-(index), 0, 1)*100} variant={"determinate"} sx={{
                                    height: 14,
                                    width: 14,
                                    borderRadius: 10
                                }} />
                            )
                        })
                    }


                    {/*<Typography>AP: {currentAP} / {currentSheet.getActionPointsMax()}</Typography>*/}
                </Box>
                <IconButton onClick={handleActionPointChange(1)}> <AddCircleOutlined /></IconButton>
            </Box>



        </Box>
    ) : <></>
}

export default ActionPointsPanel