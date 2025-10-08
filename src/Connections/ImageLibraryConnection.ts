import Axios, {AxiosRequestConfig} from "axios";


class ImageLibraryConnection {
    private _imagelibURL: string;
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._imagelibURL = url + "imagelib/";
        this._getConfig = getConfig;
    }

    public async GetLibraryLedger() {
        return await Axios.get(`${this._imagelibURL}/get/all`, this._getConfig()).then((resp) => {
            return resp.data.images;
        }).catch((e) => {
            console.error(e);
            return {}
        })
    }


}

export default ImageLibraryConnection;