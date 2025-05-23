import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";

interface ISourceChipInput {
    source: ISourceData,
    bypassList: Array<string>,
    index: number,
    slots: number,
    handleInnerUpdate: (source_id: string, newAttunementLevel: number) => void,
    cancelInnerPing: boolean

}

const SourceChip = ({source, bypassList, index, slots, handleInnerUpdate, cancelInnerPing}: ISourceChipInput) => {

    const [currentAttunement, setCurrentAttunement] = useState<number>(source.tempAttunementLevel ?? 0);

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setCurrentAttunement((currentAttunement) => {
            handleInnerUpdate(source._id, currentAttunement + 1)
            return currentAttunement + 1;
        })
    }

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (currentAttunement > 0) {
            setCurrentAttunement((currentAttunement) => {
                handleInnerUpdate(source._id, currentAttunement - 1)
                return currentAttunement - 1;
            })
        }

    }

    useEffect(() => {
        setCurrentAttunement(source.tempAttunementLevel)
    }, [cancelInnerPing]);

    return (
        <>
            <Paper elevation={3} key={source._id}
                    sx={{
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
                <Typography sx={{userSelect: "none"}} variant={"subtitle2"} textAlign={"center"}>{source.sourceName} ({currentAttunement})</Typography>
            </Paper>
        </>
    )
}

export default SourceChip