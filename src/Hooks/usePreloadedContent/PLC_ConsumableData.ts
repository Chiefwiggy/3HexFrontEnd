import {IConsumableMergedData, IConsumableTemplate} from "../../Data/IConsumable";
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

    public GetAllConsumablesForPlayer(currentSheet: CharacterSheet): IConsumableMergedData[] {
        const consumableMap = new Map(this.consumableData.map(item => [item._id, item]));

        const mergedData = currentSheet.data.knownConsumables
            .map(data => {
                const consumableTemplate = consumableMap.get(data.consumableId);
                if (consumableTemplate) {
                    return {
                        ...consumableTemplate,
                        consumableId: data.consumableId,  // explicitly include consumableId
                        amount: data.amount,
                        prepared: data.prepared
                    };
                }
                return null; // Skip if not found
            })
            .filter((item): item is IConsumableMergedData => item !== null); // Filter out null values

        return mergedData;
    }

}

export default PLC_ConsumableData