import {IEffectData, IScaledWeaponBaseData, IWeaponBaseData, UDamageType} from "../ICardData";
import AbstractCardCalculator, {INumericIconData} from "./AbstractCardCalculator";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {
    AccessibilityNewOutlined,
    AdsClickOutlined,
    CrisisAlertOutlined,
    SportsHandballOutlined,
    WaterDropOutlined
} from "@mui/icons-material";
import {ICharacterBaseData} from "../ICharacterData";
import {GetFinalWeaponData} from "../../Utils/GetFinalSpellData";
import {getHandedness, getSkillFormat} from "../../Utils/Shorthand";
import {createRangeString} from "../../Utils/helper_functions";


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
            ],
            [
                "handedness",
                {
                    val: "One-Handed",
                    icon: AccessibilityNewOutlined
                }
            ],
            [
                "thrownDistance",
                {
                    val: "-",
                    icon: SportsHandballOutlined
                }
            ]
        ]));
    }

    public canThrow(): boolean {
        return (this.getCardOfType("weapon.base") as IScaledWeaponBaseData)?.canThrow ?? false;
    }

    protected invokeRecalculateData(char: ICharacterBaseData): void {
        if (this.cards.length > 0 && this.cards[0] != undefined) {
            const finalWeaponStats = GetFinalWeaponData(
                this.getCardOfType("weapon.base") as IScaledWeaponBaseData,
                this.cards,
                char
            )
            this.currentPower = finalWeaponStats.totalPower;
            this.currentRange = finalWeaponStats.range;
            this.thrownRange = finalWeaponStats.thrownRange;

            const baseCard = this.getCardOfType("weapon.base") as IScaledWeaponBaseData;

            this.updateVal("toHit", getSkillFormat(finalWeaponStats.toHit));
            this.updateVal("critDamage", finalWeaponStats.crit.toString());
            this.updateVal("handedness", getHandedness(char, baseCard.handedness));
            this.updateVal("thrownDistance", (baseCard.canThrow) ? createRangeString(finalWeaponStats.thrownRange) : "-");
        }
    }
    protected sortEffects(a: IEffectData, b: IEffectData): number {
        return 0;
    }

    getTitle(): string {
        if (this.getCardOfType("weapon.base")) {
            const adj = this.getCardOfType("weapon.form")?.cardName.split(" ")[0] ?? "";
            const weapon = this.getCardOfType("weapon.base")?.cardName ?? "Unarmed";
            const enchantment = (this.getCardOfType("weapon.base") as IScaledWeaponBaseData)?.enchantmentLevel;
            return adj + " " + weapon + (enchantment > 0 ? ` +${enchantment}` : "")
        }
        return "NOT LOADED";

    }

    getType(): string {
        return "ATTACK"
    }

    public getCrit() {
        return (this.getCardOfType("weapon.base") as IScaledWeaponBaseData)?.specialCrit ?? null;
    }

    getFinalTopColor(): string {
        return "white";
    }

    public getDamageType(): UDamageType {
        return (((this.getCardOfType("weapon.base") as IWeaponBaseData)?.damageType) as UDamageType) ?? "physical"
    }
}

export default WeaponCardCalculator;