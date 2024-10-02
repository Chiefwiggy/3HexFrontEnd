import {IDowntimeActivity, IDowntimeFullScaledData} from "../../Data/IDowntime";
import CharacterSheet from "../../Data/CharacterSheet";
import {ScaleChainNonNumeric, ScaleChainNumeric} from "../../Utils/ConstructFinalWeapon";


class PLC_DowntimeData {
    private downtimeData: Array<IDowntimeActivity>;

    constructor() {
        this.downtimeData = [];
    }

    public async Initialize(consumableData: Array<IDowntimeActivity>) {
        this.downtimeData = consumableData;
    }

    public GetDowntimeData = () => {
        return this.downtimeData;
    }

    public GetDowntimesPlayerLacks(currentSheet: CharacterSheet) {
        return this.downtimeData.filter(dd => {
            return !(currentSheet.data.downtimeData.map(e => e.activityId).includes(dd.activityId))
        })
    }

    public GetDowntimeDataForPlayer(currentSheet: CharacterSheet): Array<IDowntimeFullScaledData> {
        return currentSheet.data.downtimeData.map(dt => {
            const staticDT = this.downtimeData.find(dd => dd.activityId == dt.activityId);
            if (staticDT) {

                const xVals = staticDT.xVals.map(xval => ScaleChainNumeric(xval, dt.proficiency))

                const input = ScaleChainNonNumeric(staticDT.description, dt.proficiency)
                const output = input.replace(/\[X(\d+)\]/g, (_: any, match: any) => {
                  const index = parseInt(match, 10) - 1;
                  return xVals[index]?.toString() || "";
                });

                return {
                    activityName: staticDT.activityName,
                    activityId: dt.activityId,
                    description: output,
                    timeSlots: ScaleChainNumeric(staticDT.timeSlots, dt.proficiency),
                    currentProgress: dt.currentProgress,
                    proficiency: dt.proficiency,
                    _id: staticDT._id
                } as IDowntimeFullScaledData
            }
            return null
        }).filter(dt => dt) as Array<IDowntimeFullScaledData>
    }




}

export default PLC_DowntimeData;