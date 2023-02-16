import type QuantitySample from "./QuantitySample"

export default interface BloodPressureSample {
    systolic: QuantitySample,
    diastolic: QuantitySample,
    pulse: QuantitySample | null
}
