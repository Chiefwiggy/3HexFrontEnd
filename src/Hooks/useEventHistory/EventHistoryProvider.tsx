import React, {useState} from 'react'
import {EventHistoryContext} from "./EventHistoryContext";
import {IEventLog} from "../../Data/IEventLogs";
import useCharacter from "../useCharacter/useCharacter";
import {SxProps} from "@mui/material";


export interface IEventHistoryContext {
    eventHistory: Array<IEventLog>,
    LogEvent: (message: string, sx?: SxProps) => void
}
const EventHistoryProvider = ({children}: any) => {


    const [eventHistory, setEventHistory] = useState<Array<IEventLog>>([]);

    const {currentSheet} = useCharacter();

    const LogEvent = (message: string, sx?: SxProps) => {
        setEventHistory([...eventHistory, {
            message,
            characterName: currentSheet?.data.characterName ?? "Collin",
            timestamp: Date.now(),
            sx
        }])
    }

    return (
        <EventHistoryContext.Provider value={{
            eventHistory,
            LogEvent
        }}>
            {children}
        </EventHistoryContext.Provider>
    )
}

export default EventHistoryProvider