import {IAPIContext} from "../useAPI/APIProvider";
import {IClassMetaData} from "../../Data/IClassMetaData";


class PLC_ClassData {

    private classCards;
    private classAbilities;
    private classData: Array<IClassMetaData> = []

    constructor() {
        this.classCards = {};
        this.classAbilities = {};
    }

    public async Initialize(api: IAPIContext) {
        this.classCards = await api.CardAPI.GetClassCards("all");
        this.classAbilities = await api.AbilityAPI.GetAbilitiesForClass("all");
        this.classData = await api.ClassAPI.GetAllClassesOfTier(1);
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

    public getClassData(className: string) {
        return this.classData.find(clz => clz.className.toLowerCase() == className.toLowerCase()) ?? undefined
    }

    public getClassesData() {
        return this.classData;
    }
}

export default PLC_ClassData