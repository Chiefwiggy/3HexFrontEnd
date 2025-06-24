import {IPrerequisite} from "../Data/GenericData";
import {capitalize} from "@mui/material";
import {convertFromSnakeCase} from "./NameCodifier";

const GetPrerequisitePriority = (prerequisite: IPrerequisite) => {
    switch (prerequisite.prerequisiteType) {
        case "level":
            return 0
        case "attribute":
            return 20;
        case "affinity":
            return 40;
        case "class":
            return 10;
        case "fateline":
            return 5;
        case "path":
            return 30;
        default:
            return 99;
    }
}
export const GetPrerequisiteString = (prerequisites: Array<IPrerequisite>) => {
    const str = prerequisites.sort((a, b) => {
        if (a.prerequisiteType == b.prerequisiteType) {
            if (a.level != b.level) {
                return b.level - a.level
            }
            return a.skill.localeCompare(b.skill);
        } else {
            return GetPrerequisitePriority(a) - GetPrerequisitePriority(b);
        }
    }).map(prereq => {
        if (prereq.prerequisiteType === "class") {
            return `${convertFromSnakeCase(prereq.skill, true)}${prereq.level > 1 ? "+" : ""}`
        } else if (prereq.prerequisiteType === "fateline") {
            return `${convertFromSnakeCase(prereq.skill, true)}${prereq.level == -1 ? " - Reversed" : " - Upright"}`
        } else if (prereq.prerequisiteType === "level") {
            return `Level ${prereq.level}`
        } else if (prereq.prerequisiteType === "development") {
            return null
        } else if (prereq.prerequisiteType === "race" || prereq.prerequisiteType === "race_role" || prereq.prerequisiteType === "subrace") {
            if (prereq.level == 1)
                return `Racial`
            else if (prereq.level == 2) {
                return `Racial Unlock`
            }
            else {
                return `Racial Mastery`
            }
        }
        return `${capitalize(prereq.skill)} ${prereq.level}`
    }).filter(e => e !== null).join(", ");
    return str;
}