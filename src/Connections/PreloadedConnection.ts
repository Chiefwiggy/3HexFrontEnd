import Axios, {AxiosRequestConfig} from "axios";
import {IBaseArmorData, IBaseShieldData} from "../Data/IArmorData";
import {IConditionCard, IWeaponBaseData} from "../Data/ICardData";
import {ISourceData} from "../Data/ISourceData";
import {IConsumableTemplate} from "../Data/IConsumable";
import {IFatelineFullData} from "../Data/IFatelineData";
import {IDowntimeActivity} from "../Data/IDowntime";

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
    path: {
        cards: Object,
        abilities: Object
    },
    weaponData: Array<IWeaponBaseData>,
    armorData: Array<IBaseArmorData>,
    shieldData: Array<IBaseShieldData>,
    sources: Array<ISourceData>,
    consumableData: Array<IConsumableTemplate>
    fatelineData: Array<IFatelineFullData>,
    conditionCards: Array<IConditionCard>,
    downtimeActivitiesData: Array<IDowntimeActivity>
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
                path: {},
                weaponData: [],
                armorData: [],
                shieldData: [],
                sources: [],
                consumableData: []
            }
        })
    }


}

export default PreloadedConnection;