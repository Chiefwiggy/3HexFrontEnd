

export const CardGetColor = (type: string) => {
        switch(type) {
            case 'weapon.base':
                return '#1D708C';
            case 'weapon.form':
                return '#3BBA20';
            case 'weapon.skill':
                return '#BBD826';
            case 'spell.base':
                return '#1C2EB5';
            case 'spell.target':
                return '#710EB0';
            case 'spell.skill':
                return '#f13060';
            case 'spell.edict':
                return '#FF8305';
            case "commander.commander":
                return '#600b0b'
            case "condition.buff":
                return '#ffffff';
            case "condition.debuff":
                return '#000000';
        }
        return 'white'
    }