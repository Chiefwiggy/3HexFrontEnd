import React from 'react'
import {Box} from "@mui/material";
import useEventHistory from "../Hooks/useEventHistory/useEventHistory";
import EventLogCard from "../Components/EventLogs/EventLogCard";

const EventLogView = () => {


    const {eventHistory} = useEventHistory();

    return (
        <Box
            sx={{
                width: "400px",
                padding: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {
                    eventHistory.map((event) => {
                        return <EventLogCard logData={event} key={event.timestamp} />
                    })
                }
            </Box>

        </Box>
    )
}

export default EventLogView;