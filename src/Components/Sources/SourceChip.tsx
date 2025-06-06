import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";

interface ISourceChipInput {
    source: ISourceData,
    bypassList: Array<string>,
    isTemporary: boolean,
    index: number,
    slots: number,
    handleInnerUpdate: (source_id: string, newAttunementLevel: number) => void,
    cancelInnerPing: boolean

}

const SourceChip = ({source, bypassList, index, slots, handleInnerUpdate, cancelInnerPing, isTemporary}: ISourceChipInput) => {

    const [currentAttunement, setCurrentAttunement] = useState<number>(source.tempAttunementLevel ?? 0);

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.ctrlKey || event.metaKey) {
            setCurrentAttunement((currentAttunement) => {
                handleInnerUpdate(source._id, currentAttunement + 10)
                return currentAttunement + 10;
            })
        } else {
            setCurrentAttunement((currentAttunement) => {
                handleInnerUpdate(source._id, currentAttunement + 1)
                return currentAttunement + 1;
            })
        }

    }

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.ctrlKey || event.metaKey) {
            setCurrentAttunement((currentAttunement) => {
                handleInnerUpdate(source._id, Math.max(currentAttunement - 10, 0))
                return Math.max(0, currentAttunement - 10);
            })
        } else {
            setCurrentAttunement((currentAttunement) => {
                handleInnerUpdate(source._id, Math.max(currentAttunement - 1, 0))
                return Math.max(0, currentAttunement - 1);
            })
        }

    }

    useEffect(() => {
        setCurrentAttunement(source.tempAttunementLevel)
    }, [cancelInnerPing]);

    return (
        <>
            <Paper elevation={3} key={source._id}
                    sx={isTemporary ? {
                        padding: "6px",
                        backgroundColor: index >= slots ? (bypassList.includes(source._id) ? "#1b79ba" : "darkred") : "#343434",
                        flexBasis: "45%",
                        margin: "2.5%",
                        border: "1px solid rgba(0,0,0,0)",
                    } : {
                        padding: "6px",
                        backgroundColor: index >= slots ? (bypassList.includes(source._id) ? "#1b79ba" : "darkred") : "#343434",
                        flexBasis: "45%",
                        margin: "2.5%",
                        border: "1px solid rgba(0,0,0,0)",
                        transition: "background-color 0.1s ease",
                        "&:hover": {
                            border: "1px inset white",
                            backgroundColor: "#676767",
                            cursor: "pointer"
                        }
                    }}
                   onClick={handleOnClick}
                   onContextMenu={handleRightClick}
            >
                {
                    isTemporary ?
                        <Typography sx={{userSelect: "none"}} variant={"subtitle2"} textAlign={"center"}>{source.sourceName}</Typography>
                        :
                        <Typography sx={{userSelect: "none"}} variant={"subtitle2"} textAlign={"center"}>{source.sourceName} ({currentAttunement})</Typography>
                }
            </Paper>
        </>
    )
}

export default SourceChip