import {IMinionData, IMinionStats} from "./IMinionData";
import AbstractSheet from "./AbstractSheet";
import CharacterSheet, { AttributeBarType, DamageType } from "./CharacterSheet";
import {ICharacterStats, UStance} from "./ICharacterData";
import {ICardBuilderType} from "../Layouts/CardBuilder";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import {default_spell_cards, default_weapon_cards} from "./default_cards";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {IDefenseBreakdown} from "./IDefenses";
import {getSkillFormat, UStat} from "../Utils/Shorthand";
import {IArmor} from "./IArmorData";
import {StatChain} from "../Utils/GetFinalSpellData";


class MinionSheet extends AbstractSheet {
    public isUnlocked(unlockType: string): boolean {
        return false;
    }



    public getEvadePDEF(): number {
        let evadeArmorBonus = 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.pDEFBonus;
        }
        //commander cards
        //final
        return Math.floor(
            (this.getStat("endurance") + this.getStat("vitality") )*0.5) + evadeArmorBonus;
    }

    public getBlockPDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockPDEFBonus;
        }
        return this.getEvadePDEF()+4+blockArmorBonus;
    }
    public getEvadeMDEF(): number {
        let evadeArmorBonus = 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.mDEFBonus;
        }
        //commander cards
        //final
        return Math.floor((this.getStat("mind") + this.getStat("presence"))*0.5) + evadeArmorBonus;
    }
    public getBlockMDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockMDEFBonus;
        }
        return this.getEvadeMDEF()+4+blockArmorBonus;
    }

    public getHealth(): number {
        return this.data.attributeBars.health.current;
    }
    public getStamina(): number {
        return this.data.attributeBars.stamina.current;
    }
    public getTether(): number {
        return this.data.attributeBars.tether.current;
    }
    public setHealth(amount: number): void {
        this.data.attributeBars.health.current = amount;
    }
    public setStamina(amount: number): void {
        this.data.attributeBars.stamina.current = amount;
    }
    public setTether(amount: number): void {
        this.data.attributeBars.tether.current = amount;
    }
    public getMaxHealth(): number {
        return 4 + ((2)*this.getStat("vitality")
);
    }
    public getMaxStamina(): number {
        // return 12 + ((this.data.attributeBars.stamina.scaling.value ?? 4)*this.getStat("endurance")
        return 10 + ((5)*this.getStat("endurance")
);
    }

    public getMaxTether(): number {
        return (5)*this.getStat("mind");
    }

     public getEvadeDodge(): number {
        return 30+(3*this.getStat("agility")
)+this.getStat("awareness")
-(this.weightPenalty*5);
    }

    public getBlockDodge(): number {
        return 15+(2*this.getStat("agility")
)+this.getStat("awareness")
-(this.weightPenalty*5);
    }

    public getLevel(): number {
        return Object.entries(this.data.minionStats).reduce((pv, [key, value]) => {
            return pv + value.value;
        }, 0) - 35;
    }


    public data: IMinionData;
    public isPrepared: boolean;
    private owner: CharacterSheet

    constructor(minionData: IMinionData, api: IAPIContext, isPrepared: boolean, owner: CharacterSheet) {
        super(api,undefined, undefined, undefined);
        this.data = minionData;
        this.data.cardData.push(...default_spell_cards)
        this.data.cardData.push(...default_weapon_cards);
        this.isPrepared = isPrepared
        this.owner = owner;
        this.setArmor();
    }

    private setArmor() {
        if (this.data.currentArmor) {
            this.currentArmor = this.owner.preloadedData.ArmorData.GetConstructedArmorById(this.data.currentArmor.baseId, this.data.currentArmor.enchantmentLevel);
            this._setWeightPenalty()
        }
    }

    private _setWeightPenalty() {
        console.log(this.currentArmor?.vitalityRequirement);
        if (this.currentArmor && this.getStat("vitality")
 < this.currentArmor.vitalityRequirement) {

            this.weightPenalty = -(this.getStat("vitality")
 - this.currentArmor.vitalityRequirement);
            console.log(this.weightPenalty)
        } else {
            this.weightPenalty = 0;
        }
    }
    public async healthPingExecute(): Promise<void> {
        Promise.resolve(this.API.MinionAPI.SetBars(this.data._id,this.data.attributeBars)).then().catch();
        this.owner.manualHealthPing(false);
    }

    charPingExecute(): Promise<void> {
        return Promise.resolve(undefined);
    }

    statPingExecute(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public getStaminaRefresh(): number {
        return Math.floor(this.getStat("endurance")*2) + (this.data.bonuses?.staminaRefresh ?? 0);
    }

    public getTetherRefresh(): number {
        return (this.getStat("mind")*2) + (this.data.bonuses?.tetherRefresh ?? 0);
    }

    public getStat(stat: keyof IMinionStats | "command"): number {
        return StatChain(this.data.minionStats[stat].value, [this.data.minionStats[stat].modifiers]) + this.owner.getCommanderBonus(`stats.${stat}.modifier`, "minion")
    }

    public getEvadePDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadePDEF(),
            sources: [
                {
                    reason: "Vitality",
                    value: this.getStat("vitality") * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.getStat("endurance") * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor?.pDEFBonus ?? 0
                }
            ]
        }
    }

    public getEvadeMDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadeMDEF(),
            sources: [
                {
                    reason: "Presence",
                    value: this.getStat("presence") * 0.5
                },
                {
                    reason: "Mind",
                    value: this.getStat("mind") * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor?.mDEFBonus ?? 0
                }
            ]
        }
    }

    public getBlockPDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getBlockPDEF(),
            sources: [
                {
                    reason: "Blocking",
                    value: 3
                },
                {
                    reason: "Vitality",
                    value: this.getStat("vitality")
 * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.getStat("endurance")
 * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor ? this.currentArmor.pDEFBonus + this.currentArmor.blockPDEFBonus : 0
                }
            ]
        }
    }

    public getBlockMDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getBlockMDEF(),
            sources: [
                {
                    reason: "Blocking",
                    value: 3
                },
                {
                    reason: "Presence",
                    value: this.getStat("presence")
 * 0.5
                },
                {
                    reason: "Mind",
                    value: this.getStat("mind")
 * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor ? this.currentArmor.mDEFBonus + this.currentArmor.blockMDEFBonus : 0
                }
            ]
        }
    }

     public getEvadeDodgeBreakdown(): IDefenseBreakdown {
        const ret = {
            totalValue: getSkillFormat(this.getEvadeDodge(), false),
            sources: [
                {
                    reason: "Evade Stance",
                    value: getSkillFormat(30, false)
                },
                {
                    reason: "Agility",
                    value: getSkillFormat(2*this.getStat("agility")
)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.getStat("awareness")
)
                }
            ]
        }
        if (this.weightPenalty > 0) {
            ret.sources.push({
                reason: "Encumbered",
                value: "-"+getSkillFormat(this.weightPenalty*5, false)
            })
        }
        return ret;
    }

    public getBlockDodgeBreakdown(): IDefenseBreakdown {
        const ret = {
            totalValue: getSkillFormat(this.getBlockDodge(), false),
            sources: [
                {
                    reason: "Dodge Stance",
                    value: getSkillFormat(15, false)
                },
                {
                    reason: "Agility",
                    value: getSkillFormat(this.getStat("agility")
)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.getStat("awareness")
)
                }
            ]
        }
        if (this.weightPenalty > 0) {
            ret.sources.push({
                reason: "Encumbered",
                value: "-"+getSkillFormat(this.weightPenalty*5, false)
            })
        }
        return ret;
    }

    public getAbilityBonuses(bonusType: string): number {
        return this.owner.getCommanderBonus(`bonuses.${bonusType}`, "minion");
    }



}



export default MinionSheet