import Axios, {AxiosRequestConfig} from "axios";
import {ISourceDataAPI} from "../Data/ISourceData";


class SourceConnection {
    private _sourceURL: string;
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._sourceURL = url + "sources/";
        this._getConfig = getConfig;
    }

    public async AddSource(sourceData: ISourceDataAPI): Promise<void> {
        return await Axios.post(`${this._sourceURL}/add`, sourceData, this._getConfig()).then((resp) => {
            return resp.data.images;
        }).catch((e) => {
            console.error(e);
            throw e
        })
    }


}

export default SourceConnection;