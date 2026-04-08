import {IMiscUnlockData} from "../Data/ICharacterData";

export type MiscUnlockAction = {type: "add", category: string, id: string} | {type: "remove", category: string, id: string} | {type: "set", category: string, ids: Array<string>} | {type: "add_category", category: string} | {type: "remove_category", category: string} | {type: "set_all", data: Array<IMiscUnlockData>}

export const MiscUnlockReducer = (state: Array<IMiscUnlockData>, action: MiscUnlockAction): Array<IMiscUnlockData> => {
    switch (action.type) {
        case "add":
            return state.map(e => {
                if (e.categoryId === action.category) {
                    return {...e, unlockIds: [...e.unlockIds, action.id]};
                }
                return e
            })
        case "remove":
            return state.map(e => {
                if (e.categoryId === action.category) {
                    return {...e, unlockIds: e.unlockIds.filter(id => id !== action.id)};
                }
                return e
            })
        case "set":
            return state.map(e => {
                if (e.categoryId === action.category) {
                    return {...e, unlockIds: action.ids};
                }
                return e
            })
        case "add_category":
            return [...state, {categoryId: action.category, unlockIds: []}]
        case "remove_category":
            return state.filter(e => e.categoryId !== action.category)
        case "set_all":
            return action.data
    }
}