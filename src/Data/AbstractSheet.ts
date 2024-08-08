import {AttributeBarType, DamageType} from "./CharacterSheet";
import React, {SetStateAction} from "react";
import {UStance} from "./ICharacterData";
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
import {IArmor} from "./IArmorData";


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

    protected constructor( api: IAPIContext, ping: React.Dispatch<React.SetStateAction<boolean>>|undefined, hping: React.Dispatch<React.SetStateAction<boolean>>|undefined, sping: React.Dispatch<SetStateAction<boolean>>|undefined) {
        this.updateCharacter = ping;
        this.updateHealth = hping;
        this.updateStat = sping;
        this.currentStance = "evade";
        this.API = api;
    }


    public abstract getMaxHealth(): number;
    public abstract getMaxStamina(): number;
    public abstract getMaxTether(): number;
    public abstract getHealth(): number;
    public abstract getStamina(): number;
    public abstract getTether(): number;
    public abstract setHealth(amount: number): void;
    public abstract setStamina(amount: number): void;
    public abstract setTether(amount: number): void;
    public abstract healthPingExecute(doSend: boolean): Promise<void>;
    public abstract statPingExecute(): Promise<void>;
    public abstract charPingExecute(): Promise<void>;
    public abstract getStaminaRefresh(): number;
    public abstract getTetherRefresh(): number;

    public abstract getEvadePDEF(): number;
    public abstract getBlockPDEF(): number;
    public abstract getEvadeMDEF(): number;
    public abstract getBlockMDEF(): number;
    public abstract getEvadeDodge(): number;
    public abstract getBlockDodge(): number;

    public abstract getEvadePDEFBreakdown(): IDefenseBreakdown;
    public abstract getEvadeMDEFBreakdown(): IDefenseBreakdown;
    public abstract getBlockPDEFBreakdown(): IDefenseBreakdown;
    public abstract getBlockMDEFBreakdown(): IDefenseBreakdown;
    public abstract getEvadeDodgeBreakdown(): IDefenseBreakdown;
    public abstract getBlockDodgeBreakdown(): IDefenseBreakdown;

    public abstract getLevel(): number
    public currentArmor: IArmor | undefined = undefined;

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
        this.healCharacter("health", 999, false);
        this.healCharacter("stamina", 999, false);
        this.healCharacter("tether", 999, false);
        console.log("REST");

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
        this.currentStance = stanceIndex == 0 ? "evade" : "block"
    }

    public getStanceIndex(): number {
        return this.currentStance == "evade" ? 0 : 1;
    }

    public getPDEF(): number {
        return this.currentStance == 'evade' ? this.getEvadePDEF() : this.getBlockPDEF();
    }
    public getMDEF(): number {
        return this.currentStance == 'evade' ? this.getEvadeMDEF() : this.getBlockMDEF();
    }

    public getDodge(): number {
        return this.currentStance == "evade" ? this.getEvadeDodge() : this.getBlockDodge();
    }


        public spellCalculatorTypes: Array<ICardBuilderType> = [
        {
            name: "spell.base",
            display: "base",
            component: SpellBaseCard,
            required: true
        },
        {
            name: "spell.target",
            display: "target",
            component: SpellTargetCard,
            required: true
        },
        {
            name: "spell.skill",
            display: "skill",
            component: SpellModifierCard,
            required: true
        },
        {
            name: "spell.edict",
            display: "edict",
            component: SpellModifierCard,
            required: false
        }
    ]

    public weaponCalculatorTypes: Array<ICardBuilderType> = [
        {
            name: "weapon.base",
            display: "base",
            component: WeaponBaseCard,
            required: true,
            counterRequired: true,
            counterInvalid: false
        },
        {
            name: "weapon.form",
            display: "form",
            component: WeaponModCard,
            required: true,
            counterRequired: true,
            counterInvalid: false
        },

        {
            name: "weapon.skill",
            display: "skill",
            component: WeaponModCard,
            required: false,
            counterRequired: false,
            counterInvalid: true
        }
    ]

    public areAllCardsPrepared = (data: Array<ICommonCardData|null>): boolean => {
        return true;
    }


}

export default AbstractSheet