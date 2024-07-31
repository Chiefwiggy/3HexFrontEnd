import {IBaseArmorData} from "../../Data/IArmorData";
import {IAPIContext} from "../useAPI/APIProvider";
import {ConstructFinalArmor} from "../../Utils/ConstructFinalWeapon";


class PLC_ArmorData {
    private baseArmorData: Array<IBaseArmorData>;

    constructor() {
        this.baseArmorData = [];
    }

    public hasData(): boolean {
        return this.baseArmorData.length > 0
    }
    public async Initialize(armorData: Array<IBaseArmorData>) {
        this.baseArmorData = armorData;
    }

    public GetArmorById(armorId: string) {
        return this.baseArmorData.find(e => e._id === armorId);
    }

    public GetAllBaseData() {
        return this.baseArmorData;
    }

    public GetConstructedArmorById(armorId: string, enchantmentLevel: number) {
        const armor = this.GetArmorById(armorId);
        if (armor) {
            return ConstructFinalArmor(armor, enchantmentLevel);
        } else {
            return undefined;
        }
    }
}

export default PLC_ArmorData;