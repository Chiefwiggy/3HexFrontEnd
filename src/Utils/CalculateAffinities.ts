import {IAffinities, IPathKeys, IClassData} from "../Data/ICharacterData";
import {IFatelineData} from "../Data/IFatelineData";
import {IAbility} from "../Data/IAbilities";

export const GetPathAndAffinitiesFromClassList = (classes: Array<IClassData>, fate: IFatelineData|undefined, devAbilities: Array<IAbility>)  => {
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
            adaptation: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            transduction: 0,
            daemoncraft: 0,
            proxy: 0,
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
        devAbilities.forEach(ability => {
            if (ability.unlocks && Object.keys(ability.unlocks).length > 0) {
                let uList = Object.keys(ability.unlocks).filter(key => key.endsWith("Affinity")).map(e => e.replace(/Affinity$/, ""))
                console.log(uList)
                if (uList.length > 0) {
                    currentAffinities[uList[0] as keyof IAffinities] += 1
                }
            }
        })
        currentPath = {
            warrior: currentAffinities.nimble + currentAffinities.infantry + currentAffinities.guardian,
            arcanist: currentAffinities.focus + currentAffinities.creation + currentAffinities.alteration,
            commander: currentAffinities.leadership + currentAffinities.supply + currentAffinities.summoning,
            navigator: currentAffinities.swift + currentAffinities.riding + currentAffinities.adaptation,
            scholar: currentAffinities.rune + currentAffinities.research + currentAffinities.sourcecraft,
            hacker: currentAffinities.daemoncraft + currentAffinities.transduction + currentAffinities.proxy
        }
        return {
            path: currentPath,
            affinities: currentAffinities
        }
    }