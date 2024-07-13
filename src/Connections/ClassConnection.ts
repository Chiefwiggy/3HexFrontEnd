import Axios, {AxiosRequestConfig} from "axios";

class ClassConnection {

    private _classURL: string
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._classURL = url + "classes/";
        this._getConfig = getConfig;
    }

    public async GetAllClassesOfTier(tier: number) {
        return await Axios.get(`${this._classURL}/getAllOfTier/${tier}`, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

}

export default ClassConnection;