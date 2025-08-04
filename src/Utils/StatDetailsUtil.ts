import {UStat} from "./Shorthand";


export const getStatDescription = (stat: UStat) => {
    switch(stat) {
        case "might":
            return [
                "Might is the stat that determines the Power of all things you do, healing, damage, etc.",
                "Weapon/Spell Power += Potency"
            ]
        case "agility":
            return [
                "Agility is the stat which governs how quickly you can get out of the way of incoming attacks.",
                "Dodge += [0 : 1 * Armor Modifier]"
            ]
        case "skill":
            return [
                "Skill is the stat that affects how well you use weaponry and shields, how hard your critical damage hits, your proficiency with physical consumables, and slightly affects your overall accuracy, skills, and Downtime Ranks.",
                "Physical Weapon & Shield Requirements",
                "Crit Damage += 1",
                "To Hit += 0 : 1",
                "+2 Downtime Rank Pts",
                "+3 Skill Points"
            ]
        case "awareness":
            return [
                "Awareness is the stat that affects your overall accuracy with weapons and slightly affects your evasion.",
                "To Hit += 0 : 2",
                "Dodge += 0 : 1"
            ]
        case "vitality":
            return [
                "Vitality is the stat that affects your ability to manuever while wearing armor and your Health, and slightly affects your physical defense.",
                "Armor Requirements",
                "Health += 2",
                "pDEF += 0.5"
            ]
        case "knowledge":
            return [
                "Knowledge is the stat that affects your card slots, your Downtime Activity Ranks, your Skills, and slightly affects all of your saves.",
                "Every 2 Knowledge = 1 Card Slot",
                "+0 : 1 to all Saves",
                "+3 Downtime Rank Pts",
                "+5 Skill Points"
            ]
        case "mind":
            return [
                "Mind is the stat which primarily affects your access to greater reserves of magic, both Tether and Orders, and slightly affects your mDEF.",
                "Tether += 5",
                "Tether Refresh += [1 * Armor Modifier]",
                "Every 5 Mind = 1 Order Charge",
                "mDEF += 0.5"
            ]
        case "presence":
            return [
                "Presence is the stat which affects how difficult it is to avoid your magic, how skilled you are with magical weapons and shields, and your proficiency with magical consumables, and slightly affects your mDEF.",
                "Magical Weapon & Shield Requirements",
                "Spell Set Save += 0 : 3",
                "mDEF += 0.5"
            ]
        case "authority":
            return [
                "Authority is the stat which affects the Power of the minions and armies that you lead, sets the Saves for minions under your control, and determines the amount of Commander Cards you can use.",
                "Commander Card Slots at Authority [0, 2, 4, 6, 8], [11, 14, 17, 20], [24, 28, 32, 36, 40], [45, 50, 55, 60, 65, 70, 75]",
                "Minion and Army Power",
                "Minion Saves"
            ]
        case "endurance":
            return [
                "Endurance is the stat which affects your Stamina, Stamina Refresh, and slightly affects your pDEF.",
                "Stamina Refresh += [1 * Armor Modifier]",
                "pDEF += 0.5"
            ]
    }
}