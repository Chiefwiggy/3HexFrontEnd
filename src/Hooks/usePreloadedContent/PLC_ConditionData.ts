import {IConsumableTemplate} from "../../Data/IConsumable";
import {IConditionCard, IConditionTag} from "../../Data/ICardData";


class PLC_ConditionData {
    private conditionCards: Array<IConditionCard>;
    private conditionTags: Array<IConditionTag>;

    constructor() {
        this.conditionCards = [];
        this.conditionTags = [];
    }

    public async Initialize(conditionCards: Array<IConditionCard>, conditionTags: Array<IConditionTag>) {
        this.conditionCards = conditionCards;
        this.conditionTags = conditionTags;
        console.log(conditionTags);
    }

    public GetAllConditionCards() {
        return this.conditionCards;
    }

    public GetAllConditionTags() {
        return this.conditionTags;
    }

    public GetConditionTagById(id: string): IConditionTag {
        const ret = this.conditionTags.find(e => e.conditionId == id);
        if (ret) {
            return ret;
        } else {
            return {
                conditionId: "unknown",
                conditionName: "Unknown",
                conditionType: "buff",
                conditionTier: 1,
                conditionCountdownType: "rounds",
                description: ["Cannot find condition details... contact Collin"],
                xVals: []
            }
        }
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