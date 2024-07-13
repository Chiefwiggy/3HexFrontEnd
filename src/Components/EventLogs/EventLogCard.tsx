import React from 'react'
import {Box, Card, CardContent, Typography} from "@mui/material";
import {IEventLog} from "../../Data/IEventLogs";
import moment from 'moment'


interface IEventLogCardInput {
    logData: IEventLog
}
const EventLogCard = ({
    logData
}: IEventLogCardInput) => {

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        width: '100%',
                    }}
                >
                    <Typography variant={"h6"} sx={{fontSize: '1rem'}}>
                        {logData.characterName}
                    </Typography>
                    <Typography variant={"body2"} color={"gray"} sx={{fontSize: '0.75rem'}}>
                        {moment(logData.timestamp).format("hh:mm")}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{...logData.sx, fontSize: '0.9rem'}}>
                        {logData.message}
                    </Typography>
                </Box>
            </CardContent>

        </Card>
    )
}

export default EventLogCard;