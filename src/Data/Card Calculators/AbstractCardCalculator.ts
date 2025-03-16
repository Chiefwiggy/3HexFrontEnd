import {
    ICommonCardData,
    IEffectData,
    ISpellBaseCardData,
    IWeaponBaseData,
    IWeaponCommonData,
    UCritDie, UDamageSubtype,
    UDamageType
} from "../ICardData";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {ElementType} from 'react';
import {ICharacterBaseData} from "../ICharacterData";
import {IMinionData} from "../IMinionData";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import CharacterSheet from "../CharacterSheet";
import MinionSheet from "../MinionSheet";
import {string} from "yup";
import AbstractSheet from "../AbstractSheet";

export interface IRangeData {
    min: number,
    max: number,
    isMelee: boolean
}

export interface INumericIconData {
    val: string,
    icon: ElementType,
}

export interface INumericIconExport {
    val: string,
    icon: ElementType,
    key: string
}

abstract class AbstractCardCalculator {

    protected cards: Array<ICommonCardData|null>
    protected cardTypes: Array<ICardBuilderType>
    protected currentRange: IRangeData;
    protected thrownRange: IRangeData;
    protected currentIcons: Map<string, INumericIconData>;
    protected finalDamageType: UDamageType;
    protected finalDamageSubtype: UDamageSubtype;
    protected summonData: {
        pDEF: number,
        mDEF: number,
        movement: number,
        maxHealth: number,
        dodge: number,
        simpleName: string
    } = {
        pDEF: 0,
        mDEF: 0,
        movement: 0,
        maxHealth: 0,
        simpleName: "",
        dodge: 0
    }

    protected currentPower;
    protected constructor(cardTypes: Array<ICardBuilderType>, initialIcons: Map<string,INumericIconData>) {
        this.cards= [];
        this.cardTypes = cardTypes;
        this.currentRange = {
            min: 0,
            max: 1,
            isMelee: true
        }
        this.thrownRange = {
            min: 0,
            max: 1,
            isMelee: false
        }
        this.currentIcons = initialIcons;
        this.currentPower = 0;
        this.finalDamageSubtype = "slash";
        this.finalDamageType = "physical"
    }

    protected getCardOfType(inputType: string) {
        return this.cards[this.cardTypes.findIndex((type) => type.name.includes(inputType))];
    }

    public isValid() {
        return true;
    }

    public isSummon() {
        return this.getCardOfType("spell.summon")?.cardSubtype == "summon" ?? false
    }

    public sendCurrentCards(cards: Array<ICommonCardData|null>, char: AbstractSheet) {

        this.cards = cards.map(card => {
            if (card) {
                if (card.cardType == "weapon" && card.cardSubtype == "base") {
                    return ConstructFinalWeapon(card as IWeaponBaseData, (card as IWeaponBaseData)?.tempEnchantValue ?? {enchantmentLevel: 0, baseId: ""});
                }
            }
            return card;

        })
        this.invokeRecalculateData(char);
    }

    protected abstract invokeRecalculateData(char: AbstractSheet): void;
    public abstract getTitle(): string;
    public getAllCardNames(): string {
        return this.cards.map(e => e ? e.cardName : "").join( " • ");
    }
    public abstract getType(): string;
    public abstract getCrit(): {
        d1: UCritDie,
        d2: UCritDie,
        d3: UCritDie,
        d4: UCritDie,
        d5: UCritDie,
        d6: UCritDie
    } | null;
    public canThrow(): boolean {
        return false
    }

    protected abstract sortEffects(a: IEffectData, b: IEffectData): number;

    protected updateVal(key: string, newVal: string): void {
        const entry = this.currentIcons.get(key);
        if (entry) {
            entry.val = newVal;
            this.currentIcons.set(key, entry);
        }
    }


    public getFinalPower(): number {
        return this.currentPower;
    }

    public getSummonData() {
        return this.summonData;
    }

    public abstract getDamageType(): UDamageType
    public abstract getDamageSubtype(): UDamageSubtype

    public getFinalRange(): IRangeData  {
        return this.currentRange;
    }

    public getThrownRange(): IRangeData {
        return this.thrownRange;
    }

    public getFinalIcons(): Array<INumericIconExport> {
        const ret = Array.from(this.currentIcons.entries()).map(([key, value]) => {
            return {
                key: key,
                ...value
            }
        });
        return ret;
    }

    public getIconValue(key: string) {
        const icons = this.getFinalIcons();
        const iconFound = icons.find(e => e.key == key)
        if (iconFound) {
            return iconFound.val;
        }
        return "N/A"
    }
    public getEffectList(): Array<IEffectData> {
        const normalEffects =this.cards.reduce((pv: Array<IEffectData>, cv) => {
            if (cv && cv.effects) {
                return [...pv, ...cv.effects];
            }
            return pv;
        }, []).sort(this.sortEffects);
        const baseCard = this.cards.find(e => e?.cardSubtype == "base");
        if (baseCard?.cardType === "spell") {
            const envEffectDesc = (baseCard as ISpellBaseCardData).environmentBonus;
            const envEffect: IEffectData = {
                text: envEffectDesc,
                icon: {
                    emblem: "environment",
                    symbol: "",
                    text: ""
                }
            }
            return [...normalEffects, envEffect]
        }
        return normalEffects

    }

    public abstract getFinalTopColor(): string;

    public getCards() {
        return this.cards;
    }


}

export default AbstractCardCalculator