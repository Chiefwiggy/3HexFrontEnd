import React from 'react';
import {Box, capitalize, Paper, Typography} from "@mui/material";
import {ISourceData, UArcanotype} from "../../Data/ISourceData";
import SourceChip from "./SourceChip";

interface ISourceByArcanotypeWidgetInput {
    sourceArcanotype: UArcanotype,
    slots: number,
    characterSourcesOfType: Array<ISourceData>,
    bypassList?: Array<string>,
    handleInnerUpdate?: (source_id: string, newAttunementLevel: number) => void,
    cancelInnerPing?: boolean
}

const SourceByArcanotypeWidget = ({
    sourceArcanotype,
    slots,
    characterSourcesOfType,
    bypassList=[],
    handleInnerUpdate = (source_id: string, newAttunementLevel: number) => {},
    cancelInnerPing = false
}: ISourceByArcanotypeWidgetInput) => {


    return (
        <Paper
            elevation={1}
            sx={{
                padding: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                            <SourceChip handleInnerUpdate={handleInnerUpdate} cancelInnerPing={cancelInnerPing} source={source} bypassList={bypassList} index={index} slots={slots} key={index}/>
                        )
                    })
                }
                {
                    slots > characterSourcesOfType.length ? [...Array(slots - characterSourcesOfType.length)].map((_, index) => {
                        return (
                            <Paper elevation={3}
                                sx={{
                                    padding: "6px",
                                    flexBasis: "45%",
                                    margin: "2.5%"
                                }}
                                   key={index}
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