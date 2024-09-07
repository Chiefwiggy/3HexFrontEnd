import {IAffinities, IClassData} from "../Data/ICharacterData";
import {IFatelineData} from "../Data/IFatelineData";

export const GetArcanaAndAffinitiesFromClassList = (classes: Array<IClassData>, fate: IFatelineData|undefined)  => {
        const currentAffinities = { ...{
            focus: 0,
            rune: 0,
            soul: 0,
            deft: 0,
            infantry: 0,
            guardian: 0,
            leadership: 0,
            erudite: 0,
            supply: 0,
            biohacking: 0,
            abjuration: 0,
            machinery: 0
        }, ...fate?.affinities ?? {}}
        let currentArcana = {
            arcane: 0,
            warrior: 0,
            support: 0,
            hacker: 0
        }
        classes.forEach((val) => {
            Object.entries(val.affinities).forEach(([key, value]) => {
                currentAffinities[key as keyof IAffinities] += value;
            })
        })
        currentArcana = {
            arcane: currentAffinities.focus + currentAffinities.soul + currentAffinities.rune,
            warrior: currentAffinities.infantry + currentAffinities.guardian + currentAffinities.deft,
            support: currentAffinities.leadership + currentAffinities.erudite + currentAffinities.supply,
            hacker: currentAffinities.biohacking + currentAffinities.abjuration + currentAffinities.machinery
        }
        return {
            arcana: currentArcana,
            affinities: currentAffinities
        }
    }