import {IAPIContext} from "../useAPI/APIProvider";
import {ICommonCardData, UAffinity} from "../../Data/ICardData";
import {IAffinities, IAffinitiesArray, IArcanaArray} from "../../Data/ICharacterData";
import {IAbility} from "../../Data/IAbilities";
import {IPrerequisite} from "../../Data/GenericData";


class PLC_AffinityData {

    private affinityCards: IAffinitiesArray<ICommonCardData>;
    private affinityAbilities: IAffinitiesArray<IAbility>;

    constructor() {
        this.affinityCards = {
            abjuration: [],
            biohacking: [],
            deft: [],
            erudite: [],
            guardian: [],
            hex: [],
            infantry: [],
            leadership: [],
            machinery: [],
            rune: [],
            soul: [],
            supply: []
        };
        this.affinityAbilities =  {
            abjuration: [],
            biohacking: [],
            deft: [],
            erudite: [],
            guardian: [],
            hex: [],
            infantry: [],
            leadership: [],
            machinery: [],
            rune: [],
            soul: [],
            supply: []
        };
    }

    public async Initialize(api: IAPIContext) {
        this.affinityCards = await api.CardAPI.GetAffinityCards("all")
        this.affinityAbilities = await api.AbilityAPI.GetAffinityAbilities("all")
    }

    private getRequiredLevel = (prereq: Array<IPrerequisite>, arcanaName: keyof IAffinities) => {
        let retLevel = 0;
        prereq.forEach(e => {
            if (e.prerequisiteType == "affinity" && e.skill == arcanaName) {
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
            return Array.from(new Set([...allAb, ...allCd]));
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