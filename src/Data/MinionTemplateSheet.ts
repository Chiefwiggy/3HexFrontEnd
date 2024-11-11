import AbstractSheet from "./AbstractSheet";
import { ICharacterStats } from "./ICharacterData";
import { IDefenseBreakdown } from "./IDefenses";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {IMinionData, IMinionTemplateData, IMinionTemplateStats} from "./IMinionData";


class MinionTemplateSheet extends AbstractSheet {

    public data: IMinionTemplateData = {
        _id: "",
        minionTemplateName: "",
        minionBaseStats: {
            might: 8,
            agility: 5,
            skill: 3,
            awareness: 7,
            vitality: 7,
            knowledge: 1,
            mind: 1,
            presence: 3,
            command: 5,
            endurance: 6
        },
        currentSpell: null,
        currentWeapon: null,
        currentArmor: null,
        cardData: [],
        bonuses: {
            critBonus: 0
        }
    }
    constructor(api: IAPIContext) {
        super(api, undefined, undefined, undefined)
    }

    public updateStats(minionStats: IMinionTemplateStats) {
        this.data.minionBaseStats = minionStats;
    }
    public getMaxHealth(): number {
        throw new Error("Method not implemented.");
    }
    public getMaxStamina(): number {
        throw new Error("Method not implemented.");
    }
    public getMaxTether(): number {
        throw new Error("Method not implemented.");
    }
    public getHealth(): number {
        throw new Error("Method not implemented.");
    }
    public getStamina(): number {
        throw new Error("Method not implemented.");
    }
    public getTether(): number {
        throw new Error("Method not implemented.");
    }
    public setHealth(amount: number): void {
        throw new Error("Method not implemented.");
    }
    public setStamina(amount: number): void {
        throw new Error("Method not implemented.");
    }
    public setTether(amount: number): void {
        throw new Error("Method not implemented.");
    }
    public healthPingExecute(doSend: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public statPingExecute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public charPingExecute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public getStaminaRefresh(): number {
        throw new Error("Method not implemented.");
    }
    public getTetherRefresh(): number {
        throw new Error("Method not implemented.");
    }
    public getEvadePDEF(): number {
        throw new Error("Method not implemented.");
    }
    public getBlockPDEF(): number {
        throw new Error("Method not implemented.");
    }
    public getEvadeMDEF(): number {
        throw new Error("Method not implemented.");
    }
    public getBlockMDEF(): number {
        throw new Error("Method not implemented.");
    }
    public getEvadeDodge(): number {
        throw new Error("Method not implemented.");
    }
    public getBlockDodge(): number {
        throw new Error("Method not implemented.");
    }
    public getEvadePDEFBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getEvadeMDEFBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getBlockPDEFBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getBlockMDEFBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getEvadeDodgeBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getBlockDodgeBreakdown(): IDefenseBreakdown {
        throw new Error("Method not implemented.");
    }
    public getAbilityBonuses(bonusType: string): number {
        return 0;
    }
    public getStat(statName: "command" | keyof ICharacterStats): number {
        return this.data.minionBaseStats[statName as keyof IMinionTemplateStats] ?? 0;
    }
    public getLevel(): number {
        throw new Error("Method not implemented.");
    }

}

// @ts-ignore
export default MinionTemplateSheet