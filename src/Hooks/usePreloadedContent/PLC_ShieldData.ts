import {IBaseShieldData} from "../../Data/IArmorData";
import {ConstructFinalShield} from "../../Utils/ConstructFinalWeapon";


class PLC_ShieldData {
    private baseShieldCards: Array<IBaseShieldData>

    constructor() {
        this.baseShieldCards = [];
    }

    public async Initialize(shieldCards: Array<IBaseShieldData>) {
        this.baseShieldCards = shieldCards;
    }

    public hasData(): boolean {
        return this.baseShieldCards.length > 0;
    }

    public GetAllBaseData() {
        return this.baseShieldCards;
    }

    public GetShieldById(shieldId: string) {
        return this.baseShieldCards.find(e => e._id === shieldId)
    }

    public GetConstructedShieldById(shieldId: string, enchantmentLevel: number) {
        const shield = this.GetShieldById(shieldId);
        if (shield) {
            return ConstructFinalShield(shield, enchantmentLevel);
        }
        return undefined;
    }
}

export default PLC_ShieldData;