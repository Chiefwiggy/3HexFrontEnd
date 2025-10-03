import {IEffectData, IScaledWeaponBaseData, IWeaponBaseData, UDamageSubtype, UDamageType} from "../ICardData";
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
import CharacterSheet from "../CharacterSheet";
import MinionSheet from "../MinionSheet";
import {string} from "yup";
import AbstractSheet from "../AbstractSheet";
import {MdAccessibilityNew, MdAdsClick, MdCrisisAlert, MdSportsHandball} from "react-icons/md";


class WeaponCardCalculator extends AbstractCardCalculator {


    constructor(cardTypes: Array<ICardBuilderType>) {
        super(cardTypes, new Map<string, INumericIconData>([
          [
              "toHit",
              {
                val: "0",
                icon: MdAdsClick
              }
          ],
            [
                "critDamage",
                {
                    val: "0",
                    icon: MdCrisisAlert
                }
            ],
            [
                "handedness",
                {
                    val: "One-Handed",
                    icon: MdAccessibilityNew
                }
            ],
            [
                "thrownDistance",
                {
                    val: "-",
                    icon: MdSportsHandball
                }
            ]
        ]));
    }

    public canThrow(): boolean {
        return (this.getCardOfType("weapon.base") as IScaledWeaponBaseData)?.canThrow ?? false;
    }

    protected invokeRecalculateData(char: AbstractSheet): void {
        if (this.cards.length > 0 && this.cards[0] != undefined) {
            const finalWeaponStats = GetFinalWeaponData(
                this.getCardOfType("weapon.base") as IScaledWeaponBaseData,
                this.cards,
                char
            )
            this.currentPower = finalWeaponStats.totalPower;
            this.currentRange = finalWeaponStats.range;
            this.thrownRange = finalWeaponStats.thrownRange;
            this.finalDamageType = finalWeaponStats.damageType;
            this.finalDamageSubtype = finalWeaponStats.damageSubtype;

            const baseCard = this.getCardOfType("weapon.base") as IScaledWeaponBaseData;

            this.updateVal("toHit", getSkillFormat(finalWeaponStats.toHit));
            this.updateVal("critDamage", (finalWeaponStats.crit+char.getAbilityBonuses("critDamage")).toString());
            this.updateVal("handedness", getHandedness(baseCard.handedness));
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
            const skill = this.getCardOfType("weapon.skill")?.cardName ?? "";
            const enchantment = (this.getCardOfType("weapon.base") as IScaledWeaponBaseData)?.enchantmentData
            return adj + " " + weapon + (enchantment?.enchantmentLevel > 0 ? ` +${enchantment?.enchantmentLevel}` : "") + (skill ? (" - " + skill) : "")
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
        // return (((this.getCardOfType("weapon.base") as IWeaponBaseData)?.damageType) as UDamageType) ?? "physical"
        return this.finalDamageType;
    }

    public getDamageSubtype(): UDamageSubtype {
        return this.finalDamageSubtype
    }
}

export default WeaponCardCalculator;