import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";

export type LevelKey =
    | "level0" | "level10" | "level30" | "level50"
    | "level70" | "level90" | "level110"
    | "level130" | "level150" | "level170" | "level190"

class PLC_DevelopmentData {
    private developmentCards: Record<string, Array<ICommonCardData>>
    private developmentAbilities: Record<string, Array<IAbility>>


    constructor() {
        this.developmentCards = {}
        this.developmentAbilities = {}
    }

    public async Initialize(developmentCards: Record<string, Array<ICommonCardData>>, developmentAbilities: Record<string, Array<IAbility>>)  {
        this.developmentCards = developmentCards;
        this.developmentAbilities = developmentAbilities
    }

    public GetDevelopmentCards() {
        return Object.values(this.developmentCards).flat()
    }

    public GetDevelopmentAbilities() {
        return Object.values(this.developmentAbilities).flat()
    }

    public GetDevelopmentAbilityLevelById(id: string) {
        const elem = this.GetDevelopmentAbilities().find(e => e._id == id)
        if (elem) {
            const prereq = elem.prerequisites.find(prerequisite => prerequisite.prerequisiteType == "level")
            if (prereq) {
                return prereq.level
            } else {
                return 0;
            }
        }
        return undefined;
    }

    public GetDevelopmentFeatureLevelById(id: string) {
        const elem = [...this.GetDevelopmentCards(), ...this.GetDevelopmentAbilities()].find(e => e._id == id)
        if (elem) {
            const prereq = elem.prerequisites.find(prerequisite => prerequisite.prerequisiteType == "level")
            if (prereq) {
                return prereq.level
            } else {
                return 0;
            }
        }
        return undefined;
    }

    public GetDevelopmentFeaturesByLevel() {
        const elems = [...this.GetDevelopmentCards(), ...this.GetDevelopmentAbilities()]


        const levelObject: Record<LevelKey, Array<ICommonCardData|IAbility>> = {
            level0: [],
            level10: [],
            level30: [],
            level50: [],
            level70: [],
            level90: [],
            level110: [],
            level130: [],
            level150: [],
            level170: [],
            level190: []
        }

        for (const elem of elems) {
            const prereq = elem.prerequisites.find(p => p.prerequisiteType === "level")
            const level = prereq ? prereq.level : 0

            const key = `level${level}` as LevelKey
            levelObject[key].push(elem)
        }

        return levelObject
    }
}

export default PLC_DevelopmentData;