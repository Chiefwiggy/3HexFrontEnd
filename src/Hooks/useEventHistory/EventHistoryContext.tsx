import {createContext} from "react";
import {IEventHistoryContext} from "./EventHistoryProvider";


export const EventHistoryContext = createContext<IEventHistoryContext>({
    eventHistory: [],
    LogEvent: (message) => {}
});