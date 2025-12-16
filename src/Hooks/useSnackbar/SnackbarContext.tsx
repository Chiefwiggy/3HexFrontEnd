import {createContext} from "react"


export interface ISnackbarContext {
    SendToSnackbar: (message: string, severity: "success" | "info" | "warning" | "error") => void
}

const SnackbarContext = createContext<ISnackbarContext>({
    SendToSnackbar: (message: string, severity: "success" | "info" | "warning" | "error") => {}
} as ISnackbarContext);

export default SnackbarContext;