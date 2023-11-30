const { withEntitlementsPlist, withInfoPlist } = require('@expo/config-plugins')

const HEALTH_SHARE = 'Allow $(PRODUCT_NAME) to check health info'

const withHealthKit = (
  config,
  { healthSharePermission } = {},
) => {
  // Add permissions
  config = withInfoPlist(config, (config) => {
    config.modResults.NSHealthShareUsageDescription =
      healthSharePermission ||
      config.modResults.NSHealthShareUsageDescription ||
      HEALTH_SHARE

    return config
  })

  // Add entitlements. These are automatically synced when using EAS build for production apps.
  config = withEntitlementsPlist(config, (config) => {
    config.modResults['com.apple.developer.healthkit'] = true
    if (
      !Array.isArray(config.modResults['com.apple.developer.healthkit.access'])
    ) {
      config.modResults['com.apple.developer.healthkit.access'] = []
    }

    return config
  })

  return config
}
module.exports = withHealthKit