import {IPrerequisite} from "../Data/GenericData";
import {capitalize} from "@mui/material";
import {convertFromSnakeCase} from "./NameCodifier";

const GetPrerequisitePriority = (prerequisite: IPrerequisite) => {
    switch (prerequisite.prerequisiteType) {
        case "attribute":
            return 2;
        case "affinity":
            return 4;
        case "class":
            return 1;
        case "fateline":
            return 0;
        case "path":
            return 3;
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
        }
        return `${capitalize(prereq.skill)} ${prereq.level}`
    }).join(", ");
    return str;
}