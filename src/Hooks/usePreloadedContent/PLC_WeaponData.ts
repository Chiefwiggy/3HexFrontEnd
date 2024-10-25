import {IScaledWeaponBaseData, IWeaponBaseData} from "../../Data/ICardData";
import {IAPIContext} from "../useAPI/APIProvider";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import {IEnchantmentData} from "../../Data/ICharacterData";


class PLC_WeaponData {

    private baseWeaponCards: Array<IWeaponBaseData>;

    constructor() {
        this.baseWeaponCards = [];
    }

    public async Initialize(weaponCards: Array<IWeaponBaseData>) {
        this.baseWeaponCards = weaponCards;
    }

    public GetCardById(cardId: string) {
        return this.baseWeaponCards.find(e => e._id === cardId);
    }

    public GetCardsByEnchantmentValues(enchantmentData: Array<IEnchantmentData>) {
        const idList = enchantmentData.map(e => e.baseId);
        return this.baseWeaponCards.filter(e => idList.includes(e._id))
    }

    public GetAllStandardWeapons() {
        return this.baseWeaponCards.filter(weapon => weapon.prerequisites.length == 0)
    }

    public GetCardPreparedStruct(prepStruct: Array<{
        baseId: string,
        enchantmentLevel: number
    }>): Array<IWeaponBaseData> {

        const a = prepStruct.map(({ baseId, enchantmentLevel }) => {
            const card = this.GetCardById(baseId);
            if (card) {
                return {
                    ...card,
                    tempEnchantValue: enchantmentLevel
                } as IWeaponBaseData; // Ensure type is consistent
            }
            return undefined; // Explicitly handle undefined case
        }).filter((e): e is IWeaponBaseData => e !== undefined); // Filter out undefined values

        return a;
    }

}

export default PLC_WeaponData