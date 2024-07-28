import Axios, {AxiosRequestConfig} from 'axios';
import {IAttributeBars} from "../Data/ICharacterData";

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
}

export default MinionConnection