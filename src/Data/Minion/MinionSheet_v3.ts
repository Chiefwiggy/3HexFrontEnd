import {IMinionData} from "../IMinionData";
import {IMinionBaseData_New, IMinionRoleData, UMinionStat} from "../IMinionData_New";
import PLC_MinionMetadata from "../../Hooks/usePreloadedContent/PLC_MinionMetadata";
import {IAPIContext} from "../../Hooks/useAPI/APIProvider";
import {clone} from "../../Utils/ObjectUtils";
import AbstractSheet from "../AbstractSheet";
import {boolean, number, string} from "yup";
import CharacterSheet from "../CharacterSheet";


class MinionSheet_v3 extends AbstractSheet {


    private server_data: IMinionBaseData_New;
    public data: IMinionBaseData_New;
    private metadata: PLC_MinionMetadata;
    public rolesData: Array<IMinionRoleData> = []
    public api: IAPIContext
    public owner: CharacterSheet | undefined;
    constructor(minionData: IMinionBaseData_New, metadata: PLC_MinionMetadata, api: IAPIContext, owner: CharacterSheet | undefined) {
        super(api, undefined, undefined, undefined)
        this.server_data = clone(minionData)
        this.data = clone(minionData)
        this.metadata = metadata;
        this.api = api;
        this.owner = owner;
        this.updateRoles()
    }

    private updateRoles = () => {
        this.rolesData = this.data.minionRoles.map(e => this.metadata.GetRoleById(e)).filter((e): e is IMinionRoleData => e !== null);
    }

    private getRoleStat(source: "commander" | UMinionStat, roleStat: string): number {
        return this.rolesData.reduce((pv, cv) => {
            let subObject: Record<string, number> = {}
            switch(source) {
                case "commander":
                    subObject = cv.commanderAuthorityModifiers
                    break;
                case "technique":
                    subObject = cv.minionTechniqueModifiers
                    break;
                case "toughness":
                    subObject = cv.minionToughnessModifiers
                    break;
                case "might":
                    subObject = cv.minionMightModifiers
                    break;
            }
            if (subObject[roleStat]) {
                return pv + subObject[roleStat]
            }
            return pv;
        }, 0)
    }

    public async SaveData() {
        console.log(this.data);
        this.server_data = clone(this.data)
        this.metadata.UpdateMinionData(this.data._id, this.data)
        await this.api.MinionAPI.UpdateMinion(this.data._id, this.data)
        this.updateRoles()
    }

    public RevertData() {
        console.log("REV", this.data, this.server_data)
        this.data = clone(this.server_data)
    }

    public getStat(stat: UMinionStat) {
        return this.data.minionStats[stat]
    }


    public getPowerStat(isAuth: boolean): number {
        let authMod = this.data.minionLevel;
        if (this.owner) {
            authMod = this.owner.getStat("authority");
        }
        const comMultiplier = (1 + this.getRoleStat("commander", "finalPower"));
        const powMultiplier = (1 + this.getRoleStat("might", "finalPower"));
        const powerFromCommander = comMultiplier * authMod;
        const powerFromMight = powMultiplier * this.getStat("might");
        return (powerFromCommander + powerFromMight) * 0.5;
    }

    public getSpellSet(): number {
        return 0
    }

    getCritStat(): number {

        return this.getStat("technique")
    }

    getHitStat(): number {
        return this.getStat("technique")
    }

    public SetStat(stat: UMinionStat, val: number): void {
        this.data.minionStats[stat] = val
    }

    public getCurrentStatPointsSpent() {
        return this.data.minionStats.might + this.data.minionStats.technique + this.data.minionStats.toughness;
    }

    public getMaxStatPoints() {
        if (this.data.minionLevel <= 3) {
            return (this.data.minionLevel*3)-1;
        }
        return this.data.minionLevel + 6
    }

    public getMaxPointsInStat() {
        return Math.floor(this.data.minionLevel/3*2 + 6);
    }

    isUnlocked(unlockType: string): boolean {
        return this.rolesData.reduce((pv: string[], cv) => [...pv, ...cv.unlocks], []).includes(unlockType);
    }

    public getMaxRoles() {
        if (this.data.minionLevel < 3) {
            return 1;
        } else if (this.data.minionLevel >= 30) {
            return 3;
        }
        return 2;
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
    public getAbilityBonuses(bonusType: string): number {
        return 0;
    }
    public getLevel(): number {
        return this.data.minionLevel
    }


}

export default MinionSheet_v3;