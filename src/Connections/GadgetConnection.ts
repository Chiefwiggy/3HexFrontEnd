import Axios, {AxiosRequestConfig} from "axios";
import { IGadgetData } from "../Data/IGadgetData";


class GadgetConnection {
    private _gadgetURL: string
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._gadgetURL = url+"/gadgets/"
        this._getConfig = getConfig
    }

    public async AddGadget(gadgetData: IGadgetData) {
        return await Axios.post(`${this._gadgetURL}add`, gadgetData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async UpdateGadget(id: string, gadgetData: IGadgetData) {
        return await Axios.put(`${this._gadgetURL}update/${id}`, gadgetData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }
}

export default GadgetConnection;