import {AttributeBarType, DamageType} from "./CharacterSheet";
import React, {SetStateAction} from "react";
import {IAttributeBar, ICharacterBaseData, ICharacterStats, UStance} from "./ICharacterData";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {ICommonCardData, UDamageType} from "./ICardData";
import {IDefenseBreakdown} from "./IDefenses";
import {ICardBuilderType} from "../Layouts/CardBuilder";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import {default_spell_cards, default_weapon_cards} from "./default_cards";
import {IArmor, IShield} from "./IArmorData";
import {IMinionData, IMinionTemplateData} from "./IMinionData";
import ConditionCard from "../Components/Cards/ConditionCard";
import {getSkillFormat} from "../Utils/Shorthand";
import {number} from "yup";
import SpellTargetSummonCard from "../Components/Cards/SpellTargetSummonCard";


abstract class AbstractSheet {


    private localState = false;
    private static localHealth = false;
    private localStat = false;
    private readonly updateCharacter: React.Dispatch<React.SetStateAction<boolean>>|undefined;
    private readonly updateHealth: React.Dispatch<React.SetStateAction<boolean>>|undefined
    private readonly updateStat: React.Dispatch<React.SetStateAction<boolean>>|undefined;
    protected API: IAPIContext
    public weightPenalty: number = 0;

    public currentStance: UStance

    public abstract data: ICharacterBaseData | IMinionData | IMinionTemplateData

    protected constructor( api: IAPIContext, ping: React.Dispatch<React.SetStateAction<boolean>>|undefined, hping: React.Dispatch<React.SetStateAction<boolean>>|undefined, sping: React.Dispatch<SetStateAction<boolean>>|undefined) {
        this.updateCharacter = ping;
        this.updateHealth = hping;
        this.updateStat = sping;
        this.currentStance = "evade";
        this.API = api;
    }


    public getMaxHealth(): number {
        return 4 + this.getAbilityBonuses("maxHealth") +
            (this.getAbilityBonuses("maxHealthScaling")+2)*this.getStat("vitality");
    }
    public getMaxStamina() {
        return 10 + this.getAbilityBonuses("maxStamina") +
            (this.getAbilityBonuses("maxStaminaScaling")+5)*this.getStat("endurance");
    }
    public getMaxTether() {
        if (this.isUnlocked("patronMagic")) {
            return this.getAbilityBonuses("maxTether") + (this.getAbilityBonuses("maxTetherScaling"))*this.getStat("mind") + (2*this.getStat("authority")) + (3*this.getStat("presence"));
        }
        return this.getAbilityBonuses("maxTether") + (this.getAbilityBonuses("maxTetherScaling")+5)*this.getStat("mind");
    }
    public abstract getHealth(): number;
    public abstract getStamina(): number;
    public abstract getTether(): number;
    public abstract setHealth(amount: number): void;
    public abstract setStamina(amount: number): void;
    public abstract setTether(amount: number): void;
    public abstract healthPingExecute(doSend: boolean): Promise<void>;
    public abstract statPingExecute(): Promise<void>;
    public abstract charPingExecute(): Promise<void>;
    public getStaminaRefresh(): number {
        return Math.floor(
            this.getStat("endurance") * (2+(this.getAbilityBonuses("staminaRefreshScaling")))
        ) + this.getAbilityBonuses("staminaRefresh")
    }
    public getTetherRefresh(): number {
        if (this.isUnlocked("patronMagic")) {
            return (this.getStat("mind")*((this.getAbilityBonuses("tetherRefreshScaling")))) + this.getAbilityBonuses("tetherRefresh") + this.getStat("authority") + this.getStat("presence");
        }

        return (this.getStat("mind")*(2+(this.getAbilityBonuses("tetherRefreshScaling")))) + this.getAbilityBonuses("tetherRefresh")
    }

    public getEvadePDEF(): number {
        let evadeArmorBonus = this.getArmorPDEF("evade");
        let evadeShieldBonus = this.getShieldPDEF("evade");
        evadeArmorBonus += this.getAbilityBonuses("pDEF");
        return Math.floor((this.getStat("vitality") + this.getStat("endurance"))*0.5) + evadeArmorBonus;
    }
    public getBlockPDEF(): number {
        let blockArmorBonus = this.getArmorPDEF("blocking");
        let blockShieldBonus = this.getShieldPDEF("blocking");
        blockArmorBonus += this.getAbilityBonuses("pDEFBlock") + this.getAbilityBonuses("DEFBlock");
        blockShieldBonus += this.getAbilityBonuses("shieldPDEF") + this.getAbilityBonuses("shieldDEF");
        console.log(this.getEvadePDEF());
        return this.getEvadePDEF()+4+blockArmorBonus+blockShieldBonus;
    }
    public getEvadeMDEF(): number {
        let evadeArmorBonus = this.getArmorMDEF("evade");
        let evadeShieldBonus = this.getShieldMDEF("evade");
        evadeArmorBonus += this.getAbilityBonuses("mDEF")
        return Math.floor((this.getStat("mind") + this.getStat("presence"))*0.5) + evadeArmorBonus + evadeShieldBonus;
    }
    public getBlockMDEF(): number {
        let blockArmorBonus = this.getArmorMDEF("blocking");
        let blockShieldBonus = this.getShieldMDEF("blocking");
        blockArmorBonus += this.getAbilityBonuses("mDEFBlock") + this.getAbilityBonuses("DEFBlock");
        return this.getEvadeMDEF()+4+blockArmorBonus+blockShieldBonus;
    }

    private getArmorDodgeBonus() {
        if (this.currentArmor) {
            if (this.currentArmor.armorClass == "light") {
                return 8
            } else if (this.currentArmor.armorClass == "heavy") {
                return -8;
            }
            return 0;
        } else {
            return 12;
        }
    }

    private getShieldDodgeBonus() {
        if (this.currentShield) {
            switch(this.currentShield.armorClass) {
                case "light":
                    return -4;
                case "standard":
                    return -8;
                case "heavy":
                    return -16
            }
        }
        return 0;
    }
    public getEvadeDodge(): number {
        let dodgeAgility = (3 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("agility");
        let dodgeAwareness = (1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness");
        let weightPenaltyBonus = this.weightPenalty*5;
        let abilityBonuses = 0;
        if (this.isUnlocked("bladeHarmony")) {
            abilityBonuses += this.getStat("presence");
        }

        let armorBonus = this.getArmorDodgeBonus();
        let shieldBonus = this.getShieldDodgeBonus();


        return 25 + (dodgeAgility + dodgeAwareness + abilityBonuses + armorBonus + shieldBonus - weightPenaltyBonus) + this.getAbilityBonuses("evadeDodge") + this.getAbilityBonuses("dodge");


    }
    public getBlockDodge(): number {
        let dodgeAgility = (2 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("blockAgilityDodgeScaling"))*this.getStat("agility");
        let dodgeAwareness = (1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("blockAgilityDodgeScaling"))*this.getStat("awareness");
        let weightPenaltyBonus = this.weightPenalty*5;

        let armorBonus = this.getArmorDodgeBonus();
        let shieldBonus = this.getShieldDodgeBonus();

        return 15 + (dodgeAgility + dodgeAwareness + armorBonus + shieldBonus - weightPenaltyBonus) + this.getAbilityBonuses("blockDodge") + this.getAbilityBonuses("dodge");
    }

    public getStepSpeed(): number {
        return 2 + this.getAbilityBonuses("stepSpeed");
    }

    public getArmorPDEF(stance: "evade" | "blocking", display=false): number {
        if (this.currentArmor) {
            if (stance === "blocking") {
                if (display) {
                    return this.currentArmor.blockPDEFBonus + this.currentArmor.pDEFBonus
                }
                return this.currentArmor.blockPDEFBonus
            }
             return this.currentArmor.pDEFBonus;
        } else if (this.isUnlocked("unarmoredDefense") && stance === "evade") {
            return Math.floor(this.getStat("vitality") * 0.5)
        }
        return 0;
    }
    public getArmorMDEF(stance: "evade" | "blocking", display=false): number {
        if (this.currentArmor) {
            if (stance === "blocking") {
                if (display) {
                    return this.currentArmor.blockMDEFBonus + this.currentArmor.mDEFBonus
                }
                return this.currentArmor.blockMDEFBonus 
            }
             return this.currentArmor.mDEFBonus;
        }
        return 0;
    }

    public getShieldPDEF(stance: "evade" | "blocking", display=false): number {
        if (this.currentShield) {
            if (stance === "blocking") {
                if (display) {
                    return this.currentShield.blockPDEFBonus + this.currentShield.pDEFBonus
                }
                return this.currentShield.blockPDEFBonus
            }
             return this.currentShield.pDEFBonus;
        }
        return 0;
    }

    public getShieldMDEF(stance: "evade" | "blocking",display=false): number {
        if (this.currentShield) {
            if (stance === "blocking") {
                if (display) {
                    return this.currentShield.blockMDEFBonus + this.currentShield.mDEFBonus
                }
                return this.currentShield.blockMDEFBonus + this.currentShield.mDEFBonus
            }
             return this.currentShield.mDEFBonus;
        }
        return 0;
    }


    public getEvadePDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadePDEF(),
            sources: [
                {
                    reason: "Vitality",
                    value: 0.5*this.getStat("vitality")
                },
                {
                    reason: "Endurance",
                    value: 0.5*this.getStat("endurance")
                },
                {
                    reason: "Armor",
                    value: this.getArmorPDEF("evade", true)
                },
                {
                    reason: "Shield",
                    value: this.getShieldPDEF("evade")
                },
                {
                    reason: "Other",
                    value: this.getAbilityBonuses("pDEF")
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
                    value: this.getArmorMDEF("evade", true)
                },
                {
                    reason: "Shield",
                    value: this.getShieldMDEF("evade")
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("mDEF")
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
                    value: 4
                },
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
                    value: this.getArmorPDEF("blocking", true)
                },
                {
                    reason: "Shield",
                    value: this.getShieldPDEF("blocking")
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("pDEF") + this.getAbilityBonuses("pDEFBlock")
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
                    value: 4
                },
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
                    value: this.getArmorMDEF("blocking", true)
                },
                {
                    reason: "Shield",
                    value: this.getShieldMDEF("blocking")
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("mDEF") + this.getAbilityBonuses("mDEFBlock")
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
                    value: getSkillFormat((3 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("agility"))
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat((1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness"))
                },
                {
                    reason: "Armor",
                    value: getSkillFormat(this.getArmorDodgeBonus(),true,true)
                },
                {
                    reason: "Shield",
                    value: getSkillFormat(this.getShieldDodgeBonus(), true, true)
                },
                {
                    reason: "Other Bonuses",
                    value: getSkillFormat(this.getAbilityBonuses("dodge") + this.getAbilityBonuses("evadeDodge") + (this.isUnlocked("bladeHarmony") ? this.getStat("presence") : 0))
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
                    reason: "Block Stance",
                    value: getSkillFormat(15, false)
                },
                {
                    reason: "Agility",
                    value: getSkillFormat((2 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("agility"))
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat((1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness"))
                },
                {
                    reason: "Armor",
                    value: getSkillFormat(this.getArmorDodgeBonus(), true, true)
                },
                {
                    reason: "Shield",
                    value: getSkillFormat(this.getShieldDodgeBonus(), true, true)
                },
                {
                    reason: "Other Bonuses",
                    value: getSkillFormat(this.getAbilityBonuses("dodge") + this.getAbilityBonuses("blockDodge"))
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

    public getHitBonus() {
        return 0;
    }
    public getCritBonus() {
        return 0;
    }

    public abstract getAbilityBonuses(bonusType: string): number;
    public abstract getStat(statName: keyof ICharacterStats | "command"): number;
    public isUnlocked(unlockType: string) {
        return false;
    }

    public abstract getLevel(): number
    public currentArmor: IArmor | undefined = undefined;
    public currentShield: IShield | undefined = undefined;

    public static canPingHealth = true;

    public refresh() {
        this.healCharacter("stamina", this.getStaminaRefresh(), false);
        this.healCharacter("tether", this.getTetherRefresh(), false);
        this._hping();
    }


    public getMaxBar(bar: AttributeBarType) {
        switch(bar) {
            case "tether":
                return this.getMaxTether();
            case "stamina":
                return this.getMaxStamina();
            case "health":
                return this.getMaxHealth();
        }
    }

    public getBarCurrent(bar: AttributeBarType) {
        switch(bar) {
            case "tether":
                return this.getTether();
            case "stamina":
                return this.getStamina();
            case "health":
                return this.getHealth();
        }
    }

    public setCurrentBar(bar: AttributeBarType, value: number) {
        switch(bar) {
            case "tether":
                return this.setTether(value);
            case "stamina":
                return this.setStamina(value);
            case "health":
                return this.setHealth(value);
        }
    }

    public damageCharacter(bar: AttributeBarType, damageType: UDamageType, amount: number, crit: number) {
        let willPing = false;
        let damageMitigator = 0;
        if (damageType === "physical") {
            damageMitigator = this.getPDEF();
        } else if (damageType === "magical") {
            damageMitigator = this.getMDEF();
        } else if (damageType === "resistant") {
            damageMitigator = this.getPDEF() + this.getMDEF();
        }
        let damageAmount = Math.max(0, amount - damageMitigator);
        if (damageAmount > 0) {
            if (bar === "stamina") {
                if (this.getStamina() < damageAmount) {
                    let remainder = damageAmount - this.getStamina();
                    this.setStamina(0);
                    this.damageCharacter("health", "raw", remainder, 0);
                } else {
                    this.setStamina(this.getStamina() - damageAmount);
                    willPing = true;
                }
            } else if (bar === "health") {
                this.setHealth(Math.max(this.getHealth() - damageAmount, 0));
                willPing = true;
            }
        }
        if (crit > 0) {
            this.setHealth(Math.max(this.getHealth() - crit, 0));
            willPing = true;
        }
        if (willPing) {
            this._hping();
        }
    }

    public healCharacter(bar: AttributeBarType, amount: number, doPing = true) {
        if (amount > 0) {
             this.setCurrentBar(bar, Math.min(this.getBarCurrent(bar) + amount, this.getMaxBar(bar)))
             if (doPing) {
                 this._hping();
             }
        }
    }

    public rest() {
        // this.healCharacter("health", 999, false);
        this.healCharacter("stamina", 999, false);
        this.healCharacter("tether", 999, false);
    }

    public useBar(bar: AttributeBarType, amount: number) {
        if (amount > 0) {
            this.setCurrentBar(bar, Math.max(this.getBarCurrent(bar) - amount, 0));
            this._hping();
        }
    }

    protected _ping() {
        if (this.updateCharacter) {
            this.updateCharacter(!this.localState);
            this.localState = !this.localState;
        }

        Promise.resolve(this.charPingExecute()).then(() => {
            // nothing;
        })

    }

    protected _hping(doSend: boolean=true) {
        if (AbstractSheet.canPingHealth) {
            if (this.updateHealth) {
                this.updateHealth(!AbstractSheet.localHealth);
                AbstractSheet.localHealth = !AbstractSheet.localHealth;
            }

            AbstractSheet.canPingHealth = false;
            setTimeout(() => {
                AbstractSheet.canPingHealth = true;
            }, 1000)
        }


        Promise.resolve(this.healthPingExecute(doSend)).then(() => {
            // nothing;
        })

    }

    protected _sping() {
        if (this.updateStat) {
            this.updateStat(!this.localStat);
            this.localStat = !this.localStat;
        }

        Promise.resolve(this.statPingExecute()).then(() => {
            // nothing;
        })
    }

    public setStance(stanceIndex: number) {
        switch(stanceIndex) {
            case 0:
                this.currentStance = "evade"
                break;
            case 1:
                this.currentStance = "block"
                break;
            case 2:
                this.currentStance = "exposed"
                break;
        }
    }

    public getStanceIndex(): number {
        switch(this.currentStance) {
            case "evade":
                return 0
            case "block":
                return 1
            case "exposed":
                return 2
        }
    }

    public getPDEF(): number {
        return this.currentStance != 'block' ? this.getEvadePDEF() : this.getBlockPDEF();
    }
    public getMDEF(): number {
        return this.currentStance != 'block' ? this.getEvadeMDEF() : this.getBlockMDEF();
    }

    public getDodge(): number {
        return this.currentStance == "evade" ? this.getEvadeDodge() : this.getBlockDodge();
    }

    public getSpellCalculatorTypes = () => {
        return [
            {
                name: ["spell.base"],
                display: "base",
                component: [SpellBaseCard],
                required: true,
                count: 1
            },
            {
                name: ["spell.target", "spell.summon"],
                display: "target",
                component: [SpellTargetCard, SpellTargetSummonCard],
                required: true,
                count: 1
            },
            {
                name: ["spell.skill"],
                display: "skill",
                component: [SpellModifierCard],
                required: true,
                count: this.isUnlocked("secondSkill") ? 2 : 1
            },
            {
                name: ["spell.edict"],
                display: "edict",
                component: [SpellModifierCard],
                required: false,
                count: 1
            },
            {
                name: ["condition.buff"],
                display: "buff",
                component: [ConditionCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            },
            {
                name: ["condition.debuff"],
                display: "debuff",
                component: [ConditionCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            }
        ]
    }

    public getWeaponCalculatorTypes = () => {
        return [
            {
                name: ["weapon.base"],
                display: "base",
                component: [WeaponBaseCard],
                required: true,
                counterRequired: true,
                counterInvalid: false,
                count: 1
            },
            {
                name: ["weapon.form"],
                display: "form",
                component: [WeaponModCard],
                required: true,
                counterRequired: true,
                counterInvalid: false,
                count: this.isUnlocked("secondForm") ? 2 : 1
            },

            {
                name: ["weapon.skill"],
                display: "skill",
                component: [WeaponModCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            },
            {
                name: ["condition.buff"],
                display: "buff",
                component: [ConditionCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            },
            {
                name: ["condition.debuff"],
                display: "debuff",
                component: [ConditionCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            }
        ]
    }



    public areAllCardsPrepared = (data: Array<ICommonCardData|null>): boolean => {
        return true;
    }


}

export default AbstractSheet