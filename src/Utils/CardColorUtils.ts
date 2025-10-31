import {UArcanotype} from "../Data/ISourceData";


export const CardGetColor = (type: string) => {
        switch(type) {
            case 'weapon.base':
                return '#1D708C';
            case 'weapon.form':
                return '#3BBA20';
            case 'weapon.skill':
                return '#14f3e0';
            case 'weapon.order':
                return '#006CFF'
            case 'spell.base':
                return '#7A7AFF';
            case 'spell.base.temporary':
                return '#b5beff'
            case 'spell.target':
                return '#710EB0';
            case 'spell.summon':
                return '#c888f4';
            case 'spell.skill':
                return '#dc0e80';
            case 'spell.edict':
                return '#ff66cc';
            case "commander.commander":
                return '#600b0b'
            case "condition.buff":
                return '#ffffff';
            case "condition.debuff":
                return '#000000';
            case 'hack.function':
                return '#fbf38c';
            case 'hack.io':
                return '#633502';
            case 'hack.protocol':
                return '#ff6f0a';
            case 'hack.util':
                return '#ddce09';
            case 'hack.else':
                return '#ff0000';
        }
        return 'white'
    }


export const GetArcanotypeColor = (arcanotype: UArcanotype) => {
    switch (arcanotype) {
    case "elemental":
      return "rgba(255,160,0,0.56)"
    case "divine":
      return "rgba(255,232,38,0.56)"
    case "mystical":
      return "rgba(246,4,255,0.54)"
    case "axum":
      return "rgba(0,20,255,0.71)"
    case "primal":
      return "rgba(8,108,0,0.6)"
    case "eonic":
      return "rgba(0,255,247,0.8)"
    case "animus":
      return "rgba(91,0,255,0.71)"
    case "esoteric":
      return "rgba(178,255,89,0.68)"
  }
}

export const GetConsumableCraftingColor = (craftingType: string) => {
    switch (craftingType) {
        case "potion":
            return "rgba(187,119,255,0.56)"
        case "gem":
            return "rgba(15,182,255,0.8)"
        case "holy":
            return "rgba(237,221,78,0.56)"
        case "curse":
            return "rgba(142,14,14,0.56)"
        case "trap":
        case "compound":
            return "rgba(198,198,198,0.56)"
        case "medical":
            return "rgba(47,255,89,0.86)"
        case "totem":
            return "rgba(255,106,0,0.84)"
        default:
            return "rgba(51,51,51,0.55)"
    }
}

export const GetConsumableItemTypeColor = (itemType: string) => {
    switch (itemType) {
        case "healing":
            return "rgba(104,253,62,0.55)"
        case "damage":
            return "rgba(165,38,49,0.55)"
        case "debuff":
            return "rgba(181,79,15,0.55)"
        case "poison":
            return "rgba(31,117,11,0.55)"
        case "buff":
            return "rgba(36,240,246,0.55)"
        case "support":
            return "rgba(66,170,255,0.55)"
        default:
            return "rgba(216,216,216,0.55)"
    }
}