import {
    IAffinities, IArcanaKeys,
    ICalculatedSpell,
    ICalculatedWeapon,
    ICharacterBaseData, ICharacterStats, IClassData, IPreparedCard,
    ISkillPointObject,
    UStance
} from "./ICharacterData";
import {getSkillFormat, UStat} from "../Utils/Shorthand";
import {StatChain} from "../Utils/GetFinalSpellData";
import {
    ICommanderCardData,
    ICommonCardData, IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData, IWeaponBaseData,
    UAffinity,
    UCharacterStat
} from "./ICardData";
import {IAPIContext} from "../Hooks/useAPI/APIProvider";
import {IArmor} from "./IArmorData";
import {IDefenseBreakdown} from "./IDefenses";
import React, {SetStateAction, useState} from "react";
import {ICardBuilderType} from "../Layouts/CardBuilder";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import SpellCardCalculator from "./Card Calculators/SpellCardCalculator";
import {default_commander_cards, default_spell_cards, default_weapon_cards} from "./default_cards";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import WeaponCardCalculator from "./Card Calculators/WeaponCardCalculator";
import {ISkillConfig, ISkillItemConfig, skill_config} from "./skill_config";
import {capitalize} from "@mui/material";
import {IAbility} from "./IAbilities";
import AttributeBar from "../Components/Sheet/AttributeBar";
import {waitFor} from "@testing-library/react";
import affinitiesPanel from "../Components/ClassSelect/Affinities/AffinitiesPanel";
import AbstractSheet from "./AbstractSheet";
import {ConstructFinalArmor, ConstructFinalWeapon} from "../Utils/ConstructFinalWeapon";
import MinionSheet from "./MinionSheet";
import {IMinionData} from "./IMinionData";
import PLC_ArmorData from "../Hooks/usePreloadedContent/PLC_ArmorData";
import {IPreloadedContentContextInput} from "../Hooks/usePreloadedContent/PreloadedContentProvider";

export type AttributeBarType = "tether" | "stamina" | "health"
export type DamageType = "physical" | "magical" | "raw" | "resistant"



interface IAllCardsData {
    spells: {
        bases: Array<any>,
        targets: Array<any>,
        modifiers: Array<any>
    },
    weapons: {
        bases: Array<any>,
        forms: Array<any>,
        skills: Array<any>
    }
}


class CharacterSheet extends AbstractSheet {

    public data: ICharacterBaseData
    private dataBackup: ICharacterBaseData;
    public currentAttack: any
    public currentAffinities: IAffinities
    public currentArcana: IArcanaKeys


    public allCards: IAllCardsData | null = null;
    public allButDefaultCards: IAllCardsData | null = null;
    public commanderCards: Array<ICommanderCardData> = [];
    public minionData: Array<MinionSheet> = [];



    public spellCalculator = new SpellCardCalculator(this.spellCalculatorTypes);
    public weaponCalculator = new WeaponCardCalculator(this.weaponCalculatorTypes);


    public allAbilities: Array<IAbility> = [];
    private sendReadyFn: React.Dispatch<SetStateAction<boolean>>;
    public preloadedData: IPreloadedContentContextInput





    public setCurrentSpell = (data: ICalculatedSpell) => {
        this.data.currentSpell = data;
        this._ping();
    }

    public setCurrentWeapon = (data: ICalculatedWeapon) => {
        this.data.currentWeapon = data;
        this._ping();
    }

    public setCurrentCounter = (data: ICalculatedWeapon) => {
        this.data.counterWeapon = data;
        this._ping();
    }

    public setPreparedCards = (data: Array<IPreparedCard>) => {
        this.data.preparedCards = data
        this._ping();
    }

    public setPreparedCommanderCards = (data: Array<string>) => {
        this.data.preparedCommanderCards = data;
        this._ping();
    }

    public getPreparedCardsIdList = () => {
        return this.data.preparedCards.map(e => e.cardId);
    }

    public getPreparedCommanderCards = () => {
        return this.commanderCards.filter(e => this.data.preparedCommanderCards.includes(e._id));
    }

    public getCumulativeCommanderCard = (): ICommanderCardData => {
        return {
            appliesTo: {
                commander: false,
                adjutant: undefined,
                minions: false
            },
            characterModifiers: {},
            unlocks: {},
            cardName: `Leader ${this.data.characterName}`,
            cardType: "commander",
            cardSubtype: "commander",
            effects: this.getPreparedCommanderCards().flatMap(card => {
                return card.effects
            }),
            prerequisites: [],
            _id: "",
            minionSlots: this.getPreparedCommanderCards().reduce((pv, card) => {
                return pv + (card.minionSlots ?? 0);
            }, 0)
        }
    }

    public areAllCardsPrepared = (data: Array<ICommonCardData|null>): boolean => {
        return data.reduce((pv, cv) => {
            if (!pv) return pv;
            if (cv != null) {
                 return [...this.data.preparedCards.map(e => e.cardId), ...this.data.knownWeapons.map(e => e.baseId), ...this.data.knownBaseSpells, ...default_weapon_cards.map(e => e._id), ...default_spell_cards.map(e => e._id)].includes(cv._id);
            }
            return pv;
        }, true)
    }

    public useActionPoint() {
        this.data.currentActionPoints -= 1;
        this._hping();
    }

    public regainActionPoints(amount: number) {
        this.data.currentActionPoints = Math.min(this.data.currentActionPoints + amount, this.getActionPointsMax())
    }

    public getAbilityBonuses = (bonusType: string) => {
        return this.allAbilities.reduce((pv, cv) => {
            try {
                const strSplit = bonusType.split(".");
                let ability: any = cv.bonuses;
                strSplit.forEach(str => {
                    ability = ability[str];
                })
                if (Number.isInteger(ability)) {
                    return pv + ability as number;
                }
                return pv;
            } catch (e) {
                return pv;
            }
        }, 0)
    }

    public getCommanderBonus = (bonusType: string, whoFor: "commander" | "adjutant" | "minion" = "commander") => {
        return this.getPreparedCommanderCards().reduce((pv, cv) => {
            switch (whoFor) {
                case "commander":
                    if (!cv.appliesTo.commander) return pv;
                    break;
                case "adjutant":
                    if (!cv.appliesTo.adjutant) return pv;
                    break;
                case "minion":
                    if (!cv.appliesTo.minions) return pv;
                    break;
            }
            try {
                const strSplit = bonusType.split(".");
                let ability: any = cv.characterModifiers;
                strSplit.forEach(str => {
                    ability = ability[str];
                })
                if (Number.isInteger(ability)) {
                    return pv + ability as number;
                }
                return pv;
            } catch (e) {
                return pv;
            }
        }, 0)
    }

    public getSkillData = (skillName: string) => {

        const config = skill_config[skillName.toLowerCase() as keyof ISkillConfig] as ISkillItemConfig;

        const total = config.attr.reduce((pv, cv) => {
            return pv + this.getStat(cv as UStat);
        }, 0)

        const pts = this.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject] as number;

        return {
            value: pts > total ? total * 2 : total + pts,
            isExpert: this.data.classes.flatMap(clz => clz.classExpertises).includes(skillName.toLowerCase())
        }
    }

    public getMaxSkillPoints = () => {
        return this.getStat("knowledge")*2 + this.getStat("skill")*2 + this.getLevel();
    }

    public getSkillPointsUsed = () => {
        return Object.values(this.data.skillPoints).reduce((pv, cv) => {
            if (Number.isInteger(cv)) {
                return pv + cv;
            }
            return pv;
        }, 0)
    }

    public isSkillCapped = (skillName: string, atCapReturnFalse = false) => {
        const total = this.getCap(skillName);

        const pts = this.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject] as number;

        if (atCapReturnFalse) {
            return pts > total;
        }
        return pts >= total;
    }

    public getCap = (skillName: string) => {
        const config = skill_config[skillName.toLowerCase() as keyof ISkillConfig] as ISkillItemConfig;

        return config.attr.reduce((pv, cv) => {
            return pv + this.getStat(cv as UStat);
        }, 0)
    }

    public getSkillBreakdown = (skillName: string): IDefenseBreakdown => {

        const config = skill_config[skillName.toLowerCase() as keyof ISkillConfig] as ISkillItemConfig;
        const total = config.attr.reduce((pv, cv) => {
            return pv + this.getStat(cv as UStat);
        }, 0)

        const pts = this.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject] as number;

        return {
            totalValue: pts > total ? total * 2 : pts + total,
            sources: [
                {
                    reason: "Skill Points",
                    value: getSkillFormat(pts)
                },
                ...(pts > total ? [{
                    reason: "(capped at",
                    value: getSkillFormat(total) + ")"
                }] : []),
                ...config.attr.map(attr => {
                    return {
                        reason: capitalize(attr),
                        value: getSkillFormat(this.getStat(attr as UStat))
                    }
                }),

            ]
        }
    }

    public getLevel = () => {
        return this.data.characterLevel;
    }

    public getStatCap = () => {
        return Math.floor(this.getLevel() * 0.2) + 10
    }

    public getTotalStatPoints = () => {
        return this.getLevel() + 35;
    }

    public editStat(mod: number, statName: string) {
        this.data.characterStats[statName as UStat].value += mod;
        if (statName === "endurance") {
            this.data.attributeBars.stamina.current = Math.max(this.getStamina() + this.data.attributeBars.stamina.scaling.value*mod, 0);
        } else if (statName === "vitality") {
            this.data.attributeBars.health.current = Math.max(this.getHealth() + this.data.attributeBars.health.scaling.value*mod, 0);
        } else if (statName === "mind") {
            this.data.attributeBars.tether.current = Math.max(this.getTether() + this.data.attributeBars.tether.scaling.value*mod, 0);
        }
        this._sping();
    }

    public getClassesString = () => {
        const highestTier = this.data.classes.reduce((pv, cv) => {
            if (cv.classTier > pv) {
                return cv.classTier;
            }
            return pv;
        }, 0)
        return this.data.classes.filter(e => e.classTier == highestTier).map(e => e.className).join(" • ")
    }
    public getPreparedWeaponCards = () => {
        if (this.allButDefaultCards) {
            const weaponCards: Array<ICommonCardData> = [...this.allButDefaultCards.weapons.forms, ...this.allButDefaultCards.weapons.skills, ...this.allButDefaultCards.weapons.bases];
            const filteredCards = weaponCards.filter(card => {
                return this.getPreparedCardsIdList().includes(card._id)
            })
            return filteredCards.map(e => {
                if (e.cardSubtype == "base") {
                    const preparedStruct = this.data.preparedCards.find(prep => prep.cardId === e._id);
                    console.log(preparedStruct);
                    return ConstructFinalWeapon(e as IWeaponBaseData, preparedStruct?.additionalData ?? 0)
                } else {
                    return e;
                }
            })
        }
        return [];
    }

    public getPreparedSpellCards = (): Array<ICommonCardData> => {
        if (this.allButDefaultCards) {
            const spellCards: Array<ICommonCardData> = [...this.allButDefaultCards.spells.bases, ...this.allButDefaultCards.spells.targets, ...this.allButDefaultCards.spells.modifiers];
            const filteredCards = spellCards.filter(card => {
                return this.getPreparedCardsIdList().includes(card._id)
            })
            return filteredCards.map(e => {
                return e;
            })
        }
        return [];
    }

    public GetPreparedWeaponBases = (): Array<IScaledWeaponBaseData> => {
        if (this.allCards) {
            return this.allCards.weapons.bases.map(base => {
                const prepData = this.data.preparedCards.find(e => e.cardId === base._id);
                try {
                    return ConstructFinalWeapon(base, prepData?.additionalData ?? 0);
                } catch (e) {
                    return base as IScaledWeaponBaseData
                }
            })
        }
        return [];

    }


    constructor(charData: ICharacterBaseData, api: IAPIContext, sendReady: React.Dispatch<React.SetStateAction<boolean>>, ping: React.Dispatch<React.SetStateAction<boolean>>, hping: React.Dispatch<React.SetStateAction<boolean>>, sping: React.Dispatch<SetStateAction<boolean>>, preloadedData: IPreloadedContentContextInput) {
        super(api, ping, hping, sping);
        this.sendReadyFn = sendReady;
        sendReady(false);
        this.data = charData;
        this.dataBackup = JSON.parse(JSON.stringify(this.data));
        this.API = api;
        this.currentAttack = null;
        this.currentAffinities = {
            hex: 0,
            rune: 0,
            soul: 0,
            deft: 0,
            infantry: 0,
            guardian: 0,
            leadership: 0,
            erudite: 0,
            supply: 0,
            biohacking: 0,
            abjuration: 0,
            machinery: 0
        }
        this.currentArcana = {
            arcane: 0,
            warrior: 0,
            support: 0,
            hacker: 0
        }
        this._setAffinities()
        this.preloadedData = preloadedData;
        this.setArmor();


        this.initializeAsync().then(r => {

        });
     }

     private async initializeAsync() {
        try {
            await this._setAllAbilities();
            await this._setAllCards();
            await this._setAllMinions();
            if (this.allCards != null && this.minionData.length === this.data.minionsOwned.length) {
                this.sendReadyFn(true);
            }
        } catch (error) {
            console.error('Initialization error:', error);
            this.sendReadyFn(false);
        }
     }

     private setArmor(timeout = 0) {
        console.log(this.preloadedData.ArmorData.hasData());
        if (this.data.currentArmor) {
            this.currentArmor = this.preloadedData.ArmorData.GetConstructedArmorById(this.data.currentArmor.baseId, this.data.currentArmor.enchantmentLevel);
            this._setWeightPenalty()
        }
     }

    private _setAllCards = async() => {
        try {
            const gotCards = await this.API.CardAPI.GetCharacterCards(this.data._id);
            const apiCards: IAllCardsData = {spells: gotCards.spells, weapons: gotCards.weapons};
            this.allCards = apiCards;
            this.allButDefaultCards = JSON.parse(JSON.stringify(apiCards));
            if (this.allCards) {
                this.allCards.spells.targets.push(default_spell_cards[0]);
                this.allCards.spells.modifiers.push(default_spell_cards[1]);
                this.allCards.weapons.bases.push(default_weapon_cards[0]);
                this.allCards.weapons.forms.push(default_weapon_cards[1]);
            }
            this.commanderCards = [...gotCards.commanderCards, ...default_commander_cards];
        } catch (error) {
            console.error('Error setting all cards:', error);
        }
    }

    private _setAllMinions = async() => {
        try {
            if (this.data.minionsOwned.length > 0) {
                const minionRawData = await this.API.MinionAPI.GetMinionData(this.data.minionsOwned.map(e => e.minionId));
                this.minionData = minionRawData.map((md: IMinionData, index: number) => {
                    return new MinionSheet(md, this.API, this.data.minionsOwned[index].isEquipped, this)
                })
            }

        } catch (e) {
            console.error("minion set error", e);
        }
    }

    public refresh() {
        this.regainActionPoints(1);
        for (const minion of this.minionData) {
            minion.refresh();
        }
        super.refresh();

    }

    public rest() {
        this.data.currentActionPoints = this.getActionPointsMax();
        super.rest();
    }

    private _setAllAbilities = async() => {
        try {
            this.allAbilities = await this.API.AbilityAPI.GetAbilitiesForCharacter(this.data._id);
        } catch (error) {
            console.error('Error setting all abilities:', error);
        }
    }

    private _setWeightPenalty() {
        console.log(this.currentArmor?.vitalityRequirement);
        if (this.currentArmor && this.data.characterStats.vitality.value < this.currentArmor.vitalityRequirement) {

            this.weightPenalty = -(this.data.characterStats.vitality.value - this.currentArmor.vitalityRequirement);
            console.log(this.weightPenalty)
        } else {
            this.weightPenalty = 0;
        }
    }

    private _setAffinities() {
        this.data.classes.forEach((val) => {
            Object.entries(val.affinities).forEach(([key, value]) => {
                this.currentAffinities[key as keyof IAffinities] += value;
            })
        })
        this.currentArcana = {
            arcane: this.currentAffinities.hex + this.currentAffinities.soul + this.currentAffinities.rune,
            warrior: this.currentAffinities.infantry + this.currentAffinities.guardian + this.currentAffinities.deft,
            support: this.currentAffinities.leadership + this.currentAffinities.erudite + this.currentAffinities.supply,
            hacker: this.currentAffinities.biohacking + this.currentAffinities.abjuration + this.currentAffinities.machinery
        }
    }

    public getArcanaAndAffinitiesFromClassList(classes: Array<IClassData>) {
        const currentAffinities = {
            hex: 0,
            rune: 0,
            soul: 0,
            deft: 0,
            infantry: 0,
            guardian: 0,
            leadership: 0,
            erudite: 0,
            supply: 0,
            biohacking: 0,
            abjuration: 0,
            machinery: 0
        }
        let currentArcana = {
            arcane: 0,
            warrior: 0,
            support: 0,
            hacker: 0
        }
        classes.forEach((val) => {
            Object.entries(val.affinities).forEach(([key, value]) => {
                currentAffinities[key as keyof IAffinities] += value;
            })
        })
        currentArcana = {
            arcane: currentAffinities.hex + currentAffinities.soul + currentAffinities.rune,
            warrior: currentAffinities.infantry + currentAffinities.guardian + currentAffinities.deft,
            support: currentAffinities.leadership + currentAffinities.erudite + currentAffinities.supply,
            hacker: currentAffinities.biohacking + currentAffinities.abjuration + currentAffinities.machinery
        }
        const a = {
            arcana: currentArcana,
            affinities: currentAffinities
        }
        return a;
    }

    public getMaxHealth() {
        return 4 + this.getAbilityBonuses("maxHealth") + ((this.data.attributeBars.health.scaling.value ?? 2) * this.data.characterStats.vitality.value);
    }

    public getMaxStamina() {
        return 12 + this.getAbilityBonuses("maxStamina") + ((this.data.attributeBars.stamina.scaling.value ?? 3) * this.data.characterStats.endurance.value)
    }

    public getMaxTether() {
        return this.getAbilityBonuses("maxTether") + ((this.data.attributeBars.tether.scaling.value ?? 2) * this.data.characterStats.mind.value);
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

    public setHealth(value: number) {
        this.data.attributeBars.health.current = value;
    }

    public setStamina(value: number) {
        this.data.attributeBars.stamina.current = value;
    }

    public setTether(value: number) {
        this.data.attributeBars.tether.current = value;
    }


    public getCardSlots(): number {
        return 1 + Math.floor(this.data.characterStats.knowledge.value * 0.5) + this.getAbilityBonuses("cardSlots");
    }

    public getAuthoritySlots(): number {
        return 1 + Math.floor(this.data.characterStats.authority.value * 0.2) + this.getAbilityBonuses("authoritySlots");
    }




    public getStaminaRefresh(): number {
        return this.data.characterStats.endurance.value + (this.data.bonuses?.staminaRefresh ?? 0);
    }

    public getTetherRefresh(): number {
        return Math.floor(this.data.characterStats.mind.value / 2) + (this.data.bonuses?.tetherRefresh ?? 0);
    }

    public getEvadePDEF(): number {
        let evadeArmorBonus= 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.pDEFBonus;
        }
        evadeArmorBonus += this.getAbilityBonuses("pDEF");
        return Math.floor((this.data.characterStats.vitality.value + this.data.characterStats.endurance.value)*0.5) + evadeArmorBonus;
    }

    public getBlockPDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockPDEFBonus;
        }
        return this.getEvadePDEF()+3+blockArmorBonus;
    }


    public getEvadeMDEF(): number {
        let evadeArmorBonus= 0;
        if (this.currentArmor) {
            evadeArmorBonus = this.currentArmor.mDEFBonus;
        }
        evadeArmorBonus += this.getAbilityBonuses("mDEF");
        return Math.floor((this.data.characterStats.presence.value + this.data.characterStats.mind.value)*0.5) + evadeArmorBonus;
    }

    public getBlockMDEF(): number {
        let blockArmorBonus = 0;
        if (this.currentArmor) {
            blockArmorBonus = this.currentArmor.blockMDEFBonus;
        }
        return this.getEvadeMDEF()+3+blockArmorBonus;
    }

    public getEvadePDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadePDEF(),
            sources: [
                {
                    reason: "Vitality",
                    value: this.data.characterStats.vitality.value * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.data.characterStats.endurance.value * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor?.pDEFBonus ?? 0
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("pDEF") + this.getAbilityBonuses("pDEFEvade")
                }
            ]
        }
    }

    public getActionPointsMax() {
        return 3 + this.getAbilityBonuses("actionPoints");
    }

    public getEvadeMDEFBreakdown(): IDefenseBreakdown {
        return {
            totalValue: this.getEvadeMDEF(),
            sources: [
                {
                    reason: "Presence",
                    value: this.data.characterStats.presence.value * 0.5
                },
                {
                    reason: "Mind",
                    value: this.data.characterStats.mind.value * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor?.mDEFBonus ?? 0
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("mDEF") + this.getAbilityBonuses("mDEFEvade")
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
                    value: this.data.characterStats.vitality.value * 0.5
                },
                {
                    reason: "Endurance",
                    value: this.data.characterStats.endurance.value * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor ? this.currentArmor.pDEFBonus + this.currentArmor.blockPDEFBonus : 0
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
                    value: 3
                },
                {
                    reason: "Presence",
                    value: this.data.characterStats.presence.value * 0.5
                },
                {
                    reason: "Mind",
                    value: this.data.characterStats.mind.value * 0.5
                },
                {
                    reason: "Armor",
                    value: this.currentArmor ? this.currentArmor.mDEFBonus + this.currentArmor.blockMDEFBonus : 0
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("mDEF") + this.getAbilityBonuses("mDEFBlock")
                }
            ]
        }
    }


    public getEvadeDodge(): number {
        return 25+(2*this.data.characterStats.agility.value)+this.data.characterStats.awareness.value-(this.weightPenalty*3) + this.getAbilityBonuses("dodgeEvade") + this.getAbilityBonuses("dodge");
    }

    public getBlockDodge(): number {
        return 15+(this.data.characterStats.agility.value)+this.data.characterStats.awareness.value-(this.weightPenalty*3) + this.getAbilityBonuses("dodgeBlock") + this.getAbilityBonuses("dodge");
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
                    value: getSkillFormat(2*this.data.characterStats.agility.value)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.data.characterStats.awareness.value)
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("dodge") + this.getAbilityBonuses("dodgeEvade")
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
                    value: getSkillFormat(this.data.characterStats.agility.value)
                },
                {
                    reason: "Awareness",
                    value: getSkillFormat(this.data.characterStats.awareness.value)
                },
                {
                    reason: "Other Bonuses",
                    value: this.getAbilityBonuses("dodge") + this.getAbilityBonuses("dodgeBlock")
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

    public getStat(stat: UStat): number {
        return StatChain(this.data.characterStats[stat].value, [this.data.characterStats[stat].modifiers])
    }


    public EnterEditMode() {
        console.log("Enter EditMode with:");
        console.log(this.data);
        this.dataBackup = JSON.parse(JSON.stringify(this.data));
    }

    public CancelSaveMode() {
        console.log("Exit EditMode with:");
        console.log(this.data);
        console.log("Exit backup data:");
        console.log(this.dataBackup);
        this.data = JSON.parse(JSON.stringify(this.dataBackup));
        this._hping();
    }

    public async SaveCharacterSheet() {
        this.dataBackup = JSON.parse(JSON.stringify(this.data));
        console.log(this.data);
        await this.API.CharacterAPI.UpdateCharacter(this.data._id, this.data);
        this.sendReadyFn(false);
        await this.initializeAsync();
    }

    public async healthPingExecute(doSend: boolean): Promise<void> {
        if (doSend) {
            Promise.resolve(this.API.CharacterAPI.SetBars(this.data._id,this.data.attributeBars, this.data.currentActionPoints)).then().catch();
        }

    }

    public async charPingExecute(): Promise<void> {

    }

    public async statPingExecute(): Promise<void> {
        this._setWeightPenalty()
    }

    public manualCharPing = () => {
        this._ping();
    }

    public manualHealthPing = (doSend: boolean = true) => {
        this._hping(doSend);
    }

    public async InvokeUpdateMinionPreparation() {
        const minionMetadata: Array<{
            isEquipped: boolean,
            minionId: string
        }> = this.minionData.map(minionDatum => {
            return {
                isEquipped: minionDatum.isPrepared,
                minionId: minionDatum.data._id
            }
        })
        this.data.minionsOwned = minionMetadata;
        await this.API.CharacterAPI.UpdateMinionsPrepared(this.data._id, minionMetadata);
        this._ping();
    }


}

export default CharacterSheet;