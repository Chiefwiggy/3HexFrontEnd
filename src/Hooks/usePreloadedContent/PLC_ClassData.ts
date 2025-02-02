import {IAPIContext} from "../useAPI/APIProvider";
import {IClassMetaData, IClassServerOutput} from "../../Data/IClassMetaData";
import {ICommonCardData} from "../../Data/ICardData";


class PLC_ClassData {

    private classCards;
    private classAbilities;
    private classData: IClassServerOutput = {
        tier1: [],
        tier2: [],
        tier3: [],
        tier4: [],
        tier5: [],
        tier6: []
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

    public getClassCards(className: string): Array<any> {
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

    public getClassAbilities(className: string): Array<any> {
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

    // public getClassData(className: string) {
    //     return this.classData.find(clz => clz.className.toLowerCase() == className.toLowerCase()) ?? undefined
    // }

    public getClassesData(tier: number) {
        return this.classData[`tier${tier}` as keyof IClassServerOutput] ?? [];
    }

    public getAllClassesByTier() {
        return Object.values(this.classData);
    }
}

export default PLC_ClassData