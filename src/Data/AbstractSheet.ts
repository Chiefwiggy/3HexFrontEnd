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
import {UArcanotype} from "./ISourceData";
import {IMinionBaseData_New, UMinionStat} from "./IMinionData_New";
import {capitalize} from "@mui/material";
import HackIOCard from "../Components/Cards/HackIOCard";
import HackModifierCard from "../Components/Cards/HackModifierCard";
import HackProtocolCard from "../Components/Cards/HackProtocolCard";
import HackBaseCard from "../Components/Cards/HackBaseCard";
import WeaponGadgetBaseCard from "../Components/Cards/WeaponGadgetBaseCard";


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

    public abstract data: ICharacterBaseData | IMinionData | IMinionTemplateData | IMinionBaseData_New

    protected constructor( api: IAPIContext, ping: React.Dispatch<React.SetStateAction<boolean>>|undefined, hping: React.Dispatch<React.SetStateAction<boolean>>|undefined, sping: React.Dispatch<SetStateAction<boolean>>|undefined) {
        this.updateCharacter = ping;
        this.updateHealth = hping;
        this.updateStat = sping;
        this.currentStance = "evade";
        this.API = api;
    }


    public getMaxHealth(): number {
        return Math.floor((4 + this.getAbilityBonuses("maxHealth") +
            (this.getAbilityBonuses("maxHealthScaling")+2)*this.getStat("vitality") + (this.getAbilityBonuses("enduranceMaxHealthScaling")*this.getStat("endurance"))) * (this.getAbilityBonuses("maxHealthMultiplier") || 1));
    }
    public getMaxStamina() {
        let maxStamina = Math.floor(10 + this.getAbilityBonuses("maxStamina") +
            (this.getAbilityBonuses("maxStaminaScaling")+5)*this.getStat("endurance") + this.getAbilityBonuses("mindMaxStaminaScaling") * this.getStat("mind"))

        if (this.isUnlocked("powerDiverter")) {
            maxStamina += this.getMaxTechnik(true);
        }

        return maxStamina
    }
    public getMaxTether() {
        if (this.isUnlocked("patronMagic")) {
            return this.getAbilityBonuses("maxTether") + (this.getAbilityBonuses("maxTetherScaling"))*this.getStat("mind") + (3*this.getStat("authority")) + (3*this.getStat("presence"));
        }
        return this.getAbilityBonuses("maxTether") + (this.getAbilityBonuses("maxTetherScaling")+5)*this.getStat("mind");
    }

    public getMaxTechnik(ignoreOverride = false): number {
        return 0;
    }

    public getMaxOrders(): number {
        return 0;
    }
    public abstract getHealth(): number;
    public abstract getStamina(): number;
    public abstract getTether(): number;
    public getOrders() {
        return 0;
    }
    public getTechnik() {
        return 0;
    }

    public abstract setHealth(amount: number): void;
    public abstract setStamina(amount: number): void;
    public abstract setTether(amount: number): void;
    public abstract setTechnik(amount: number): void;
    public abstract setOrders(amount: number): void;
    public abstract healthPingExecute(doSend: boolean): Promise<void>;
    public abstract statPingExecute(): Promise<void>;
    public abstract charPingExecute(): Promise<void>;
    public getStaminaRefresh(): number {
        let staminaMultiplier = 2.0;
        if (!this.currentArmor || this.currentArmor.armorClass == "light") {
            staminaMultiplier = 3.0
        } else if (this.currentArmor && this.currentArmor.armorClass == "heavy") {
            staminaMultiplier = 1.0
        }
        if (this.currentArmor) {
            staminaMultiplier += this.getAbilityBonuses(`${this.currentArmor.armorClass}ArmorRefreshScaling`);
        }
        staminaMultiplier += this.getAbilityBonuses("staminaRefreshScaling") + this.getAbilityBonuses("refreshScaling")

        if (this.currentShield) {
            if (this.currentShield.armorClass == "standard") {
                staminaMultiplier *= 0.75
            } else if (this.currentShield.armorClass == "heavy") {
                staminaMultiplier *= 0.5
            }
        }

        let finalRefresh = Math.floor(
            this.getStat("endurance") * staminaMultiplier
        ) + this.getAbilityBonuses("staminaRefresh")

        if (this.isUnlocked("powerDiverter")) {
            finalRefresh += this.getStat("knowledge")
        }

        return finalRefresh
    }
    public getTetherRefresh(): number {
        let tetherMultiplier = 2.0;
        if (!this.currentArmor || this.currentArmor.armorClass == "light") {
            tetherMultiplier = 3.0
        } else if (this.currentArmor && this.currentArmor.armorClass == "heavy") {
            tetherMultiplier = 1.0
        }
        if (this.currentArmor) {
            tetherMultiplier += this.getAbilityBonuses(`${this.currentArmor.armorClass}ArmorRefreshScaling`);
        }
        tetherMultiplier += this.getAbilityBonuses("tetherRefreshScaling") + this.getAbilityBonuses("refreshScaling")
        if (this.isUnlocked("patronMagic")) {
            return Math.floor(Math.max(0,this.getStat("mind")*(tetherMultiplier-2)) + this.getAbilityBonuses("tetherRefresh") + this.getStat("authority")*(tetherMultiplier*0.5) + this.getStat("presence")*(tetherMultiplier*0.5));
        }
        if (this.currentShield) {
            if (this.currentShield.armorClass == "standard") {
                tetherMultiplier *= 0.75
            } else if (this.currentShield.armorClass == "heavy") {
                tetherMultiplier *= 0.5
            }
        }



        return Math.floor((this.getStat("mind")*tetherMultiplier) + this.getAbilityBonuses("tetherRefresh"))
    }

    public getEvadePDEF(): number {
        let evadeArmorBonus = this.getArmorPDEF("evade");
        let evadeShieldBonus = this.getShieldPDEF("evade");
        evadeArmorBonus += this.getAbilityBonuses("pDEF");
        return Math.floor((this.getStat("vitality") + this.getStat("endurance"))*0.5) + evadeArmorBonus + evadeShieldBonus;
    }
    public getBlockPDEF(): number {
        let blockArmorBonus = this.getArmorPDEF("blocking");
        let blockShieldBonus = this.getShieldPDEF("blocking")
        blockArmorBonus += this.getAbilityBonuses("pDEFBlock") + this.getAbilityBonuses("DEFBlock");
        blockShieldBonus += this.getAbilityBonuses("shieldPDEF") + this.getAbilityBonuses("shieldDEF");
        return this.getEvadePDEF()+4+blockArmorBonus+blockShieldBonus;
    }
    public getEvadeMDEF(): number {
        let evadeArmorBonus = this.getArmorMDEF("evade");
        let evadeShieldBonus = this.getShieldMDEF("evade");
        evadeArmorBonus += this.getAbilityBonuses("mDEF")
        return Math.floor(this.getStat("mind")*0.5) + Math.floor(this.getStat("presence")*this.getPresenceMDEFMultiplier()) + evadeArmorBonus + evadeShieldBonus;
    }

    public getPresenceMDEFMultiplier(): number {
        return this.isUnlocked("hexcladWard") ? 1.5 : 1
    }
    public getBlockMDEF(): number {
        let blockArmorBonus = this.getArmorMDEF("blocking");
        let blockShieldBonus = this.getShieldMDEF("blocking");
        blockArmorBonus += this.getAbilityBonuses("mDEFBlock") + this.getAbilityBonuses("DEFBlock");
        return this.getEvadeMDEF()+4+blockArmorBonus+blockShieldBonus;
    }

    public getAgilityScalingBonus() {
        let agilityScalingBonus = 2.0;
        if (!this.currentArmor || this.currentArmor.armorClass == "light" ) {
            agilityScalingBonus = 2.5
        } else if (this.currentArmor.armorClass == "heavy") {
            agilityScalingBonus = 1.5
        }
        agilityScalingBonus += this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling");
        return agilityScalingBonus;
    }


    public getEvadeDodge(): number {


        const agilityScalingBonus = this.getAgilityScalingBonus();


        let dodgeAgility = agilityScalingBonus*this.getStat("agility");
        let dodgeAwareness = (1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness");
        let weightPenaltyBonus = this.weightPenalty*5;
        let abilityBonuses = 0;
        if (this.isUnlocked("bladeHarmony")) {
            abilityBonuses += this.getStat("presence");
        }



        return Math.floor(30 + (dodgeAgility + dodgeAwareness + abilityBonuses - weightPenaltyBonus) + this.getAbilityBonuses("evadeDodge") + this.getAbilityBonuses("dodge"));


    }
    public getBlockDodge(): number {



        let agilityScalingBonus= this.getAgilityScalingBonus()

        let dodgeAgility = (agilityScalingBonus-0.5)*this.getStat("agility");
        let dodgeAwareness = (1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("blockAgilityDodgeScaling"))*this.getStat("awareness");
        let weightPenaltyBonus = this.weightPenalty*5;

        return Math.floor(15 + (dodgeAgility + dodgeAwareness - weightPenaltyBonus) + this.getAbilityBonuses("blockDodge") + this.getAbilityBonuses("dodge"));
    }

    public getStepSpeed(): number {
        let armorBonus = 1;
        if (this.currentArmor && this.currentArmor.armorClass == "heavy" && !this.isUnlocked("heavyArmorSprinter")) {
            armorBonus = 0
        }
        return 2 + armorBonus + this.getAbilityBonuses("stepSpeed");
    }

    public getMaxGlyphs(): number {
        return 1 + this.getAbilityBonuses("maxGlyphs")
    }

    public getMaxAttacks(): number {
        return 1 + this.getAbilityBonuses("attacksPerTurn")
    }

    public getMaxSummons(): number {
        return 1 + this.getAbilityBonuses("summoningSlots")
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
            return Math.floor((this.getStat("vitality") + this.getStat("endurance")) * 0.5)
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
                    value: this.getStat("presence") * this.getPresenceMDEFMultiplier()
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
                    value: this.getStat("presence") * this.getPresenceMDEFMultiplier()
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
                    value: getSkillFormat(30, false)
                },
                {
                    reason: "Agility",
                    value:  getSkillFormat(Math.floor((this.getAgilityScalingBonus())*this.getStat("agility")))
                },
                {
                    reason: "Agility Scaling",
                    value: `x${this.getAgilityScalingBonus()}`
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat((1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness"))
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
                    value: getSkillFormat(Math.floor((this.getAgilityScalingBonus()-0.5)*this.getStat("agility")))
                },
                {
                    reason: "Agility Scaling",
                    value: `x${this.getAgilityScalingBonus()-0.5}`
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat((1 + this.getAbilityBonuses("agilityDodgeScaling") + this.getAbilityBonuses("evadeAgilityDodgeScaling"))*this.getStat("awareness"))
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

    public getAbilityBonuses(bonusType: string): number {
        return 0;
    }
    public abstract getStat(statName: keyof ICharacterStats | UMinionStat | "command"  ): number;
    public getCritStat(): number { return 0; }
    public getHitStat(specialLogicTags: Array<string>): number { return 0; }
    public abstract getPowerStat(specialLogicTags: Array<string>): number
    public applyRangedModifiers(minRange: number, maxRange: number, attackType: "weapon" | "spell" | "hack") {
        const isRanged = maxRange > 0;
        const rangeTag = isRanged ? "ranged" : "melee"
        const newMaxRange = maxRange + this.getAbilityBonuses(`${rangeTag}${capitalize(attackType)}MaxRangeMod`) + this.getAbilityBonuses(`${attackType}MaxRangeMod`)
        const newMinRange = minRange + this.getAbilityBonuses(`${rangeTag}${capitalize(attackType)}MinRangeMod`) + this.getAbilityBonuses(`${attackType}MinRangeMod`)
        return [newMinRange, newMaxRange];
    }
    public abstract getSpellSet(): number
    public getHackSet(): number {
        return 0;
    }
    public getGadgetHit(): number {
        return 0;
    }
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
            case "technik":
                return this.getMaxTechnik();
            case "orders":
                return this.getMaxOrders();
        }
    }

    public getLockedBar(bar: AttributeBarType) {
        switch(bar) {
            case "technik":
                return this.getLockedTechnik()
            default:
                return 0;
        }
    }

    public getLockedTechnik(): number {
        return 0;
    }

    public getBarCurrent(bar: AttributeBarType) {
        switch(bar) {
            case "tether":
                return this.getTether();
            case "stamina":
                return this.getStamina();
            case "health":
                return this.getHealth();
            case "technik":
                return this.getTechnik();
            case "orders":
                return this.getOrders();
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
            case "technik":
                return this.setTechnik(value)
            case "orders":
                return this.setOrders(value);
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
            console.log(this.getBarCurrent(bar) + amount, this.getMaxBar(bar))
             this.setCurrentBar(bar, Math.min(this.getBarCurrent(bar) + amount, this.getMaxBar(bar) - this.getLockedBar(bar)))
             if (doPing) {
                 this._hping();
             }
        }
    }

    public rest() {
        // this.healCharacter("health", 999, false);
        this.healCharacter("stamina", 999, false);
        this.healCharacter("tether", 999, false);
        this.healCharacter("orders", 999, false)
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
                count: this.isUnlocked("secondSpellSkill") ? 2 : 1
            },
            {
                name: ["spell.edict"],
                display: "edict",
                component: [SpellModifierCard],
                required: false,
                count: 1
            }
        ]
    }

    public getWeaponCalculatorTypes = () => {
        return [
            {
                name: ["weapon.base", "weapon.gadget"],
                display: "base",
                component: [WeaponBaseCard, WeaponGadgetBaseCard],
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
                count: 1 + this.getAbilityBonuses("formCards")
            },

            {
                name: ["weapon.skill"],
                display: "skill",
                component: [WeaponModCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1 + this.getAbilityBonuses("skillCards")
            },
            {
                name: ["weapon.order"],
                display: "order",
                component: [WeaponModCard],
                required: false,
                counterRequired: false,
                counterInvalid: true,
                count: 1
            }
        ]
    }

    public getHackCalculatorTypes = () => {
        return [
            {
                name: ["hack.function"],
                display: "function",
                component: [HackBaseCard],
                required: true,
                count: 1
            },
            {
                name: ["hack.io"],
                display: "I/O",
                component: [HackIOCard],
                required: true,
                count: 1
            },
            {
                name: ["hack.protocol"],
                display: "protocol",
                component: [HackProtocolCard],
                required: true,
                count: 1
            },
            {
                name: ["hack.util"],
                display: "util",
                component: [HackModifierCard],
                required: false,
                count: 1 + (this.isUnlocked("unconditional") ? 1 : 0) + (this.isUnlocked("utilitarian") ? 1 : 0 )
            }
        ]
    }



    public areAllCardsPrepared = (data: Array<ICommonCardData|null>): boolean => {
        return true;
    }

    public getBonusSpellPower(arcanotype: UArcanotype, specialLogicTags: Array<string>) {
        return 0;
    }

    public getBonusHackPower(specialLogicTags: Array<string>) {
        return 0;
    }

    public getBonusWeaponPower(specialLogicTags: Array<string>) {
        return 0;
    }


}

export default AbstractSheet