import {
    IAttributeBar,
    IAttributeBars,
    ICalculatedSpell,
    ICalculatedWeapon,
    ICharacterBaseData, ICharacterStats
} from "../Data/ICharacterData";
import Axios, { AxiosRequestConfig } from 'axios'

class CharacterConnection {

    private _charURL: string
    private _getConfig: () => AxiosRequestConfig

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._charURL = url + "characters/";
        this._getConfig = getConfig;
    }

    private GetRouteURL(route: string): string {
        return this._charURL + route;
    }

    public async GetMyCharacters(): Promise<Array<ICharacterBaseData>> {
        return await Axios.get(this.GetRouteURL("getMine"), this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e);
            return [];
        })
    }

    public async GetCharacter(charID: string): Promise<ICharacterBaseData> {
        return await Axios.get(this.GetRouteURL(`get/${charID}`), this._getConfig()).then((resp) => {
            console.log(resp.data);
            return resp.data;
        }).catch((e) => {
            console.error(e);
            return [];
        })
    }

    public async SetPreparedSpells(charID: string, ids: string[]) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            preparedCards: ids
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async SetPreparedCommanderCards(charID: string, ids: string[]) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            preparedCommanderCards: ids
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async AddPrepSpell(charID: string, spellData: ICalculatedSpell) {
        await Axios.post(this.GetRouteURL(`prep/${charID}/spell/add`), spellData, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async SetPrepSpell(charID: string, spellData: ICalculatedSpell) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            currentSpell: spellData
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async SetPrepWeapon(charID: string, weaponData: ICalculatedWeapon) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            currentWeapon: weaponData
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async AddPrepWeapon(charID: string, spellData: ICalculatedWeapon) {
        await Axios.post(this.GetRouteURL(`prep/${charID}/weapon/add`), spellData, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async SetBars(charID: string, healthData: IAttributeBars) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            attributeBars: healthData
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async SaveStats(charID: string, newStats: ICharacterStats) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            characterStats: newStats
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async UpdateCharacter(charID: string, newData: ICharacterBaseData) {
        await Axios.put(this.GetRouteURL(`update/${charID}`), {
            characterStats: newData.characterStats,
            skillPoints: newData.skillPoints,
            classes: newData.classes,
            characterLevel: newData.characterLevel,
            preparedCards: newData.preparedCards,
            currentSpell: newData.currentSpell,
            currentWeapon: newData.currentWeapon
        }, this._getConfig()).then((resp) => {
            console.log(resp);
        })
    }

    public async CreateCharacter(name: string) {
        return await Axios.post(this.GetRouteURL(`add`), {
          "characterName": name,
          "characterLevel": 1,
          "classes": [],
          "attributeBars": {
            "health": {
              "current": 0,
              "scaling": {
                "value": 2
              }
            },
            "stamina": {
              "current": 0,
              "scaling": {
                "value": 3
              }
            },
            "tether": {
              "current": 0,
              "scaling": {
                "value": 2
              }
            }
          },
          "characterStats": {
            "might": {
              "value": 1
            },
            "agility": {
              "value": 1
            },
            "skill": {
              "value": 1
            },
            "awareness": {
              "value": 1
            },
            "vitality": {
              "value": 1
            },
            "knowledge": {
              "value": 1
            },
            "mind": {
              "value": 1
            },
            "presence": {
              "value": 1
            },
            "authority": {
              "value": 1
            },
            "endurance": {
              "value": 1
            }
          },
          "movement": {
            "stepSpeed": {
              "value": 1
            },
            "dashSpeed": {
              "value": 4
            }
          },
          "preparedCards": [],
          "skillPoints": {}
        }, this._getConfig()).then((resp) => {
            console.log(resp);
            return resp;
        })
    }


}

export default CharacterConnection;