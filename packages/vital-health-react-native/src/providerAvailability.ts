export enum ProviderAvailability {
  /**
   * Apple HealthKit, Health Connect, or Samsung Health.
   *
   * There is an active Apple HealthKit, Samsung Health, or Health Connect installation
   * on this device.
   */
  Installed = 'installed',

  /**
   * Health Connect or Samsung Health.
   *
   * No Samsung Health or Health Connect installation has been detected on this device.
   */
  NotInstalled = 'notInstalled',

  /**
   * Health Connect or Samsung Health.
   *
   * The SDK being used is incompatible with the Samsung Health or Health Connect installation.
   */
  NotSupportedSDK = 'notSupportedSDK',

  /**
   * Samsung Health only.
   *
   * Samsung Health has been installed, but the onboarding experience is incomplete.
   * So all the SDK methods are blocked.
   */
  OnboardingIncomplete = 'onboardingIncomplete',

  /**
   * Samsung Health only.
   *
   * Samsung Health has been installed. But your App Package ID has not yet been allowlisted
   * by Samsung. Contact Samsumg Developer Support.
   *
   * If you are testing on your device, you can enable Samsung Health developer mode.
   * See https://developer.samsung.com/health/data/guide/developer-mode.html for the instructions.
   */
  AppNotAllowed = 'appNotAllowed',

  /**
   * Samsung Health only.
   *
   * Samsung Health has been installed, but we fail to estsblish a functional service connection
   * to Samsung Health. This edge case can happen when Samsung Health is installed while your app
   * is active. The only solution today as of June 10, 2026 appears to be closing and restarting
   * your app.
   */
  ServiceUnavailable = 'serviceUnavailable',
}
