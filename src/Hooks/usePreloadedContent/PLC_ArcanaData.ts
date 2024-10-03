import {IAffinitiesArray, IArcanaArray, IArcanaKeys} from "../../Data/ICharacterData";
import {ICommonCardData} from "../../Data/ICardData";
import {IAPIContext} from "../useAPI/APIProvider";
import {IAbility} from "../../Data/IAbilities";
import {IPrerequisite} from "../../Data/GenericData";


class PLC_ArcanaData {
    
    private arcanaCards: IArcanaArray<ICommonCardData>
    private arcanaAbilities: IArcanaArray<IAbility>
    constructor() {
        this.arcanaCards = {
            warrior: [],
            arcane: [],
            support: [],
            hacker: []
        }
        this.arcanaAbilities = {
            warrior: [],
            arcane: [],
            support: [],
            hacker: []
        }
    }

    public async Initialize(arcanaCards: IArcanaArray<ICommonCardData>, arcanaAbilities: IArcanaArray<IAbility>) {
        this.arcanaCards = arcanaCards
        this.arcanaAbilities = arcanaAbilities
    }

    public getArcanaCards(arcanaName: keyof IArcanaArray<ICommonCardData>) {
        try {
            if (this.arcanaCards[arcanaName]) {
                return this.arcanaCards[arcanaName];
            } else {
                return [];
            }
        } catch (e) {
            console.error(arcanaName + " has no cards.");
            return [];
        }
    }

    public getArcanaAbilities(arcanaName: keyof IArcanaArray<IAbility>) {
        try {
            if (this.arcanaAbilities[arcanaName]) {
                return this.arcanaAbilities[arcanaName];
            } else {
                return [];
            }
        } catch (e) {
            console.error(arcanaName + " has no abilities.");
            return []
        }
    }

    private getRequiredLevel = (prereq: Array<IPrerequisite>, arcanaName: keyof IArcanaArray<any>) => {
        let retLevel = 0;
        prereq.forEach(e => {
            if (e.prerequisiteType == "arcana" && e.skill == arcanaName) {
                retLevel = e.level;
                return;
            }
        })
        return retLevel;
    }


    public getLevelArray = (arcanaName: keyof IArcanaArray<IAbility>)  => {
        try {
            const allAb = this.getArcanaAbilities(arcanaName).map(e => this.getRequiredLevel(e.prerequisites, arcanaName));
            const allCd = this.getArcanaCards(arcanaName).map(e => this.getRequiredLevel(e.prerequisites, arcanaName));
            const a = Array.from(new Set([...allAb, ...allCd])).sort((n1, n2) => n1 - n2);
            return a;
        } catch(e) {
            return [];
        }

    }

    public getArcanaCardsByLevel(arcanaName: keyof IArcanaArray<ICommonCardData>) {
        const list = this.getArcanaCards(arcanaName);
        const map = new Map<number, Array<ICommonCardData>>

        list.forEach((card) => {
            const lvl = this.getRequiredLevel(card.prerequisites, arcanaName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(card);
            } else {
                map.set(lvl, [card]);
            }
        })

        return map;
    }

    public getArcanaAbilitiesByLevel(arcanaName: keyof IArcanaArray<IAbility>) {
        const list = this.getArcanaAbilities(arcanaName);
        const map = new Map<number, Array<IAbility>>();

        list.forEach((ability) => {
            const lvl = this.getRequiredLevel(ability.prerequisites, arcanaName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(ability);
            } else {
                map.set(lvl, [ability]);
            }
        })

        return map;
    }
}

export default PLC_ArcanaData;