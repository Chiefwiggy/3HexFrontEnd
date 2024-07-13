import Axios, {AxiosRequestConfig} from 'axios'

class EquipmentConnection {
    private _equipURL: string;
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._equipURL = url + "equipment/";
        this._getConfig = getConfig;
    }

    public async GetArmor(armorID: string) {
        return await Axios.get(`${this._equipURL}/armor/get/${armorID}`, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e);
            return {}
        })
    }
}

export default EquipmentConnection