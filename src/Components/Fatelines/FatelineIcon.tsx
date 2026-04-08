import React from 'react';
import {Box} from "@mui/material";
import {ReactComponent as DkFateFool} from '../../Assets/Fate Icons/TheFool.svg'
import {ReactComponent as DkFateLovers} from '../../Assets/Fate Icons/TheLovers.svg'
import {ReactComponent as DkFateStrength} from '../../Assets/Fate Icons/Strength.svg'
import {ReactComponent as DkFateDeath} from '../../Assets/Fate Icons/Death.svg'
import {ReactComponent as DkFateHighPriestess} from '../../Assets/Fate Icons/HighPriestess.svg'
import {ReactComponent as DkFateJudgement} from '../../Assets/Fate Icons/Judgement.svg'
import {ReactComponent as DkFateJustice} from '../../Assets/Fate Icons/Justice.svg'
import {ReactComponent as DkFateMagician} from '../../Assets/Fate Icons/Magician.svg'
import {ReactComponent as DkFateTemperance} from '../../Assets/Fate Icons/Temperance.svg'
import {ReactComponent as DkFateChariot} from '../../Assets/Fate Icons/TheChariot.svg'
import {ReactComponent as DkFateHangedMan} from '../../Assets/Fate Icons/TheHangedMan.svg'
import {ReactComponent as DkFateMoon} from '../../Assets/Fate Icons/TheMoon.svg'
import {ReactComponent as DkFateStar} from '../../Assets/Fate Icons/TheStar.svg'
import {ReactComponent as DkFateTower} from '../../Assets/Fate Icons/TheTower.svg'
import {ReactComponent as DkFateFortune} from '../../Assets/Fate Icons/Fortune.svg'
import {ReactComponent as DkFateHermit} from '../../Assets/Fate Icons/Hermit.svg'
import {ReactComponent as DkFateEmperor} from '../../Assets/Fate Icons/TheEmperor.svg'
import {ReactComponent as DkFateEmpress} from '../../Assets/Fate Icons/TheEmpress.svg'
import {ReactComponent as DkFateSun} from '../../Assets/Fate Icons/TheSun.svg'
import {ReactComponent as DkFateDevil} from '../../Assets/Fate Icons/Devil.svg'
import {ReactComponent as DkFateHierophant} from '../../Assets/Fate Icons/TheHierophant.svg'
import {ReactComponent as DkFateWorld} from '../../Assets/Fate Icons/TheWorld.svg'

interface FatelineIconStyle extends React.CSSProperties {
    '--glow-color'?: string;
}

interface IFatelineIconsInput {
    style: FatelineIconStyle,
    fatelineId: string
}

const FatelineIcon = ({style, fatelineId}: IFatelineIconsInput) => {
    switch (fatelineId) {
        case 'fool':
            return <DkFateFool style={style} />
        case 'lovers':
            return <DkFateLovers style={style} />
        case 'strength':
            return <DkFateStrength style={style} />
        case 'death':
            return <DkFateDeath style={style} />
        case 'high_priestess':
            return <DkFateHighPriestess style={style} />
        case 'judgement':
            return <DkFateJudgement style={style} />
        case 'justice':
            return <DkFateJustice style={style} />
        case 'magician':
            return <DkFateMagician style={style} />
        case 'temperance':
            return <DkFateTemperance style={style} />
        case 'chariot':
            return <DkFateChariot style={style} />
        case 'hanged_man':
            return <DkFateHangedMan style={style} />
        case 'moon':
            return <DkFateMoon style={style} />
        case 'star':
            return <DkFateStar style={style} />
        case 'tower':
            return <DkFateTower style={style} />
        case 'fortune':
            return <DkFateFortune style={style} />
        case 'hermit':
            return <DkFateHermit style={style} />
        case 'emperor':
            return <DkFateEmperor style={style} />
        case 'empress':
            return <DkFateEmpress style={style} />
        case 'devil':
            return <DkFateDevil style={style} />
        case 'sun':
            return <DkFateSun style={style} />
        case 'hierophant':
            return <DkFateHierophant style={style} />
        case 'world':
            return <DkFateWorld style={style} />
        default:
            return <></>
    }
}

export default FatelineIcon