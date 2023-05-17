export enum ManualProviderSlug {
    BeurerBLE = "beurer_ble",
    OmronBLE = "omron_ble",
    AccuchekBLE = "accuchek_ble",
    ContourBLE = "contour_ble",
    LibreBLE = "freestyle_libre_ble",
    Manual = "manual",
    AppleHealthKit = "apple_health_kit",
    HealthConnect = "health_connect",
}

export interface Provider {
    name: string
    slug: ManualProviderSlug | string
    logo?: string
}
