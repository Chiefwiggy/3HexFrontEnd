import {IMinionData} from "./IMinionData";
import AbstractSheet from "./AbstractSheet";
import CharacterSheet, { AttributeBarType, DamageType } from "./CharacterSheet";
import {UStance} from "./ICharacterData";
import {ICardBuilderType} from "../Layouts/CardBuilder";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import {default_spell_cards, default_weapon_cards} from "./default_cards";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {IDefenseBreakdown} from "./IDefenses";
import {getSkillFormat} from "../Utils/Shorthand";
import {IArmor} from "./IArmorData";


class MinionSheet extends AbstractSheet {


    public getEvadePDEF(): number {
        let evadeArmorBonus = 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.pDEFBonus;
        }
        //commander cards
        //final
        return Math.floor((this.data.minionStats.endurance.value + this.data.minionStats.vitality.value)*0.5) + evadeArmorBonus;
    }

    public getBlockPDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockPDEFBonus;
        }
        return this.getEvadePDEF()+3+blockArmorBonus;
    }
    public getEvadeMDEF(): number {
        let evadeArmorBonus = 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.mDEFBonus;
        }
        //commander cards
        //final
        return Math.floor((this.data.minionStats.mind.value + this.data.minionStats.presence.value)*0.5) + evadeArmorBonus;
    }
    public getBlockMDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockMDEFBonus;
        }
        return this.getEvadeMDEF()+3+blockArmorBonus;
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
        return 4 + ((2)*this.data.minionStats.vitality.value);
    }
    public getMaxStamina(): number {
        // return 12 + ((this.data.attributeBars.stamina.scaling.value ?? 4)*this.data.minionStats.endurance.value);
        return 12 + ((4)*this.data.minionStats.endurance.value);
    }

    public getMaxTether(): number {
        return 6 + ((3)*this.data.minionStats.mind.value);
    }

     public getEvadeDodge(): number {
        return 25+(2*this.data.minionStats.agility.value)+this.data.minionStats.awareness.value-(this.weightPenalty*3);
    }

    public getBlockDodge(): number {
        return 15+(this.data.minionStats.agility.value)+this.data.minionStats.awareness.value-(this.weightPenalty*3);
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
        if (this.currentArmor && this.data.minionStats.vitality.value < this.currentArmor.vitalityRequirement) {

            this.weightPenalty = -(this.data.minionStats.vitality.value - this.currentArmor.vitalityRequirement);
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
        return this.data.minionStats.endurance.value + (this.data.bonuses?.staminaRefresh ?? 0);
    }

    public getTetherRefresh(): number {
        return Math.floor(this.data.minionStats.mind.value / 2) + (this.data.bonuses?.tetherRefresh ?? 0);
    }

    public getEvadePDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadePDEF(),
            sources: [
                {
                    reason: "Vitality",
                    value: this.data.minionStats.vitality.value * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.data.minionStats.endurance.value * 0.5
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
                    value: this.data.minionStats.presence.value * 0.5
                },
                {
                    reason: "Mind",
                    value: this.data.minionStats.mind.value * 0.5
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
                    value: this.data.minionStats.vitality.value * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.data.minionStats.endurance.value * 0.5
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
                    value: this.data.minionStats.presence.value * 0.5
                },
                {
                    reason: "Mind",
                    value: this.data.minionStats.mind.value * 0.5
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
                    value: getSkillFormat(25, false)
                },
                {
                    reason: "Agility",
                    value: getSkillFormat(2*this.data.minionStats.agility.value)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.data.minionStats.awareness.value)
                }
            ]
        }
        if (this.weightPenalty > 0) {
            ret.sources.push({
                reason: "Encumbered",
                value: "-"+getSkillFormat(this.weightPenalty*3, false)
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
                    value: getSkillFormat(this.data.minionStats.agility.value)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.data.minionStats.awareness.value)
                }
            ]
        }
        if (this.weightPenalty > 0) {
            ret.sources.push({
                reason: "Encumbered",
                value: "-"+getSkillFormat(this.weightPenalty*3, false)
            })
        }
        return ret;
    }



}



export default MinionSheet