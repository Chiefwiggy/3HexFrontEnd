import {AttributeBarType, DamageType} from "./CharacterSheet";
import React, {SetStateAction} from "react";
import {UStance} from "./ICharacterData";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {UDamageType} from "./ICardData";


abstract class AbstractSheet {


    private localState = false;
    private localHealth = false;
    private localStat = false;
    private readonly updateCharacter: React.Dispatch<React.SetStateAction<boolean>>|undefined;
    private readonly updateHealth: React.Dispatch<React.SetStateAction<boolean>>|undefined
    private readonly updateStat: React.Dispatch<React.SetStateAction<boolean>>|undefined;

    public currentStance: UStance

    protected constructor( ping: React.Dispatch<React.SetStateAction<boolean>>|undefined, hping: React.Dispatch<React.SetStateAction<boolean>>|undefined, sping: React.Dispatch<SetStateAction<boolean>>|undefined) {
        this.updateCharacter = ping;
        this.updateHealth = hping;
        this.updateStat = sping;
        this.currentStance = "evade";
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
    public abstract healthPingExecute(): Promise<void>;

    public abstract getEvadePDEF(): number;
    public abstract getBlockPDEF(): number;
    public abstract getEvadeMDEF(): number;
    public abstract getBlockMDEF(): number;


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

    }

    protected _hping() {
        if (this.updateHealth) {
            this.updateHealth(!this.localHealth);
            this.localHealth = !this.localHealth;
        }

        Promise.resolve(this.healthPingExecute()).then(() => {
            // nothing;
        })

    }

    protected _sping() {
        if (this.updateStat) {
            this.updateStat(!this.localStat);
            this.localStat = !this.localStat;
        }
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


}

export default AbstractSheet