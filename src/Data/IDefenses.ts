

export interface IDefenseBreakdown {
    totalValue: number | string,
    sources: Array<{
        reason: string,
        value: number | string
    }> | []
}