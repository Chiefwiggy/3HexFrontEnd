import React from 'react';
import {Box, capitalize, Paper, Typography} from "@mui/material";
import {ISourceData, UArcanotype} from "../../Data/ISourceData";

interface ISourceByArcanotypeWidgetInput {
    sourceArcanotype: UArcanotype,
    slots: number,
    characterSourcesOfType: Array<ISourceData>
}

const SourceByArcanotypeWidget = ({
    sourceArcanotype,
    slots,
    characterSourcesOfType
}: ISourceByArcanotypeWidgetInput) => {


    return (
        <Paper
            elevation={1}
            sx={{
                padding: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography variant={"h6"}>{sourceArcanotype.toUpperCase()}</Typography>
            <Typography variant={"subtitle2"} color={"darkgray"}> Attuned: {characterSourcesOfType.length} / {slots} </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    paddingTop: "8px",
                    width: "100%"
                }}
            >
                {
                    characterSourcesOfType.map((source, index) => {
                        return (
                            <Paper elevation={3}
                                sx={{
                                    padding: "6px",
                                    backgroundColor: index >= slots ? "darkred" : "#343434",
                                    flexBasis: "45%",
                                    margin: "2.5%"
                                }}
                            >
                                <Typography variant={"subtitle2"} textAlign={"center"}>{source.sourceName}</Typography>
                            </Paper>
                        )
                    })
                }
                {
                    slots > characterSourcesOfType.length ? [...Array(slots - characterSourcesOfType.length)].map(_ => {
                        return (
                            <Paper elevation={3}
                                sx={{
                                    padding: "6px",
                                    flexBasis: "45%",
                                    margin: "2.5%"
                                }}
                            >
                                <Typography variant={"subtitle2"} textAlign={"center"} color={"darkgray"}>[EMPTY]</Typography>
                            </Paper>
                        )

                    }) : <></>
                }
            </Box>

        </Paper>
    )
}

export default SourceByArcanotypeWidget