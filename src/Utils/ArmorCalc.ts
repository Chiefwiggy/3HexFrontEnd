import CharacterSheet from "../Data/CharacterSheet";
import {IArmor, UArmorClass} from "../Data/IArmorData";

export const getMaxArmorEnchant = (currentSheet: CharacterSheet, armorClass: UArmorClass ) => {
    console.log("gab" + currentSheet.getAbilityBonuses("armorAffinityRequirement"));
    switch (armorClass) {
        case "light":
            return currentSheet.currentAffinities.nimble + currentSheet.getAbilityBonuses("armorAffinityRequirement");
        case "standard":
            return currentSheet.currentAffinities.infantry + currentSheet.getAbilityBonuses("armorAffinityRequirement");
        case "heavy":
            return currentSheet.currentAffinities.guardian + currentSheet.getAbilityBonuses("armorAffinityRequirement");
    }
}