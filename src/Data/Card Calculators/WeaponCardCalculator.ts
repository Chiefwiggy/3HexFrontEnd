import {IEffectData, IWeaponBaseData, UDamageType} from "../ICardData";
import AbstractCardCalculator, {INumericIconData} from "./AbstractCardCalculator";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {AdsClickOutlined, CrisisAlertOutlined, WaterDropOutlined} from "@mui/icons-material";
import {ICharacterBaseData} from "../ICharacterData";
import {GetFinalWeaponData} from "../../Utils/GetFinalSpellData";
import {getSkillFormat} from "../../Utils/Shorthand";


class WeaponCardCalculator extends AbstractCardCalculator {


    constructor(cardTypes: Array<ICardBuilderType>) {
        super(cardTypes, new Map<string, INumericIconData>([
          [
              "toHit",
              {
                val: "0",
                icon: AdsClickOutlined
              }
          ],
            [
                "critDamage",
                {
                    val: "0",
                    icon: CrisisAlertOutlined
                }
            ]
        ]));
    }

    protected invokeRecalculateData(char: ICharacterBaseData): void {
        if (this.cards.length > 0 && this.cards[0] != undefined) {
            const finalWeaponStats = GetFinalWeaponData(
                this.getCardOfType("weapon.base") as IWeaponBaseData,
                this.cards,
                char
            )
            this.currentPower = finalWeaponStats.totalPower;
            this.currentRange = finalWeaponStats.range;
            this.updateVal("toHit", getSkillFormat(finalWeaponStats.toHit));
            this.updateVal("critDamage", finalWeaponStats.crit.toString());
        }
    }
    protected sortEffects(a: IEffectData, b: IEffectData): number {
        return 0;
    }

    getTitle(): string {
        const adj = this.getCardOfType("weapon.form")?.cardName.split(" ")[0] ?? "";
        const weapon = this.getCardOfType("weapon.base")?.cardName ?? "Unarmed";
        return adj + " " + weapon;
    }

    getType(): string {
        return "ATTACK"
    }

    public getCrit() {
        return (this.getCardOfType("weapon.base") as IWeaponBaseData)?.specialCrit ?? null;
    }

    getFinalTopColor(): string {
        return "white";
    }

    public getDamageType(): UDamageType {
        return (((this.getCardOfType("weapon.base") as IWeaponBaseData)?.damageType) as UDamageType) ?? "physical"
    }
}

export default WeaponCardCalculator;