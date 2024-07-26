import {IScaledWeaponBaseData, IWeaponBaseData} from "../../Data/ICardData";
import {IAPIContext} from "../useAPI/APIProvider";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";


class PLC_WeaponData {

    private baseWeaponCards: Array<IWeaponBaseData>;

    constructor() {
        this.baseWeaponCards = [];
    }

    public async Initialize(api: IAPIContext) {
        this.baseWeaponCards = await api.CardAPI.GetStandardBaseWeapons();
    }

    public GetCardById(cardId: string) {
        return this.baseWeaponCards.find(e => e._id === cardId);
    }

    public GetAllStandardWeapons() {
        return this.baseWeaponCards.filter(weapon => weapon.prerequisites.length == 0)
    }

    public GetCardPreparedStruct(prepStruct: Array<{
        baseId: string,
        enchantmentLevel: number
    }>): Array<IScaledWeaponBaseData> {
        console.log(prepStruct);
        return prepStruct.map(({baseId, enchantmentLevel}) => {
            const card = this.GetCardById(baseId);
            if (card) {
                return ConstructFinalWeapon(card, enchantmentLevel);
            }
            return undefined;
        }).filter( e => e != undefined) as Array<IScaledWeaponBaseData>
    }
}

export default PLC_WeaponData