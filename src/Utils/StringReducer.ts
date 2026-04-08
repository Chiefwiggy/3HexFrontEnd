export type StringAction = {type: "add", str: string } | {type: "remove", str: string } | {type: "set", strs: Array<string> }

export const StandardStringReducer = (state: Array<string>, action: StringAction): Array<string> => {
    switch (action.type) {
        case "add":
            return state.includes(action.str) ? state : [...state, action.str]
        case "remove":
            return state.filter( c=>c !== action.str)
        case "set":
            return action.strs
        default:
            return state
    }
}