import {SxProps} from "@mui/material";


export interface IEventLog {
    message: string,
    timestamp: number,
    characterName: string,
    sx?: SxProps
}