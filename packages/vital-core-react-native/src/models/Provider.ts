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
    Ultrahuman = "ultrahuman",
    Garmin = "garmin",
    Fitbit = "fitbit",
    Libre = "freestyle_libre",
    AbbottLibreView = "abbott_libreview",
    Whoop = "whoop",
    Strava = "strava",
    Renpho = "renpho",
    Peloton = "peloton",
    Wahoo = "wahoo",
    Zwift = "zwift",
    EightSleep = "eight_sleep",
    Withings = "withings",
    GoogleFit = "google_fit",
    GoogleHealth = "google_health",
    Hammerhead = "hammerhead",
    Dexcom = "dexcom",
    DexcomV3 = "dexcom_v3",
    Polar = "polar",
    Cronometer = "cronometer",
    Kardia = "kardia",
    Omron = "omron",
    WhoopV2 = "whoop_v2",
    MyFitnessPal = "my_fitness_pal",
    Beurer = "beurer_api",
    TandemSource = "tandem_source",
    MyFitnessPalV2 = "my_fitness_pal_v2",
    MapMyFitness = "map_my_fitness",
    Runkeeper = "runkeeper",
}

export interface Provider {
    name: string
    slug: ProviderSlug | ManualProviderSlug | string
    logo?: string
}

export type UserConnectionStatus = "connected" | "paused" | "error";

export interface UserConnection extends Provider {
    name: string
    slug: ProviderSlug | ManualProviderSlug | string
    logo?: string
    status: UserConnectionStatus;
    resourceAvailability?: Record<string, ResourceAvailability>;
}

export interface ResourceAvailability {
    status: "available" | "unavailable";
    scopeRequirements?: ScopeRequirements;
}

export interface ScopeRequirementsGrants {
    userGranted: ScopeRequirements;
    userDenied: ScopeRequirements;
}

export interface ScopeRequirements {
    required: string[];
    optional: string[];
}
