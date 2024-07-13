import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import tip_of_the_day from "../../Data/tip_of_the_day";

interface IDataLoadingScreenInput {
    message?: string
}

const DataLoadingScreen = ({
    message = "Your data is loading..."
}: IDataLoadingScreenInput) => {

    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        setCurrentMessage(tip_of_the_day[Math.floor(Math.random() * tip_of_the_day.length)]);
    }, []);


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 20
            }}
        >
            <Typography variant="h4" component="div">{message}</Typography>
            <br />
            <br />
            <Typography variant={"h6"}>Tip of the Day: {currentMessage}</Typography>
            <br />
            <CircularProgress />
        </Box>
    )
}

export default DataLoadingScreen