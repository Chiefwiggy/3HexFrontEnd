import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";


class PLC_OtherSpecializationData {
    private otherCards: Record<string, Array<ICommonCardData>>
    private otherAbilities: Record<string, Array<IAbility>>

    constructor() {
        this.otherCards = {}
        this.otherAbilities = {}
    }

    public async Initialize(otherCards: Record<string, Array<ICommonCardData>>, otherAbilities: Record<string, Array<IAbility>>) {
        this.otherCards = otherCards;
        this.otherAbilities = otherAbilities
        console.log(otherCards, otherAbilities)
    }

    public GetFeaturesForCategory(category: string) {
        return [
            ...(this.otherCards?.[category] ?? []),
            ...(this.otherAbilities?.[category] ?? [])
        ];
    }

    public GetFeaturesForCategorySplitBySubcategory(
        category: string
    ): Record<string, Record<number, Array<ICommonCardData | IAbility>>> {

        return this.GetFeaturesForCategory(category).reduce((acc, feature) => {
            feature.prerequisites
                ?.filter(p => p.prerequisiteType === "misc_category")
                .forEach(p => {
                    if (p.level == null) return; // guard if needed

                    const skillKey = p.skill;
                    const levelKey = `rank${p.level}`

                    acc[skillKey] ??= {};
                    acc[skillKey][levelKey] ??= [];

                    acc[skillKey][levelKey].push(feature);
                });

            return acc;
        }, {} as Record<string, Record<string, Array<ICommonCardData | IAbility>>>);
    }


}

export default PLC_OtherSpecializationData