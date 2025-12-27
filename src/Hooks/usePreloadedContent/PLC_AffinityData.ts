import {IAPIContext} from "../useAPI/APIProvider";
import {ICommonCardData, UAffinity} from "../../Data/ICardData";
import {IAffinities, IAffinitiesArray, IPathArray} from "../../Data/ICharacterData";
import {IAbility} from "../../Data/IAbilities";
import {IPrerequisite} from "../../Data/GenericData";


class PLC_AffinityData {

    private affinityCards: IAffinitiesArray<ICommonCardData>;
    private affinityAbilities: IAffinitiesArray<IAbility>;

    constructor() {
        this.affinityCards = {
            nimble: [],
            infantry: [],
            guardian: [],
            focus: [],
            creation: [],
            alteration: [],
            leadership: [],
            supply: [],
            summoning: [],
            swift: [],
            riding: [],
            adaptation: [],
            rune: [],
            sourcecraft: [],
            research: [],
            transduction: [],
            daemoncraft: [],
            proxy: [],
        };
        this.affinityAbilities =  {
            nimble: [],
            infantry: [],
            guardian: [],
            focus: [],
            creation: [],
            alteration: [],
            leadership: [],
            supply: [],
            summoning: [],
            swift: [],
            riding: [],
            adaptation: [],
            rune: [],
            sourcecraft: [],
            research: [],
            transduction: [],
            daemoncraft: [],
            proxy: [],
        };
    }

    public async Initialize(affinityCards: IAffinitiesArray<ICommonCardData>, affinityAbilities: IAffinitiesArray<IAbility>) {
        this.affinityCards = affinityCards
        console.log(this.affinityCards);
        this.affinityAbilities = affinityAbilities
    }

    private getRequiredLevel = (prereq: Array<IPrerequisite>, pathName: keyof IAffinities) => {
        let retLevel = 0;
        prereq.forEach(e => {
            if (e.prerequisiteType == "affinity" && e.skill == pathName) {
                retLevel = e.level;
                return;
            }
        })
        return retLevel;
    }

    public getAffinityCards(affinityName: UAffinity): Array<ICommonCardData> {
        try {
            if (this.affinityCards[affinityName as keyof Object]) {
                return this.affinityCards[affinityName as keyof IAffinitiesArray<any>];
            } else {
                return [];
            }
        } catch (e) {
            console.error(affinityName + "has no cards.");
            return [];
        }
    }

    public getAllAffinityCards(cardType: "spell" | "weapon"): Array<ICommonCardData> {
        return Object.values(this.affinityCards).flatMap(e => e).filter(e => e.cardType === cardType);
    }

    public getAffinityAbilities(affinityName: UAffinity): Array<IAbility> {
        try {
            if (this.affinityAbilities[affinityName]) {
                return this.affinityAbilities[affinityName];
            } else {
                return [];
            }
        } catch (e) {
            console.error(affinityName + ' has no cards.')
            return [];
        }
    }

    public getAffinityCardsByLevel(affinityName: UAffinity): Map<number, Array<ICommonCardData>> {
        const list = this.getAffinityCards(affinityName);
        const map = new Map<number, Array<ICommonCardData>>;

        list.forEach((card) => {
            const lvl = this.getRequiredLevel(card.prerequisites, affinityName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(card);
            } else {
                map.set(lvl, [card]);
            }
        })

        return map;
    }

    public getLevelArray = (affinityName: UAffinity)  => {
        try {
            const allAb = this.getAffinityAbilities(affinityName).map(e => this.getRequiredLevel(e.prerequisites, affinityName));
            const allCd = this.getAffinityCards(affinityName).map(e => this.getRequiredLevel(e.prerequisites, affinityName));
            const a = Array.from(new Set([...allAb, ...allCd])).sort((n1, n2) => n1 - n2);
            return a;
        } catch(e) {
            return [];
        }

    }

    public getAffinityAbilitiesByLevel = (affinityName: UAffinity): Map<number, Array<IAbility>> => {
        const list = this.getAffinityAbilities(affinityName);
        const map = new Map<number, Array<IAbility>>;

        list.forEach((ability) => {
            const lvl = this.getRequiredLevel(ability.prerequisites, affinityName);
            if (map.has(lvl)) {
                map.get(lvl)!.push(ability);
            } else {
                map.set(lvl, [ability]);
            }
        })

        return map;
    }


}

export default PLC_AffinityData;