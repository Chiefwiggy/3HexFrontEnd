import {
    IEffectData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData, UDamageSubtype, UDamageType
} from "../ICardData";
import AbstractCardCalculator, {INumericIconData} from "./AbstractCardCalculator";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {
    AccessTime, AccessTimeOutlined,
    AutoFixOffOutlined,
    ElectricBoltOutlined,
    SaveAltOutlined,
    TimelineOutlined,
    WaterDropOutlined
} from "@mui/icons-material";
import {GetFinalSpellData} from "../../Utils/GetFinalSpellData";
import {ICharacterBaseData} from "../ICharacterData";
import {getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {capitalize} from "@mui/material";
import CharacterSheet from "../CharacterSheet";
import MinionSheet from "../MinionSheet";
import {string} from "yup";
import AbstractSheet from "../AbstractSheet";

class SpellCardCalculator extends AbstractCardCalculator {


    constructor(cardTypes: Array<ICardBuilderType>) {
        super(cardTypes, new Map<string, INumericIconData>([
          [
              "tetherCost",
              {
                val: "0",
                icon: WaterDropOutlined
              }
          ],
            [
                "energyCost",
                {
                    val: "0",
                    icon: ElectricBoltOutlined
                }
            ],
            [
                "spellSet",
                {
                    val: "0 : 0",
                    icon: AutoFixOffOutlined
                }
            ],
            [
                "saveType",
                {
                    val: "NONE",
                    icon: SaveAltOutlined
                }
            ],
            [
                "duration",
                {
                    val: "0",
                    icon: AccessTimeOutlined
                }
            ]
        ]));
    }
    protected invokeRecalculateData(char: AbstractSheet): void {
        if (this.cards.length > 0) {
            const finalSpellData = GetFinalSpellData(
                this.getCardOfType("spell.base") as ISpellBaseCardData,
                this.getCardOfType("spell.target") as ISpellTargetCardData ?? this.getCardOfType("spell.summon") as ISpellTargetCardData,
                this.cards.filter(e => (e?.cardSubtype != "target" && e?.cardSubtype != "summon") && e?.cardSubtype != "base"),
                char
            )
            if (finalSpellData.moneyCost > 0) {
                this.updateVal("tetherCost", `$${finalSpellData.moneyCost*finalSpellData.tetherCost}`)
            } else {
                this.updateVal("tetherCost", finalSpellData.tetherCost.toString());
            }
            this.currentPower = finalSpellData.totalPower;
            this.currentRange = finalSpellData.range;
            this.updateVal("energyCost", finalSpellData.castTime.toString());
            this.updateVal("spellSet", getSkillFormat(finalSpellData.spellSet, false))
            if (this.getCardOfType("spell.base")) {
                this.updateVal("saveType", (getStatShorthand(((this.getCardOfType("spell.base") as ISpellBaseCardData).saveType) as UStat | "none" | "luck")).toUpperCase());
            }
            this.updateVal("duration", finalSpellData.duration.toString());
            this.summonData = finalSpellData.summon;
        }


    }
    protected sortEffects(a: IEffectData, b: IEffectData): number {
        return 0;
    }

    public isValid() {
        return this.getCardOfType("spell.base") !== undefined
    }

    getTitle(): string {
        const adj = this.getCardOfType("spell.skill")?.cardName.split(" ")[0];
        const spell = this.getCardOfType("spell.base")?.cardName.split(" - ")[1] ?? this.getCardOfType("spell.base")?.cardName ?? "";
        const targ = this.getCardOfType("spell.target")?.cardName.split(" - ")[0]
        return ((adj + " ") ?? "") + (spell ?? "ERROR") + ((" " + targ) ?? "");
    }


    getType(): string {
        return "SPELL"
    }

    getCrit() {
        return null;
    }

    getFinalTopColor() {
        return 'purple'
    }

    public getDamageType(): UDamageType {
        return (((this.getCardOfType("spell.base") as ISpellBaseCardData)?.damageType) as UDamageType) ?? "magical"
    }

    public getDamageSubtype(): UDamageSubtype {
        return (this.getCardOfType("spell.base") as ISpellBaseCardData)?.damageSubtype ?? "none"
    }
}

export default SpellCardCalculator