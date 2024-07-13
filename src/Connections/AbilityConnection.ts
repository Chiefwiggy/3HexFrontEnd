import Axios, {AxiosRequestConfig} from "axios";


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

    public async GetArcanaAbilities(arcanaName: string) {
        return await Axios.get(`${this._abilityURL}get/arcana/${arcanaName}`, this._getConfig()).then((resp) => {
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
}

export default AbilityConnection;