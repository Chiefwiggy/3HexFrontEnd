import {IMinionData} from "../IMinionData";
import {IMinionBaseData_New, IMinionRoleData, UMinionStat} from "../IMinionData_New";
import PLC_MinionMetadata from "../../Hooks/usePreloadedContent/PLC_MinionMetadata";
import {IAPIContext} from "../../Hooks/useAPI/APIProvider";
import {clone} from "../../Utils/ObjectUtils";
import AbstractSheet from "../AbstractSheet";
import {number} from "yup";


class MinionSheet_v3 extends AbstractSheet {


    private server_data: IMinionBaseData_New;
    public data: IMinionBaseData_New;
    private metadata: PLC_MinionMetadata;
    public rolesData: Array<IMinionRoleData> = []
    public api: IAPIContext
    constructor(minionData: IMinionBaseData_New, metadata: PLC_MinionMetadata, api: IAPIContext) {
        super(api, undefined, undefined, undefined)
        this.server_data = clone(minionData)
        this.data = clone(minionData)
        this.metadata = metadata;
        this.api = api;
        this.updateRoles()
    }

    private updateRoles = () => {
        this.rolesData = this.data.minionRoles.map(e => this.metadata.GetRoleById(e)).filter((e): e is IMinionRoleData => e !== null);
    }

    public async SaveData() {
        console.log("saV", this.data, this.server_data)
        this.server_data = clone(this.data)
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
        return this.getStat("might")
    }

    public getSpellSet(): number {
        return 0
    }

    public SetStat(stat: UMinionStat, val: number): void {
        this.data.minionStats[stat] = val
    }

    public getCurrentStatPointsSpent() {
        return this.data.minionStats.might + this.data.minionStats.technique + this.data.minionStats.toughness;
    }

    public getMaxStatPoints() {
        if (this.data.minionLevel <= 3) {
            return (this.data.minionLevel*3)-1
        }
        return this.data.minionLevel + 6
    }

    public getMaxRoles() {
        if (this.data.minionLevel < 3) {
            return 1;
        } else if (this.data.minionLevel > 40) {
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
        throw new Error("Method not implemented.");
    }
    public getLevel(): number {
        return this.data.minionLevel
    }


}

export default MinionSheet_v3;