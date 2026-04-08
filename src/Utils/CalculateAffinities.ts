import {IAffinities, IPathKeys, IClassData_deprecated} from "../Data/ICharacterData";
import {IFatelineData} from "../Data/IFatelineData";
import {IAbility} from "../Data/IAbilities";

export const GetPathAndAffinitiesFromClassList = (classes: Array<IClassData_deprecated>, fate: IFatelineData|undefined, devAbilities: Array<IAbility>)  => {
        const currentAffinities = { ...{
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
        }, ...fate?.affinities ?? {}}
        let currentPath: IPathKeys = {
            warrior: 0,
            arcanist: 0,
            general: 0,
            navigator: 0,
            scholar: 0,
            summoner: 0,
            cipher: 0,
            engineer: 0
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
            warrior: currentAffinities.finesse + currentAffinities.infantry + currentAffinities.guardian,
            arcanist: currentAffinities.evocation + currentAffinities.creation + currentAffinities.alteration,
            general: currentAffinities.command + currentAffinities.supply + currentAffinities.mentorship,
            navigator: currentAffinities.swift + currentAffinities.riding + currentAffinities.adaptation,
            scholar: currentAffinities.rune + currentAffinities.research + currentAffinities.sourcecraft,
            summoner: currentAffinities.animancy + currentAffinities.conjuration + currentAffinities.orchestration,
            cipher: currentAffinities.proxy + currentAffinities.firewall + currentAffinities.virus,
            engineer: currentAffinities.transduction + currentAffinities.machinery +  currentAffinities.crafting
        }
        return {
            path: currentPath,
            affinities: currentAffinities
        }
    }