import {IConditionTag} from "../Data/ICardData";
import {actionsContent} from "../Data/ActionData";


export class TextUtils {

    public static Actions = class {
        public static GetActionData() {
            return actionsContent;
        }
    }

    public static Conditions = class {

        public static GetPopulatedDescription = (conditionData: IConditionTag) => {
            const nCondData = conditionData.xVals.map(e => e);
            const output = conditionData.description[0].replace(/\[X(\d+)\]/g, (_: any, match: any) => {
                const index = parseInt(match, 10);
                const elem = conditionData.xVals[index];
                if (elem.basePower && elem.tierScaling) {
                    return `${elem.basePower} (+${elem.tierScaling} per Prestige)`
                }
                return elem.basePower.toString() || "";
            });
            return output;
        }

        public static GetCountdownDescription = (conditionData: IConditionTag) => {
            switch (conditionData.conditionCountdownType) {
                case "uses":
                    return "Uses: This condition decrements by 1 everytime you would use the affected attribute. The condition is removed at the end of the Scene."
                case "decay1":
                    return "Decay (1): At the start an affected creature's turn, the effect goes off, then its value is halved. The condition is then removed if the value of this condition is 1 or lower."
                case "decay10":
                    return "Decay (10): At the start an affected creature's turn, the effect goes off, then its value is halved. The condition is then removed if the value of this condition is 10 or lower."
                case "rounds":
                    return "Rounds: When all characters Refresh, decrement this condition by 1."
                case "onWounding":
                    return "On Wound: When you take or receive Health damage, decrement this condition by 1."
                case "perFight":
                    return "Encounter: Lasts for the remainder of the encounter."
                case "singleUse":
                    return "Single Use: Effect is removed upon use."
                case "untilSaved":
                    return "On Save: Effect lasts until you successfully save. Reattempt saves at the start of your turn."
                case "special":
                    return "Special: See condition's description"
                default:
                    return "Contact Collin, this is missing."
            }
        }
    }


}