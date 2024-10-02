import React, {useEffect, useState} from 'react';
import {Box, IconButton, Paper, Typography} from "@mui/material";
import {IDowntimeFullScaledData} from "../../Data/IDowntime";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IDowntimeRankCardInput {
    downtimeDatum: IDowntimeFullScaledData,
    sendBack: (delta: number, key: string) => void,
    total: number
}

const DowntimeRankCard = ({downtimeDatum, sendBack, total}: IDowntimeRankCardInput) => {

    const handleChangeRank = (delta: number) => (event: React.MouseEvent) => {
        sendBack(delta, downtimeDatum.activityId)
        setCurrentRank(currentRank + delta);
    }

    const {currentSheet} = useCharacter();

    const [currentRank, setCurrentRank] = useState(0);

    useEffect(() => {
        setCurrentRank(downtimeDatum.proficiency);
    }, [downtimeDatum]);


    return currentSheet ? (
        <Paper elevation={1} key={downtimeDatum._id} sx={{
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Typography variant={"h6"} sx={{
                    userSelect: "none"
                }}>{downtimeDatum.activityName}</Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 2
                }}
            >
                <IconButton
                    onClick={handleChangeRank(-1)}
                    disabled={currentRank <= 0}
                >
                    <RemoveCircleOutlined />
                </IconButton>
                <Typography variant={"h6"} sx={{
                    userSelect: "none"
                }}>{currentRank}</Typography>
                <IconButton
                    onClick={handleChangeRank(1)}
                    disabled={currentRank >= currentSheet.getDowntimeMaxRank() || total >= currentSheet.getDowntimeRanks()}
                >
                    <AddCircleOutlined />
                </IconButton>
            </Box>
        </Paper>
    ) : <></>
}

export default DowntimeRankCard