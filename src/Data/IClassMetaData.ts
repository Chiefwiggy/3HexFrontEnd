
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