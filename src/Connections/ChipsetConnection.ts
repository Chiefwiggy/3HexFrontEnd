import Axios, {AxiosRequestConfig} from "axios";
import {IDatachipData, IDatachipDataExport, IPackageData, IPackageDataExport} from "../Data/ChipsetData";


class ChipsetConnection {
    private _packageURL: string;
    private _datachipURL: string;
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._datachipURL = url + "chipset/datachips/"
        this._packageURL = url + "chipset/packages/"
        this._getConfig = getConfig
    }

    public async AddDatachip(datachipData: IDatachipDataExport) : Promise<void> {
        return await Axios.post(`${this._datachipURL}add`, datachipData, this._getConfig()).then((resp) => {
            return resp.data.images;
        }).catch((e) => {
            console.error(e);
            throw e
        })
    }

    public async AddPackage(packageData: IPackageDataExport) : Promise<void> {
        return await Axios.post(`${this._packageURL}add`, packageData, this._getConfig()).then((resp) => {
            return resp.data.images;
        }).catch((e) => {
            console.error(e);
            throw e
        })
    }
}

export default ChipsetConnection;