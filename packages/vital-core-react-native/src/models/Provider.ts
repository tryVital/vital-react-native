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

export enum ProviderSlug {
    BeurerBLE = "beurer_ble",
    OmronBLE = "omron_ble",
    AccuchekBLE = "accuchek_ble",
    ContourBLE = "contour_ble",
    LibreBLE = "freestyle_libre_ble",
    Manual = "manual",
    AppleHealthKit = "apple_health_kit",
    HealthConnect = "health_connect",
    
    iHealth = "ihealth",
    Oura = "oura",
    Garmin = "garmin",
    Fitbit = "fitbit",
    Libre = "freestyle_libre",
    Whoop = "whoop",
    Strava = "strava",
    Renpho = "renpho",
    Peloton = "peloton",
    Wahoo = "wahoo",
    Zwift = "zwift",
    EightSleep = "eight_sleep",
    Withings = "withings",
    GoogleFit = "google_fit",
    Hammerhead = "hammerhead",
    Dexcom = "dexcom",
    MyFitnessPal = "my_fitness_pal",
}

export interface Provider {
    name: string
    slug: ProviderSlug | ManualProviderSlug | string
    logo?: string
}
