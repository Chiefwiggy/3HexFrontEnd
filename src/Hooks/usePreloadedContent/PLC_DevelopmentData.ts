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
}

export default PLC_DevelopmentData;