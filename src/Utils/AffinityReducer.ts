import {IAffinities, IAffinitiesAndPath, IPathKeys} from "../Data/ICharacterData";

export type AffinityAction = {type: "setOne", affinity: keyof IAffinities, value: number}  | {type: "setAll", affinities: IAffinitiesAndPath}

export const AffinityReducer = (state: IAffinitiesAndPath, action: AffinityAction): IAffinitiesAndPath => {
    switch (action.type) {
        case "setOne": {
            const path = GetPathFromAffinity(action.affinity);
            const prevValue = state.affinities[action.affinity];

            return {
                ...state,
                affinities: {
                    ...state.affinities,
                    [action.affinity]: action.value
                },
                path: {
                    ...state.path,
                    [path]: state.path[path] + (action.value - prevValue)
                }
            };
        }
        case "setAll":
            return action.affinities
        default:
            return state
    }
}

export const GetPathFromAffinity = (affinity: keyof IAffinities): keyof IPathKeys => {
    switch (affinity) {
        case "finesse":
        case "infantry":
        case "guardian":
            return "warrior"
        case "evocation":
        case "creation":
        case "alteration":
            return "arcanist"
        case "command":
        case "mentorship":
        case "supply":
            return "general"
        case "swift":
        case "riding":
        case "adaptation":
            return "navigator"
        case "rune":
        case "sourcecraft":
        case "research":
            return "scholar"
        case "animancy":
        case "conjuration":
        case "orchestration":
            return "summoner"
        case "proxy":
        case "firewall":
        case "virus":
            return "cipher"
        case "transduction":
        case "machinery":
        case "crafting":
            return "engineer"
        default:
            return "warrior"
    }
}

export const AFFINITY_PATH_CONST = () => {
    return {
        affinities: {
            finesse: 0,
            infantry: 0,
            guardian: 0,
            evocation: 0,
            creation: 0,
            alteration: 0,
            command: 0,
            supply: 0,
            mentorship: 0,
            swift: 0,
            riding: 0,
            adaptation: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            animancy: 0,
            conjuration: 0,
            orchestration: 0,
            proxy: 0,
            firewall: 0,
            virus: 0,
            transduction: 0,
            machinery: 0,
            crafting: 0
        },
        path: {
            warrior: 0,
            arcanist: 0,
            general: 0,
            navigator: 0,
            scholar: 0,
            summoner: 0,
            cipher: 0,
            engineer: 0
        }
    }
}