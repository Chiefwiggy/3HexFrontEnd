import CharacterSheet from "../Data/CharacterSheet";
import {IArmor, UArmorClass} from "../Data/IArmorData";

export const getMaxArmorEnchant = (currentSheet: CharacterSheet, armorClass: UArmorClass ) => {
    if (armorClass == "heavy" && currentSheet.currentAffinities.guardian == 0) {
        return 0;
    }
    return currentSheet.currentPath.warrior + currentSheet.getAbilityBonuses("armorAffinityRequirement");
}