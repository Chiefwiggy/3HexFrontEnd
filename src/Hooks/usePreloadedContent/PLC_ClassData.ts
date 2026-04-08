import {IAPIContext} from "../useAPI/APIProvider";
import {IClassMetaData, IClassServerOutput} from "../../Data/IClassMetaData";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";


class PLC_ClassData {

    private classCards;
    private classAbilities;
    private classData: IClassServerOutput = {
        tier1: [],
        tier2: [],
        tier3: [],
        tier4: []
    }

    constructor() {
        this.classCards = {};
        this.classAbilities = {};
    }

    public async Initialize(classCards: Object, classAbilities: Object, classData: IClassServerOutput) {
        this.classCards = classCards;
        this.classAbilities = classAbilities
        this.classData = classData
    }

    public getClassCards(className: string): Array<ICommonCardData> {
        try {
            if (this.classCards[className as keyof Object]) {
                // @ts-ignore
                return this.classCards[className as keyof Object] as Array<any>;
            } else {
                return []
            }
        } catch (e) {
            console.error(className + " has no cards.")
            return []
        }
    }

    public getAllClassCards(cardType: "weapon" | "spell"): Array<ICommonCardData> {
        // @ts-ignore
        return Object.values(this.classCards).flatMap(e => e).filter(e => e.cardType === cardType);
    }

    public getClassAbilities(className: string): Array<IAbility> {
        try {
            if (this.classAbilities[className as keyof Object]) {
                // @ts-ignore
                return this.classAbilities[className as keyof Object] as Array<any>;
            } else {
                return []
            }
        } catch (e) {
            console.error(className + " has no cards.")
            return []
        }
    }

    public getFreeClassCards(className: string): Array<any> {
        const allCards = this.getClassCards(className);
        return allCards.filter(e => e.prerequisites.length == 1 && e.prerequisites[0].prerequisiteType == "class" && e.prerequisites[0].level == 1);
    }

    public getFreeClassAbilities(className: string): Array<any> {
        const allAbilities = this.getClassAbilities(className);
        return allAbilities.filter(e => e.prerequisites.length == 1 && e.prerequisites[0].prerequisiteType == "class" && e.prerequisites[0].level == 1);
    }

    public getUnlockableClassCards(className: string): Array<any> {
        const allCards = this.getClassCards(className);
        return allCards.filter(e => !(e.prerequisites.length == 1 && e.prerequisites[0].prerequisiteType == "class" && e.prerequisites[0].level == 1));
    }

    public getUnlockableClassAbilities(className: string): Array<any> {
        const allAbilities = this.getClassAbilities(className);
        return allAbilities.filter(e => !(e.prerequisites.length == 1 && e.prerequisites[0].prerequisiteType == "class" && e.prerequisites[0].level == 1));
    }

    // public getClassData(className: string) {
    //     return this.classData.find(clz => clz.className.toLowerCase() == className.toLowerCase()) ?? undefined
    // }

    public getClassesData(tier: 1 | 2 | 3 | 4) {
        return this.classData[`tier${tier}` as keyof IClassServerOutput] ?? [];
    }

    public getAllClassesByTier() {
        return Object.values(this.classData);
    }

    public getAllClassNamesByTierFiltered(filterList: Array<string>): Record<keyof IClassServerOutput, string[]> {
        const filterSet = new Set(filterList); // Set is faster for multiple lookups

        const getNamesForTier = (tier: IClassMetaData[]) => {
            const tierNames = (tier ?? []).map(clz => clz.className);

            return filterList.filter(filterItem => {
                // 1. Direct match: The filter item matches a class name in this tier
                if (tierNames.includes(filterItem)) return true;

                // 2. Promotion match: The filter item is "className_promoted"
                // and the base className is in this tier
                if (filterItem.endsWith("_promoted")) {
                    const baseName = filterItem.replace("_promoted", "");
                    if (tierNames.includes(baseName)) return true;
                }

                return false;
            });
        };

        return {
            tier1: getNamesForTier(this.classData.tier1),
            tier2: getNamesForTier(this.classData.tier2),
            tier3: getNamesForTier(this.classData.tier3),
            tier4: getNamesForTier(this.classData.tier4),
        };
    }
}

export default PLC_ClassData