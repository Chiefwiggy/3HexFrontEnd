
export interface IClassChoiceData {
    choices: Array<IClassChoiceType>,
    amount: number
}

export interface IClassChoiceType {
    choiceType: string,
    choiceName: string,
    choiceAmount: number
}

export interface IClassMetaData {
  choices: {
      baseChoice: IClassChoiceData,
      prestigeChoice: IClassChoiceData,
  }
  _id: string
  className: string
  description: string
  classExpertises: string[]
  downtimeActivities: string[]
  classTier: number
  prerequisites: any[]
  __v: number
}

export interface IClassServerOutput {
    tier1: Array<IClassMetaData>,
    tier2: Array<IClassMetaData>,
    tier3: Array<IClassMetaData>,
    tier4: Array<IClassMetaData>,
    tier5: Array<IClassMetaData>,
    tier6: Array<IClassMetaData>
}