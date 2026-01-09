import {
    IChannelData,
    IEffectData, IHackBaseCardData, IHackIOCardData, IHackModifierCardData, IHackProtocolCardData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData, UDamageSubtype, UDamageType
} from "../ICardData";
import AbstractCardCalculator, {INumericIconData} from "./AbstractCardCalculator";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {
    AccessTime, AccessTimeOutlined,
    AutoFixOffOutlined,
    ElectricBoltOutlined,
    SaveAltOutlined,
    TimelineOutlined,
    WaterDropOutlined
} from "@mui/icons-material";
import {GetFinalHackData, GetFinalSpellData, GetFinalWeaponData} from "../../Utils/GetFinalSpellData";
import {ICharacterBaseData} from "../ICharacterData";
import {getAccessShorthand, getSkillFormat, getStatShorthand, UStat} from "../../Utils/Shorthand";
import {capitalize} from "@mui/material";
import CharacterSheet from "../CharacterSheet";
import MinionSheet from "../MinionSheet";
import {string} from "yup";
import AbstractSheet from "../AbstractSheet";
import {GrTechnology} from "react-icons/gr";
import React from "react";
import {GiLaserBurst, GiTechnoHeart} from "react-icons/gi";
import {MdAccessTime, MdAutoFixOff, MdSaveAlt} from "react-icons/md";
import {SiPrivateinternetaccess} from "react-icons/si";

class HackCardCalculator extends AbstractCardCalculator {

    private missingChannels: IChannelData[] = [];

    constructor(cardTypes: Array<ICardBuilderType>) {
        super(cardTypes, new Map<string, INumericIconData>([
          [
              "technikCost",
              {
                val: "0",
                icon: GrTechnology
              }
          ],
            [
                "surgeCost",
                {
                    val: "0",
                    icon: GiLaserBurst,
                    color: "#0096ff"
                }
            ],
            [
                "hackSet",
                {
                    val: "0 : 0",
                    icon: GiTechnoHeart
                }
            ],
            [
                "duration",
                {
                    val: "Instant",
                    icon: MdAccessTime
                }
            ],
            [
                "accessLevel",
                {
                    val: "N/A",
                    icon: SiPrivateinternetaccess
                }
            ]
        ]));

    }
    protected invokeRecalculateData(char: AbstractSheet): void {
        if (this.cards.length > 0) {
            const finalHackData = GetFinalHackData(
                this.getCardOfType("hack.function") as IHackBaseCardData,
                this.getCardOfType("hack.io") as IHackIOCardData,
                this.getCardOfType("hack.protocol") as IHackProtocolCardData,
                this.cards.filter(e => (e?.cardSubtype == "else" || e?.cardSubtype == "util")) as IHackModifierCardData[],
                char
            )
            this.missingChannels = finalHackData.missingChannels;
            if (finalHackData.moneyCost > 0) {
                this.updateVal("technikCost", `$${finalHackData.moneyCost*finalHackData.technikCost}`)
            } else {
                this.updateVal("technikCost", finalHackData.technikCost.toString());
            }
            this.currentPower = finalHackData.totalPower;
            this.currentRange = finalHackData.range;
            if (this.getCardOfType("hack.protocol")) {
                const saveType = (getStatShorthand(((this.getCardOfType("hack.protocol") as ISpellBaseCardData).saveType) as UStat | "none" | "luck")).toUpperCase()
                const spellSet = getSkillFormat(finalHackData.hackSet, false)
                this.updateVal("hackSet", saveType + " " + spellSet);
            }

            if (finalHackData.duration > 0) {
                this.updateVal("duration", `${finalHackData.duration.toString()} Round${finalHackData.duration == 1 ? "" : "s"}`);
            }
            this.updateVal("surgeCost", finalHackData.surge.toString());

            this.updateVal("accessLevel", getAccessShorthand(finalHackData.accessLevel));
        }


    }
    protected sortEffects(a: IEffectData, b: IEffectData): number {
        return 0;
    }

    public isValid() {
        return !!(this.getCardOfType("hack.function") && this.getCardOfType("hack.protocol") && this.getCardOfType("hack.io"))
    }

    public hasCorrectChannels() {
        return this.missingChannels.length === 0;
    }

    public getBadChannels() {
        return this.missingChannels;
    }

    public getSummonData() {
        const summonData = (this.getCardOfType("hack.protocol") as IHackProtocolCardData).summonData;
        if (summonData) {
            return {
                pDEF: summonData.pDEF,
                mDEF: summonData.mDEF,
                movement: summonData.movement,
                maxHealth: summonData.maxHealth,
                simpleName: summonData.simpleName,
                dodge: summonData.dodge
            }
        } else {
            return {
                pDEF: 0,
                mDEF: 0,
                movement: 0,
                maxHealth: 0,
                simpleName: "ERR",
                dodge: 0,
            }
        }

    }

    private sanitizeName = (name?: string, keepFirstWord = false) => {
      if (!name) return undefined;
      const upper = name.toUpperCase();
      if (keepFirstWord) {
        return upper.split(/\s+/)[0]; // only first word
      }
      return upper.replace(/[ \/]+/g, "_"); // replace spaces and slashes with _
    };

    getTitle(): string {

        const UTIL_NAME = this.sanitizeName(this.getCardOfType("hack.util")?.cardName);
        const PROTOCOL_NAME = this.sanitizeName(this.getCardOfType("hack.protocol")?.cardName);
        const IO_NAME = this.sanitizeName(this.getCardOfType("hack.io")?.cardName, true);
        const FN_NAME = this.sanitizeName(this.getCardOfType("hack.function")?.cardName);


        let finalName = `${IO_NAME}_${PROTOCOL_NAME}`
        if (UTIL_NAME) {
            finalName += `_${UTIL_NAME}`
        }
        finalName += `_${FN_NAME}`
        return finalName;


    }


    getType(): string {
        return "HACK"
    }

    getCrit() {
        return null;
    }

    getFinalTopColor() {
        return '#0fef1f';
    }

    public getDamageType(): UDamageType {
        return (((this.getCardOfType("hack.function") as ISpellBaseCardData)?.damageType) as UDamageType) ?? "magical"
    }

    public getDamageSubtype(): UDamageSubtype {
        return (this.getCardOfType("hack.function") as ISpellBaseCardData)?.damageSubtype ?? "none"
    }
}

export default HackCardCalculator