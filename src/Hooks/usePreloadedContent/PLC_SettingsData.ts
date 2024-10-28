import {IDiceColor} from "../../Data/Dice Colors/IDiceColor";
import DieColorData from "../../Data/Dice Colors/DiceColorData";


class PLC_SettingsData {
    private allDiceColors: Array<IDiceColor>

    constructor() {
        this.allDiceColors = DieColorData
    }

    public GetDieSettingsById(dieColorId: string) {
        const retVal = this.allDiceColors.find(dc => dc.id == dieColorId);
        if (retVal) {
            return retVal
        } else {
            return this.allDiceColors[0]
        }
    }

    public GetAllDieColors() {
        return this.allDiceColors
    }




}

export default PLC_SettingsData;