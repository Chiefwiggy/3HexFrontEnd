import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {UCritDie} from "../../Data/ICardData";
import DieIcon from "../Generic/DieIcon";



interface IDiceExplanationCardInput {
    dice: Array<UCritDie>,
    title: string,
    subtitle?: string,
    value: string
}

const DiceExplanationCard = ({dice, title, subtitle="", value}: IDiceExplanationCardInput) => {
    return (
        <Paper elevation={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "12px",
                minWidth: "504px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Typography variant={"h4"}>{title}</Typography>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center"
                }}
            >
                {
                    dice.map(die => {
                        return (
                            <DieIcon value={die} size={80} />
                        )
                    })
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        width: "400px"
                    }}
                    variant={"body2"}
                    textAlign={"center"}
                >
                    {subtitle}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Box
                    sx={{
                        padding: "12px",
                        border: "2px inset #121212",
                        backgroundColor: "#232323",
                        borderRadius: "4px",
                        width: "120px",
                        marginTop: "12px"

                    }}
                >
                    <Typography textAlign={"center"} variant={"h6"}>+{value}</Typography>

                </Box>
            </Box>
        </Paper>
    )
}

export default DiceExplanationCard