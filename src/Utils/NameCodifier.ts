import {capitalize} from "@mui/material";

export const convertToSnakeCase = (name: string) => {
    return name.split(" ").join("_").toLowerCase()
}

export const convertFromSnakeCase = (name: string, doCapitalize = false) => {
    return name.split("_").map(frag => {
        if (doCapitalize) {
            return capitalize(frag)
        }
        return frag
    }).join(" ")
}