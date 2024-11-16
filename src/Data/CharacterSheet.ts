import {
    IAffinities, IPathKeys,
    ICalculatedSpell,
    ICalculatedWeapon,
    ICharacterBaseData, ICharacterStats, IClassData, IPreparedCard, IPreparedSource,
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
    UCharacterStat, UDamageSubtype, UDamageType, UWeaponClass, VDamageSubtypes
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
import {ConstructFinalArmor, ConstructFinalWeapon, ScaleChainNumeric} from "../Utils/ConstructFinalWeapon";
import MinionSheet from "./MinionSheet";
import {IMinionData} from "./IMinionData";
import PLC_ArmorData from "../Hooks/usePreloadedContent/PLC_ArmorData";
import {IPreloadedContentContextInput} from "../Hooks/usePreloadedContent/PreloadedContentProvider";
import {Utils} from "../Utils/LanguageLacking";
import {IFatelineData} from "./IFatelineData";
import {IDowntimePlayerData} from "./IDowntime";
import {number} from "yup";

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
    public currentPath: IPathKeys



    public allCards: IAllCardsData | null = null;
    public allButDefaultCards: IAllCardsData | null = null;
    public commanderCards: Array<ICommanderCardData> = [];
    public minionData: Array<MinionSheet> = [];

    private baseExpertiseDice = 3;
    private expertiseDiceValues: Record<string, number> = {};



    public spellCalculator = new SpellCardCalculator(this.spellCalculatorTypes);
    public weaponCalculator = new WeaponCardCalculator(this.weaponCalculatorTypes);


    public allAbilities: Array<IAbility> = [];
    private sendReadyFn: React.Dispatch<SetStateAction<boolean>>;
    public preloadedData: IPreloadedContentContextInput

    private delayPing: boolean = false;
    private currentTimeout: any = null;

    private _canDualWield: boolean = false;
    private _hasUnarmored: boolean = false;

    private _weaknesses: Array<UDamageSubtype> | null = null;
    private _resistances: Array<UDamageSubtype> | null = null;





    public setCurrentSpell = (data: ICalculatedSpell) => {
        this.data.currentSpell = data;
        this._ping();
    }

    public setCurrentWeapon = (data: ICalculatedWeapon) => {
        this.data.currentWeapon = data;
        this._ping();
    }

    public setOffhandWeapon = (data: ICalculatedWeapon) => {
        this.data.currentOffhandWeapon = data;
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

    public setDowntimeData = (data: Array<IDowntimePlayerData>) => {
        this.data.downtimeData = data;
        this._ping();
    }

    public setPreparedCommanderCards = (data: Array<string>) => {
        this.data.preparedCommanderCards = data;
        this._ping();
        this._hping();
    }

    public getPreparedCardsIdList = () => {
        return this.data.preparedCards.map(e => e.cardId);
    }

    public getPreparedCommanderCards = () => {
        return this.commanderCards.filter(e => this.data.preparedCommanderCards.includes(e._id));
    }

    public setDieColor = async(dieColorId: string) => {
        this.data.settings.dieColorId = dieColorId;
        await this.API.CharacterAPI.UpdateSettings(this.data._id, {...this.data.settings, dieColorId})
        this.manualCharPing()
    }

    public getHitBonus(): number {
        return this.data.bonuses?.critBonus ?? 0;
    }

    public getCritBonus(): number {
        return this.data.bonuses?.hitBonus ?? 0;
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

    public getMaxReinforcements = () => {
        return 1 + this.getAbilityBonuses("reinforcementSlots");
    }

    public areAllCardsPrepared = (data: Array<ICommonCardData|null>): boolean => {
        return data.reduce((pv, cv) => {
            if (!pv) return pv;
            if (cv != null) {
                if (cv.cardType != "condition") {
                    return [...this.data.preparedCards.map(e => e.cardId), ...this.data.knownWeapons.map(e => e.baseId), ...this.data.knownBaseSpells, ...default_weapon_cards.map(e => e._id), ...default_spell_cards.map(e => e._id)].includes(cv._id);
                }
                return pv;
            }
            return pv;
        }, true)
    }


    public changeActionPoints(amount: number) {
        const prev = this.data.currentActionPoints;
        this.data.currentActionPoints = Utils.Clamp(this.data.currentActionPoints+amount, 0, this.getActionPointsMax())
        if (prev != this.data.currentActionPoints) {
            if (!this.delayPing) {
                this.delayPing = true;
            } else {
                if (this.currentTimeout) {
                    window.clearTimeout(this.currentTimeout);
                }
            }
            this.currentTimeout = setTimeout(() => {
                this.delayPing = false;
                this._hping()
            }, 5000);
        }

    }

    public getAbilityBonuses = (bonusType: string) => {
        const ab = this.allAbilities.reduce((pv, cv) => {
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

        const cc = this.getCommanderBonus(`bonuses.${bonusType}`, "commander");
        return ab + cc;
    }

    public isUnlocked = (unlockType: string) => {

        try {
            return [...this.allAbilities, ...this.getPreparedCommanderCards()].reduce((pv, cv) => {
                if (pv) return pv;
                const strSplit = unlockType.split(".");
                let ability: any = cv.unlocks;
                if (ability) {
                    strSplit.forEach(str => {
                        ability = ability[str];
                    })
                    if (ability) {
                        return true
                    }
                }
                return pv;
            }, false)
        } catch (e) {
            return false;
        }

    }

    public canDualWield() {
        return this._canDualWield;
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
            value: pts > total*2 ? total * 3 : total + pts,
            isExpert: this.expertiseDiceValues[skillName] > 0 ?? false
        }
    }

    public getExpertiseDice = () => {
        return this.baseExpertiseDice + this.getAbilityBonuses("expertiseDice");
    }

    public getMaxSkillPoints = () => {
        return this.getStat("knowledge")*5 + this.getStat("skill")*3 + this.getLevel();
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
        }, 0) + (Math.floor(this.getLevel() / 60)+1)*10
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

    public getDowntimeRanks = () => {
        return 2 + Math.floor((this.getStat("knowledge") + this.getStat("skill"))/10) + this.getAbilityBonuses("downtimeRanks")
    }

    public getCurrentDowntimeRanks = () => {
        return this.data.downtimeData.reduce((pv, cv) => {
            return pv + cv.proficiency;
        }, 0)
    }

    public getDowntimeMaxRank = () => {
        return 2 + Math.floor(this.getLevel() / 30)
    }

    public getStatCap = () => {
        return Math.floor(this.getLevel() * 0.2) + 10
    }

    public getTotalStatPoints = () => {
        return this.getLevel() + 35;
    }

    public editStat(val: number, statName: string) {
        this.data.characterStats[statName as UStat].value = Math.max(0, val);
        this._sping();
    }

    // public getClassesString = () => {
    //     const highestTier = this.data.classes.reduce((pv, cv) => {
    //         if (cv.classTier > pv) {
    //             return cv.classTier;
    //         }
    //         return pv;
    //     }, 0)
    //     return this.data.classes.filter(e => e.classTier == highestTier).sort((a,b) => {
    //         if (a.isPromoted != b.isPromoted) {
    //             if (a.isPromoted) return -1;
    //             else return 1;
    //         } else {
    //             return a.className.localeCompare(b.className);
    //         }
    //     }).map(e => e.isPromoted ? e.className + "+" : e.className).join(" • ")
    // }
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
                    return {
                        ...e,
                        tempEnchantValue: preparedStruct?.additionalData ?? 0
                    }
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

    public GetPreparedWeaponBases = (): Array<IWeaponBaseData> => {
        if (this.allCards) {
            return this.allCards.weapons.bases.map(base => {
                const prepData = this.data.preparedCards.find(e => e.cardId === base._id);
                return base;
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
            nimble: 0,
            infantry: 0,
            guardian: 0,
            focus: 0,
            creation: 0,
            alteration: 0,
            leadership: 0,
            supply: 0,
            summoning: 0,
            swift: 0,
            riding: 0,
            versatile: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            machinery: 0,
            abjuration: 0,
            biohacking: 0,
        }
        this.currentPath = {
            warrior: 0,
            arcanist: 0,
            commander: 0,
            navigator: 0,
            scholar: 0,
            hacker: 0
        }
        this._setAffinities()
        this.preloadedData = preloadedData;
        this.setArmor();




        this.initializeAsync().then(r => {
            this._canDualWield = this.isUnlocked("dualWielding");
            this._hasUnarmored = this.isUnlocked("unarmoredDefense");
            this.setExpertiseDice()
        });

     }
     private setExpertiseDice () {
        const expertiseObject = this.data.classes.flatMap(clz => clz.classExpertises).reduce((acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }), {} as Record<string, number>);
        const abilityBonuses = Object.keys(this.data.skillPoints).reduce((pv, cv) => {
            pv[cv] = this.getAbilityBonuses(`${cv}Expertise`) + (expertiseObject[cv] ?? 0);
            return pv;
        }, {} as Record<string, number>);

        this.expertiseDiceValues = abilityBonuses;

        this.baseExpertiseDice = Object.values(abilityBonuses).reduce((pv, cv) => {
            if (cv > 1) {
                return pv + cv - 1;
            }
            return pv;
        }, 3);
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
        if (this.data.currentArmor) {
            this.currentArmor = this.preloadedData.ArmorData.GetConstructedArmorById(this.data.currentArmor.baseId, this.data.currentArmor.enchantmentLevel);
            this._setWeightPenalty()
        }
     }

     public UpdateArmor(newArmor: IArmor|undefined) {
        this.currentArmor = newArmor;
        this._setWeightPenalty();

        if (newArmor) {
            this.data.currentArmor = {
                baseId: newArmor._id,
                enchantmentLevel: newArmor.enchantmentLevel,
            }
        } else {
            this.data.currentArmor = null
        }

        this._ping();
        return this.data.currentArmor;
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
                this.allCards.weapons.bases.push(default_weapon_cards[1]);
                this.allCards.weapons.forms.push(default_weapon_cards[2]);
            }
            this.commanderCards = [...gotCards.commanderCards, ...default_commander_cards];
        } catch (error) {
            console.error('Error setting all cards:', error);
        }
    }

    public ManualSetAllCards = async() => {
        await this._setAllCards()
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
        this.changeActionPoints(1);
        for (const minion of this.minionData) {
            minion.refresh();
        }
        super.refresh();

    }

    public breather() {
        this.healCharacter("stamina", this.getStaminaBreather(), true);
    }

    public async rest() {
        this.data.currentActionPoints = this.getActionPointsMax();
        this.minionData.forEach((minion) => {
            minion.rest();
            minion.healthPingExecute();
        })
        super.rest();
        this._hping()
    }

    private _setAllAbilities = async() => {
        try {
            this.allAbilities = await this.API.AbilityAPI.GetAbilitiesForCharacter(this.data._id);
        } catch (error) {
            console.error('Error setting all abilities:', error);
        }
    }

    private _setWeightPenalty() {
        if (this.currentArmor && this.data.characterStats.vitality.value < this.currentArmor.vitalityRequirement) {

            this.weightPenalty = -(this.data.characterStats.vitality.value - this.currentArmor.vitalityRequirement);
        } else {
            this.weightPenalty = 0;
        }
    }

    private _setAffinities() {
        this.currentAffinities = {
            nimble: 0,
            infantry: 0,
            guardian: 0,
            focus: 0,
            creation: 0,
            alteration: 0,
            leadership: 0,
            supply: 0,
            summoning: 0,
            swift: 0,
            riding: 0,
            versatile: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            machinery: 0,
            abjuration: 0,
            biohacking: 0,
        }
        this.data.classes.forEach((val) => {
            Object.entries(val.affinities).forEach(([key, value]) => {
                this.currentAffinities[key as keyof IAffinities] += value;
            })
        })
        if (this.data.fateline) {
            Object.entries(this.data.fateline.affinities).forEach(([key, value]) => {
                this.currentAffinities[key as keyof IAffinities] += value;
            })
        }

        this.currentPath = {
            warrior: this.currentAffinities.nimble + this.currentAffinities.infantry + this.currentAffinities.guardian,
            arcanist: this.currentAffinities.focus + this.currentAffinities.creation + this.currentAffinities.alteration,
            commander: this.currentAffinities.leadership + this.currentAffinities.supply + this.currentAffinities.summoning,
            navigator: this.currentAffinities.swift + this.currentAffinities.riding + this.currentAffinities.versatile,
            scholar: this.currentAffinities.rune + this.currentAffinities.research + this.currentAffinities.sourcecraft,
            hacker: this.currentAffinities.abjuration + this.currentAffinities.machinery + this.currentAffinities.biohacking
        }
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
        return 3 + Math.floor(this.getStat("knowledge") * 0.5) + this.getAbilityBonuses("cardSlots");
    }

    public getTempCardSlots(): number {
        return 1 + this.getAbilityBonuses("tempCardSlots")
    }

    public getTempSourcesCanPrepare(): number {
        return 1 + this.getAbilityBonuses("tempSourcesKnown")
    }

    public getAuthoritySlots(): number {
        return 1 + Math.floor(this.getStat("authority") / 3) + this.getAbilityBonuses("commanderCardSlots");
    }


    public getStaminaBreather(): number {
        return this.getStaminaRefresh() + this.getAbilityBonuses("staminaBreather") + (this.isUnlocked("mindBreathing") ? Math.floor(this.getStat("mind") * 0.5): 0);

    }

    public getQuickSlots(): number {
        return 2 + this.getAbilityBonuses("quickSlots");
    }



    public getWeaponClassAffinity(weaponClass: UWeaponClass) {
        switch (weaponClass){
            case "light":
                return this.currentAffinities.nimble;
            case "standard":
                return this.currentAffinities.infantry;
            case "heavy":
                return this.currentAffinities.guardian;
        }
    }

    public getMaxWeaponForClass(weaponClass: UWeaponClass, handedness: number) {
        let affTotal = this.getWeaponClassAffinity(weaponClass);
        if (handedness == 1.5 && this.isUnlocked("ironGrasp")) {
            return affTotal + 1;
        }
        return affTotal;
    }

    public getHandedness(weaponClass: UWeaponClass, handedness: number, currentEnchant: number) {
        if (handedness <= 1.2) {
            return "One-Handed"
        } else if (handedness >= 2) {
            return "Two-Handed"
        }
        let affTotal = this.getWeaponClassAffinity(weaponClass);
        if (this.isUnlocked("ironGrasp") && currentEnchant > affTotal) {
            return "Two-Handed"
        } else {
            return "Versatile"
        }
    }

    public getSkillRequirementString(weaponData: IWeaponBaseData, enchantmentLevel: number) {
        const normal = ScaleChainNumeric(weaponData.skillRequirement, enchantmentLevel)
        let upped = 0
        if (weaponData.handedness == 1.5 && this.isUnlocked("ironGrasp") && enchantmentLevel) {
            upped = ScaleChainNumeric(weaponData.skillRequirement, Math.max(enchantmentLevel-1, 0))
        }
        if (this.getWeaponClassAffinity(weaponData.weaponClass) < enchantmentLevel) {
            return `${upped}`
        }
        if (upped > 0 && upped < normal) {
            return `${normal} / ${upped}`
        }
        return `${normal}`
    }


    public getResistancesAndWeaknesses(force = false) {
        console.log(this._resistances, this._weaknesses);
        if (force || (this._resistances == null && this._weaknesses == null)) {

            console.log("egg");

            const resistances = VDamageSubtypes.filter(dst => {
                console.log(dst);
                return this.isUnlocked(`${dst}Resistance`)
            })
            const weaknesses = VDamageSubtypes.filter(dst => {
                return this.isUnlocked(`${dst}Weakness`)
            })

            const resistancesSet = new Set(resistances);
            const weaknessSet = new Set(weaknesses);

            const finalResistances = resistances.filter(item => !weaknessSet.has(item));
            const finalWeakness = weaknesses.filter(item => !resistancesSet.has(item));

            this._resistances = finalResistances;
            this._weaknesses = finalWeakness;
        }
        return {
            resistances: this._resistances ?? [],
            weaknesses: this._weaknesses ?? []
        }

    }

    public getActionPointsMax() {
        return 3 + this.getAbilityBonuses("actionPoints");
    }

    public getStat(stat: UStat): number {
        return StatChain(this.data.characterStats[stat].value, [this.data.characterStats[stat].modifiers])
    }


    public EnterEditMode() {
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
        this._setAffinities()
        this._ping();
    }

    public async SaveCharacterSources(sourceData: Array<IPreparedSource>, tempSources: Array<IPreparedSource>) {
        this.data.knownSources = sourceData;
        this.data.temporarySources = tempSources;
        this.data.currentSpell = null;
        await this.API.CharacterAPI.UpdateSource(this.data._id, sourceData, tempSources)
        this.manualCharPing()
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