import Axios, {AxiosRequestConfig} from "axios";
import {IBaseArmorData} from "../Data/IArmorData";
import {IWeaponBaseData} from "../Data/ICardData";
import {ISourceData} from "../Data/ISourceData";
import {IConsumableTemplate} from "../Data/IConsumable";

export interface IPreloadedDataStruct {
    class: {
        cards: Object,
        abilities: Object,
        meta: Object
    },
    affinity: {
        cards: Object,
        abilities: Object
    },
    arcana: {
        cards: Object,
        abilities: Object
    },
    weaponData: Array<IWeaponBaseData>,
    armorData: Array<IBaseArmorData>,
    sources: Array<ISourceData>,
    consumableData: Array<IConsumableTemplate>
}
class PreloadedConnection {
    private _preloadedURL: string;
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._preloadedURL = url + "preload/";
        this._getConfig = getConfig;
    }

    public async GetPreloadedData(): Promise<IPreloadedDataStruct> {
        return await Axios.get(`${this._preloadedURL}getAllPreloadedContent`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e);
            return {
                class: {},
                affinity: {},
                arcana: {},
                weaponData: [],
                armorData: [],
                sources: [],
                consumableData: []
            }
        })
    }


}

export default PreloadedConnection;