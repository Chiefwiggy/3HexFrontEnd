import {IAffinitiesArray, IPathArray, IPathKeys} from "../../Data/ICharacterData";
import {ICommonCardData} from "../../Data/ICardData";
import {IAPIContext} from "../useAPI/APIProvider";
import {IAbility} from "../../Data/IAbilities";
import {IPrerequisite} from "../../Data/GenericData";


class PLC_PathData {
    
    private pathCards: IPathArray<ICommonCardData>
    private pathAbilities: IPathArray<IAbility>
    constructor() {
        this.pathCards = {
            warrior: [],
            arcanist: [],
            commander: [],
            navigator: [],
            scholar: [],
            hacker: []
        }
        this.pathAbilities = {
            warrior: [],
            arcanist: [],
            commander: [],
            navigator: [],
            scholar: [],
            hacker: []
        }
    }

    public async Initialize(pathCards: IPathArray<ICommonCardData>, pathAbilities: IPathArray<IAbility>) {
        this.pathCards = pathCards
        this.pathAbilities = pathAbilities
    }

    public getPathCards(pathName: keyof IPathArray<ICommonCardData>) {
        try {
            if (this.pathCards[pathName]) {
                return this.pathCards[pathName];
            } else {
                return [];
            }
        } catch (e) {
            console.error(pathName + " has no cards.");
            return [];
        }
    }

    public getPathAbilities(pathName: keyof IPathArray<IAbility>) {
        try {
            if (this.pathAbilities[pathName]) {
                return this.pathAbilities[pathName];
            } else {
                return [];
            }
        } catch (e) {
            console.error(pathName + " has no abilities.");
            return []
        }
    }

    private getRequiredLevel = (prereq: Array<IPrerequisite>, pathName: keyof IPathArray<any>) => {
        let retLevel = 0;
        prereq.forEach(e => {
            if (e.prerequisiteType == "path" && e.skill == pathName) {
                retLevel = e.level;
                return;
            }
        })
        return retLevel;
    }


    public getLevelArray = (pathName: keyof IPathArray<IAbility>)  => {
        try {
            const allAb = this.getPathAbilities(pathName).map(e => this.getRequiredLevel(e.prerequisites, pathName));
            const allCd = this.getPathCards(pathName).map(e => this.getRequiredLevel(e.prerequisites, pathName));
            const a = Array.from(new Set([...allAb, ...allCd])).sort((n1, n2) => n1 - n2);
            return a;
        } catch(e) {
            return [];
        }

    }

    public getPathCardsByLevel(pathName: keyof IPathArray<ICommonCardData>) {
        const list = this.getPathCards(pathName);
        const map = new Map<number, Array<ICommonCardData>>

        list.forEach((card) => {
            const lvl = this.getRequiredLevel(card.prerequisites, pathName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(card);
            } else {
                map.set(lvl, [card]);
            }
        })

        return map;
    }

    public getPathAbilitiesByLevel(pathName: keyof IPathArray<IAbility>) {
        const list = this.getPathAbilities(pathName);
        const map = new Map<number, Array<IAbility>>();

        list.forEach((ability) => {
            const lvl = this.getRequiredLevel(ability.prerequisites, pathName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(ability);
            } else {
                map.set(lvl, [ability]);
            }
        })

        return map;
    }
}

export default PLC_PathData;