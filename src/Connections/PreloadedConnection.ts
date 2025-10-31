import Axios, {AxiosRequestConfig} from "axios";
import {IBaseArmorData, IBaseShieldData} from "../Data/IArmorData";
import {ICommonCardData, IConditionCard, IConditionTag, IWeaponBaseData} from "../Data/ICardData";
import {ISourceData} from "../Data/ISourceData";
import {IConsumableTemplate} from "../Data/IConsumable";
import {IFatelineFullData} from "../Data/IFatelineData";
import {IDowntimeActivity} from "../Data/IDowntime";
import {IMountBaseModel} from "../Data/IMountData";
import {IMinionBaseData_New, IMinionRoleData} from "../Data/IMinionData_New";
import {IRaceMetadata} from "../Hooks/usePreloadedContent/PLC_RaceData";
import {IAbility} from "../Data/IAbilities";
import {IDatachipData, IPackageData} from "../Data/ChipsetData";

export interface ICacheTimestamp {
    entry_name: string,
    last_updated: number
}

export interface ICacheData {
    db_cache_timestamps: Array<ICacheTimestamp>,
    frontend_timestamp?: ICacheTimestamp,
    backend_timestamp?: ICacheTimestamp,
    always_pull: boolean,
    is_master: boolean
}
export interface IPreloadedDataStruct {
    updatedCache: ICacheData,
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
    downtimeActivitiesData: Array<IDowntimeActivity>,
    mountData: Array<IMountBaseModel>,
    conditionTags: Array<IConditionTag>,
    minionRoles: Array<IMinionRoleData>,
    allMinions: Array<IMinionBaseData_New>,
    raceData: {
        raceCards: Record<string, Array<ICommonCardData>>,
        subraceCards: Record<string, Array<ICommonCardData>>,
        raceRoleCards: Record<string, Array<ICommonCardData>>,
        raceAbilities: Record<string, Array<IAbility>>,
        subraceAbilities: Record<string, Array<IAbility>>,
        raceRoleAbilities: Record<string, Array<IAbility>>,
        raceMetadata: Array<IRaceMetadata>
    },
    development: {
        abilities: Record<string, Array<IAbility>>,
        cards: Record<string, Array<ICommonCardData>>
    },
    datachips: Array<IDatachipData>,
    packages: Array<IPackageData>
}
class PreloadedConnection {
    private _preloadedURL: string;
    private _cacheURL: string
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._preloadedURL = url + "preload/";
        this._cacheURL = url + "cache/"
        this._getConfig = getConfig;
    }

    public async GetMasterCache(): Promise<ICacheData> {
        return await Axios.get(`${this._cacheURL}master`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e);
            return {
                db_cache_timestamps: [],
                is_master: false,
                always_pull: true
            }
        })
    }

    public async GetPreloadedData(myCache: ICacheData | Object ): Promise<IPreloadedDataStruct> {
        return await Axios.post(`${this._preloadedURL}getAllPreloadedContent`, {"user_cache_data": myCache}, this._getConfig()).then((resp) => {
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