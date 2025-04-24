import Axios, {AxiosRequestConfig} from 'axios';
import {IAttributeBars} from "../Data/ICharacterData";
import {IMinionBaseData_New} from "../Data/IMinionData_New";

class MinionConnection {
    private _minionURL: string;
    private _getConfig: () => AxiosRequestConfig;

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._minionURL = url + "minions/";
        this._getConfig = getConfig;
    }

    public async GetMinionData(minionIds: Array<string>) {
        return await Axios.get(`${this._minionURL}get?ids=${minionIds.join(",")}`, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e)
            return [];
        })
    }

    public async SetBars(minionId: string, healthData: IAttributeBars) {
        await Axios.put(`${this._minionURL}update?id=${minionId}`, {
            attributeBars: healthData
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async UpdateMinion(minionId: string, minionData: IMinionBaseData_New) {
        await Axios.put(`${this._minionURL}update?id=${minionId}`, {
            minionName: minionData.minionName,
            isNamedMinion: minionData.isNamedMinion,
            minionLevel: minionData.minionLevel,
            minionRoles: minionData.minionRoles,
            minionStats: minionData.minionStats,
            armorData: minionData.armorData,
            baseWeaponData: minionData.baseWeapon,
            downtimeSkill: minionData.downtimeSkill,
            primarySkill: minionData.primarySkill,
            secondarySkill: minionData.secondarySkill,
            tertiarySkill: minionData.tertiarySkill,
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }
}

export default MinionConnection