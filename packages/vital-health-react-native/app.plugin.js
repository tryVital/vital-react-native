const {
  withEntitlementsPlist,
  withInfoPlist,
  withAndroidManifest,
  withAppDelegate,
} = require('@expo/config-plugins');
const { withPlugins } = require('@expo/config-plugins');
const { addObjcImports, insertContentsInsideObjcFunctionBlock } = require('@expo/config-plugins/build/ios/codeMod');

const HEALTH_SHARE = 'Allow $(PRODUCT_NAME) to check health info';

const withHealthKit = (config, { healthSharePermission } = {}) => {

  config = withInfoPlist(config, (config) => {

    config.modResults.NSHealthShareUsageDescription =
      healthSharePermission ||
      config.modResults.NSHealthShareUsageDescription ||
      HEALTH_SHARE;

    const declaredModes = config.modResults.UIBackgroundModes ?? [];

    if (!declaredModes.includes('processing')) {
      config.modResults.UIBackgroundModes = [...declaredModes, 'processing'];
    }

    const vitalBgTask = 'io.tryvital.VitalHealthKit.ProcessingTask';
    const bgIdentifiers = config.modResults.BGTaskSchedulerPermittedIdentifiers ?? [];

    if (!bgIdentifiers.includes(vitalBgTask)) {
      config.modResults.BGTaskSchedulerPermittedIdentifiers = [...bgIdentifiers, vitalBgTask];
    }

    return config;
  });

  config = withEntitlementsPlist(config, (config) => {
    config.modResults['com.apple.developer.healthkit'] = true;
    config.modResults['com.apple.developer.healthkit.background-delivery'] = true;

    if (
      !Array.isArray(config.modResults['com.apple.developer.healthkit.access'])
    ) {
      config.modResults['com.apple.developer.healthkit.access'] = [];
    }

    return config;
  });

  config = withAppDelegate(config, (config) => {
		let source = config.modResults.contents;

    source = addObjcImports(source, ['"VitalHealthKitConfiguration.h"']);
    source = insertContentsInsideObjcFunctionBlock(
      source,
      'application didFinishLaunchingWithOptions:',
      '[VitalHealthKitConfiguration automaticConfiguration];',
      { position: "head" },
    );

    config.modResults.contents = source;
    return config;
  });

  return config;
};

const withHealthConnect = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    let androidManifest = config.modResults.manifest;

    androidManifest.application[0].activity[0]['intent-filter'].push({
      action: [
        {
          $: {
            'android:name': 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
          },
        },
      ],
    });

    return config;
  });
};

module.exports = (config) =>
  withPlugins(config, [[withHealthKit], [withHealthConnect]]);
