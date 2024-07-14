import {IMinionData} from "./IMinionData";
import AbstractSheet from "./AbstractSheet";
import { AttributeBarType, DamageType } from "./CharacterSheet";
import {UStance} from "./ICharacterData";


class MinionSheet extends AbstractSheet {

    public getEvadePDEF(): number {
        let evadeArmorBonus = 0;
        if (this.data.currentArmor) {
            evadeArmorBonus = this.data.currentArmor.blockPDEFBonus;
        }
        //commander cards
        //final
        return Math.floor((this.data.minionStats.endurance.value + this.data.minionStats.vitality.value)*0.5) + evadeArmorBonus;
    }

    public getBlockPDEF(): number {
        let blockArmorBonus = 0;
        if (this.data.currentArmor) {
            blockArmorBonus = this.data.currentArmor.blockPDEFBonus;
        }
        return this.getEvadePDEF()+3+blockArmorBonus;
    }
    public getEvadeMDEF(): number {
        let evadeArmorBonus = 0;
        if (this.data.currentArmor) {
            evadeArmorBonus = this.data.currentArmor.blockMDEFBonus;
        }
        //commander cards
        //final
        return Math.floor((this.data.minionStats.mind.value + this.data.minionStats.presence.value)*0.5) + evadeArmorBonus;
    }
    public getBlockMDEF(): number {
        let blockArmorBonus = 0;
        if (this.data.currentArmor) {
            blockArmorBonus = this.data.currentArmor.blockMDEFBonus;
        }
        return this.getEvadeMDEF()+3+blockArmorBonus;
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
    public setHealth(amount: number): void {
        this.data.attributeBars.health.current = amount;
    }
    public setStamina(amount: number): void {
        this.data.attributeBars.stamina.current = amount;
    }
    public setTether(amount: number): void {
        this.data.attributeBars.tether.current = amount;
    }
    public getMaxHealth(): number {
        return 4 + ((this.data.attributeBars.health.scaling.value ?? 2)*this.data.minionStats.vitality.value);
    }
    public getMaxStamina(): number {
        return 12 + ((this.data.attributeBars.stamina.scaling.value ?? 3)*this.data.minionStats.endurance.value);
    }
    public getMaxTether(): number {
        return ((this.data.attributeBars.tether.scaling.value ?? 2)*this.data.minionStats.mind.value);
    }


    public data: IMinionData;

    constructor(minionData: IMinionData) {
        super(undefined, undefined, undefined);
        this.data = minionData;
    }

    public async healthPingExecute(): Promise<void> {

    }



}



export default MinionSheet