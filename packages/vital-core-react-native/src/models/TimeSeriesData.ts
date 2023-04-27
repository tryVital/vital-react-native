import type QuantitySample from "./QuantitySample";
import type BloodPressureSample from "./BloodPressureSample";

export interface TimeSeriesDataBloodPressure {
    type: "blood_pressure";
    samples: BloodPressureSample[];
}

export interface TimeSeriesDataGlucose {
    type: "glucose";
    samples: QuantitySample[];
}

export type TimeSeriesData = TimeSeriesDataBloodPressure
    | TimeSeriesDataGlucose;
