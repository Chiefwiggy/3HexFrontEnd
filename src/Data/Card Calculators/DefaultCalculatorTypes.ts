import {ICardBuilderType} from "../../Layouts/CardBuilder";
import WeaponBaseCard from "../../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../../Components/Cards/WeaponModCard";
import ConditionCard from "../../Components/Cards/ConditionCard";
import SpellBaseCard from "../../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../../Components/Cards/SpellModifierCard";

export const DEFAULT_WEAPON_CALC_TYPES: Array<ICardBuilderType> = [
    {
        name: "weapon.base",
        display: "base",
        component: WeaponBaseCard,
        required: true,
        counterRequired: true,
        counterInvalid: false,
        count: 1
    },
    {
        name: "weapon.form",
        display: "form",
        component: WeaponModCard,
        required: true,
        counterRequired: true,
        counterInvalid: false,
        count: 1
    },

    {
        name: "weapon.skill",
        display: "skill",
        component: WeaponModCard,
        required: false,
        counterRequired: false,
        counterInvalid: true,
        count: 1
    },
    {
        name: "condition.buff",
        display: "buff",
        component: ConditionCard,
        required: false,
        counterRequired: false,
        counterInvalid: true,
        count: 1
    },
    {
        name: "condition.debuff",
        display: "debuff",
        component: ConditionCard,
        required: false,
        counterRequired: false,
        counterInvalid: true,
        count: 1
    }
]

export const DEFAULT_SPELL_CALC_TYPES: Array<ICardBuilderType> = [
    {
        name: "spell.base",
        display: "base",
        component: SpellBaseCard,
        required: true,
        count: 1
    },
    {
        name: "spell.target",
        display: "target",
        component: SpellTargetCard,
        required: true,
        count: 1
    },
    {
        name: "spell.skill",
        display: "skill",
        component: SpellModifierCard,
        required: true,
        count: 1
    },
    {
        name: "spell.edict",
        display: "edict",
        component: SpellModifierCard,
        required: false,
        count: 1
    },
    {
        name: "condition.buff",
        display: "buff",
        component: ConditionCard,
        required: false,
        counterRequired: false,
        counterInvalid: true,
        count: 1
    },
    {
        name: "condition.debuff",
        display: "debuff",
        component: ConditionCard,
        required: false,
        counterRequired: false,
        counterInvalid: true,
        count: 1
    }
]

export const MINION_SPELL_CALC_TYPES: Array<ICardBuilderType> = [
    {
        name: "spell.base",
        display: "base",
        component: SpellBaseCard,
        required: true,
        count: 1
    },
    {
        name: "spell.target",
        display: "target",
        component: SpellTargetCard,
        required: true,
        count: 1
    },
    {
        name: "spell.skill",
        display: "skill",
        component: SpellModifierCard,
        required: true,
        count: 1
    }
]