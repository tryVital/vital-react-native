import type { HealthKitDataType } from "./healthkit";

export interface AskConfigiOS {
    type: "ios";

    /**
     * Extra HealthKit object types whose read permissions should be requested in addition to the needs of Junction Mobile SDK.
     */
    extraReadPermissions?: HealthKitDataType[];
    /**
     * Extra HealthKit sample types whose write permissions should be requested in addition to the needs of Junction Mobile SDK.
     */
    extraWritePermissions?: HealthKitDataType[];
    /**
     * If not undefined, only the specified data types would be requested. This applies to both SDK originated requests as well
     * as extra permissions you specified above.
     */
    dataTypeAllowlist?: HealthKitDataType[];
}

export interface AskConfigAndroid {
    type: "android";
}

export type AskConfig = AskConfigiOS | AskConfigAndroid;
