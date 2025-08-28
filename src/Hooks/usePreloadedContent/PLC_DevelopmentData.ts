import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";


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
}

export default PLC_DevelopmentData;