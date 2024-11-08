import {IAffinities, IPathKeys, IClassData} from "../Data/ICharacterData";
import {IFatelineData} from "../Data/IFatelineData";

export const GetPathAndAffinitiesFromClassList = (classes: Array<IClassData>, fate: IFatelineData|undefined)  => {
        const currentAffinities = { ...{
            nimble: 0,
            infantry: 0,
            guardian: 0,
            focus: 0,
            creation: 0,
            alteration: 0,
            leadership: 0,
            supply: 0,
            summoning: 0,
            swift: 0,
            riding: 0,
            versatile: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            machinery: 0,
            abjuration: 0,
            biohacking: 0,
        }, ...fate?.affinities ?? {}}
        let currentPath: IPathKeys = {
            warrior: 0,
            arcanist: 0,
            commander: 0,
            navigator: 0,
            scholar: 0,
            hacker: 0
        }
        classes.forEach((val) => {
            Object.entries(val.affinities).forEach(([key, value]) => {
                currentAffinities[key as keyof IAffinities] += value;
            })
        })
        currentPath = {
            warrior: currentAffinities.nimble + currentAffinities.infantry + currentAffinities.guardian,
            arcanist: currentAffinities.focus + currentAffinities.creation + currentAffinities.alteration,
            commander: currentAffinities.leadership + currentAffinities.supply + currentAffinities.summoning,
            navigator: currentAffinities.swift + currentAffinities.riding + currentAffinities.versatile,
            scholar: currentAffinities.rune + currentAffinities.research + currentAffinities.sourcecraft,
            hacker: currentAffinities.abjuration + currentAffinities.machinery + currentAffinities.biohacking
        }
        return {
            path: currentPath,
            affinities: currentAffinities
        }
    }