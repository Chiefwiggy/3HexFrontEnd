import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import VerticalLinearBar from "../../Generic/VerticalLinearBar";


interface IPoleProgressInput {
    currentXP: number
}

const PoleProgress = ({currentXP}: IPoleProgressInput) => {



    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentXPTowardsNextLevel, setCurrentXPTowardsNextLevel] = useState(0);
    const [currentXPToLevel, setCurrentXPToLevel] = useState(100);

    useEffect(() => {
        calculateXP()
    }, [currentXP]);

    useEffect(() => {
        calculateXP()
    }, []);

    const calculateXP = () => {
        setCurrentLevel(Math.floor(currentXP / 100));
        setCurrentXPTowardsNextLevel(currentXP % 100);
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    borderRadius: "50%",
                    backgroundColor: "#343434",
                    width: "100px",
                    height: "100px",
                    paddingTop: "4px",
                    paddingLeft: "4px"
                }}
            >
                <CircularProgress variant={"determinate"} value={100} thickness={8} size={92} />

            </Box>
            <Box
                    sx={{
                        position: "absolute",
                        marginTop: "36px",
                    }}
                >
                    <Typography variant={"h5"} sx={{
                        fontWeight: "bold"
                    }}>{currentLevel}</Typography>
                </Box>
            <Box
                sx={{
                    marginTop: "-10px",
                    height: "300px",
                    zIndex: -1
                }}
            >
                <VerticalLinearBar variant={"determinate"} value={100*(currentXPTowardsNextLevel/currentXPToLevel)} />
            </Box>

        </Box>
    )
}

export default PoleProgress