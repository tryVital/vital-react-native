export default interface QuantitySample {
    id: string | null,
    value: number,
    startDate: Date,
    endDate: Date,
    sourceBundle: string | null,
    productType: string | null,
    type: string | null,
    unit: string
}
