import Axios, {AxiosRequestConfig} from "axios";
import {IAbility} from "../Data/IAbilities";


class AbilityConnection {
    private _abilityURL: string
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._abilityURL = url + "abilities/";
        this._getConfig = getConfig;
    }

    public async GetAbilitiesForCharacter(charId: string) {
        return await Axios.get(`${this._abilityURL}getPossible/${charId}`, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetAbilitiesForClass(className: string) {
        return await Axios.get(`${this._abilityURL}get/class/${className}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetPathAbilities(pathName: string) {
        return await Axios.get(`${this._abilityURL}get/path/${pathName}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetAffinityAbilities(affinityName: string) {
        return await Axios.get(`${this._abilityURL}get/affinity/${affinityName}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async UpdateAbility(id: string, abilityData: IAbility) {
        return await Axios.put(`${this._abilityURL}update/${id}`, abilityData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async AddAbility(abilityData: IAbility) {
        return await Axios.post(`${this._abilityURL}add`, abilityData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }
}

export default AbilityConnection;