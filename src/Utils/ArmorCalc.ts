import CharacterSheet from "../Data/CharacterSheet";
import {IArmor, UArmorClass} from "../Data/IArmorData";

export const getMaxArmorEnchant = (currentSheet: CharacterSheet, armorClass: UArmorClass ) => {
    console.log(currentSheet.currentAffinities);
    switch (armorClass) {
        case "light":
            return currentSheet.currentAffinities.deft;
        case "standard":
            return currentSheet.currentAffinities.infantry
        case "heavy":
            return currentSheet.currentAffinities.guardian;
    }
}