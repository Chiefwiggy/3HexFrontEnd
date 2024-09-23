import {IConsumableTemplate} from "../../Data/IConsumable";
import {IConditionCard} from "../../Data/ICardData";


class PLC_ConditionData {
    private conditionCards: Array<IConditionCard>;

    constructor() {
        this.conditionCards = [];
    }

    public async Initialize(conditionCards: Array<IConditionCard>) {
        this.conditionCards = conditionCards;
    }

    public GetAllConditions() {
        console.log(this.conditionCards);
        return this.conditionCards;
    }

    public GetAttackConditions() {
        return this.conditionCards.filter(e => e.appliesTo.attacks);
    }

    public GetSpellConditions() {
        return this.conditionCards.filter(e => e.appliesTo.spells);
    }

    public GetHackConditions() {
        return this.conditionCards.filter(e => e.appliesTo.hacks);
    }
}

export default PLC_ConditionData;