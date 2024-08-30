import {IConsumableTemplate} from "../../Data/IConsumable";
import CharacterSheet from "../../Data/CharacterSheet";


class PLC_ConsumableData {
    private consumableData: Array<IConsumableTemplate>;

    constructor() {
        this.consumableData = [];
    }

    public async Initialize(consumableData: Array<IConsumableTemplate>) {
        this.consumableData = consumableData;
    }

    public GetAllConsumableData() {
        return this.consumableData;
    }

    public GetConsumableById(consumableId: string) {
        return this.consumableData.find(e => e._id === consumableId);
    }

    public GetAllConsumablesForPlayer(currentSheet: CharacterSheet) {
        const simplifiedPlayerData = currentSheet.data.knownConsumables.map(e => e.consumableId)
        return this.consumableData.filter(consumable => {
            return simplifiedPlayerData.includes(consumable._id)
        }).sort((a, b) => a._id.localeCompare(b._id));
    }
}

export default PLC_ConsumableData