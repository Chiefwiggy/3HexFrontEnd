import AbstractSheet from "./AbstractSheet";
import {ICalculatedSpell, ICalculatedWeapon, ICharacterStats, ISkillPointObject} from "./ICharacterData";
import { IDefenseBreakdown } from "./IDefenses";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {IMinionData, IMinionTemplateData, IMinionTemplateStats} from "./IMinionData";
import {number} from "yup";
import {IArmor} from "./IArmorData";
import {ICommonCardData} from "./ICardData";


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
        baseAuthorityRequirement: 3,
        primarySkill: "athletics",
        secondarySkill: "handling",
        tertiarySkill: "stealth",
        downtimeSkill: "",
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

    public updateName(name: string) {
        this.data.minionTemplateName = name;
    }

    public updateBaseAuthorityRequirement(requirement: number) {
        this.data.baseAuthorityRequirement = requirement;
    }

    public updateSkills(primarySkill: keyof ISkillPointObject, secondarySkill: keyof ISkillPointObject, tertiarySkill: keyof ISkillPointObject, downtimeSkill: string) {
        this.data.primarySkill = primarySkill;
        this.data.secondarySkill = secondarySkill;
        this.data.tertiarySkill = tertiarySkill;
        this.data.downtimeSkill = downtimeSkill;
    }

    public updateCards(currentWeapon: ICalculatedWeapon|null, currentSpell: ICalculatedSpell|null, allCards: Array<ICommonCardData>) {
        this.data.currentSpell = currentSpell;
        this.data.currentWeapon = currentWeapon;
        this.data.cardData = allCards;
    }

    public updateArmor(newArmor: IArmor|undefined){
        this.currentArmor = newArmor;
    }
    public getHealth(): number {
        return this.getMaxHealth()
    }
    public getStamina(): number {
        return this.getMaxStamina()
    }
    public getTether(): number {
        return this.getMaxTether()
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
    public isUnlocked(unlockType: string): boolean {
        return false;
    }

    public GetSimpleWeapon() {

        if (this.data.currentWeapon) {
            let simpleWeapon = {...this.data.currentWeapon};
            simpleWeapon.weaponBaseData.enchantmentLevel = 0;
            simpleWeapon.weaponCardsIds = [];
            return simpleWeapon;
        }
        return null;

    }

}

// @ts-ignore
export default MinionTemplateSheet