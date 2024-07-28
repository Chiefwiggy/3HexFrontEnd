import {ICommonCardData, IEffectData, UCritDie, UDamageType} from "../ICardData";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {ElementType} from 'react';
import {ICharacterBaseData} from "../ICharacterData";

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
    }

    protected getCardOfType(inputType: string) {
        return this.cards[this.cardTypes.findIndex((type) => type.name == inputType)];
    }

    public sendCurrentCards(cards: Array<ICommonCardData|null>, char: ICharacterBaseData) {
        this.cards = cards;
        this.invokeRecalculateData(char);
    }

    protected abstract invokeRecalculateData(char: ICharacterBaseData): void;
    public abstract getTitle(): string;
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

    public abstract getDamageType(): UDamageType

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
    public getEffectList(): Array<IEffectData> {
        return this.cards.reduce((pv: Array<IEffectData>, cv) => {
            if (cv && cv.effects) {
                return [...pv, ...cv.effects];
            }
            return pv;
        }, []).sort(this.sortEffects);
    }

    public abstract getFinalTopColor(): string;

    public getCards() {
        return this.cards;
    }


}

export default AbstractCardCalculator