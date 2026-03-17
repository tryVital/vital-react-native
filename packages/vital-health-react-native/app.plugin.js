const {
  withEntitlementsPlist,
  withInfoPlist,
  withAndroidManifest,
  withAppDelegate,
  withGradleProperties,
  withProjectBuildGradle,
  withSettingsGradle,
} = require('expo/config-plugins');
const { withPlugins } = require('expo/config-plugins');
const { addObjcImports, insertContentsInsideObjcFunctionBlock, addSwiftImports, insertContentsInsideSwiftFunctionBlock } = require('@expo/config-plugins/build/ios/codeMod');
const { addWarningAndroid } = require('@expo/config-plugins/build/utils/warnings');
const { updateAndroidBuildProperty } = require('@expo/config-plugins/build/android/BuildProperties');

const HEALTH_SHARE = 'Allow $(PRODUCT_NAME) to check health info';
const ANDROID_HEALTH_PERMISSION_PREFIX = 'android.permission.health.';
const HEALTH_CONNECT_PERMISSIONS_RATIONALE_ACTION = 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE';
const SAMSUNG_HEALTH_SETTINGS_PLUGIN = 'io.tryvital.shealth-settings-plugin';
const SAMSUNG_HEALTH_PROJECT_PLUGIN = 'io.tryvital.shealth-project-plugin';
const SAMSUNG_HEALTH_PLUGIN_VERSION = '5.0.0-rc.1';
const SAMSUNG_HEALTH_SETTINGS_PLUGIN_DECLARATION =
  `id("${SAMSUNG_HEALTH_SETTINGS_PLUGIN}") version "${SAMSUNG_HEALTH_PLUGIN_VERSION}"`;
const SAMSUNG_HEALTH_PLUGIN_CLASSPATH =
  `io.tryvital:shealth-plugins:${SAMSUNG_HEALTH_PLUGIN_VERSION}`;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSamsungHealthAarPath = ({ samsungHealth } = {}) => {
  const aarPath = samsungHealth?.aarPath;
  return typeof aarPath === 'string' && aarPath.trim() ? aarPath.trim() : null;
};

const assertAndroidHealthPermissions = (config) => {
  const permissions = Array.isArray(config.android?.permissions)
    ? config.android.permissions
    : [];

  const hasHealthPermission = permissions.some(
    (permission) =>
      typeof permission === 'string' &&
      permission.startsWith(ANDROID_HEALTH_PERMISSION_PREFIX)
  );

  if (!hasHealthPermission) {
    throw new Error(
      'The @tryvital/vital-health-react-native Expo plugin requires at least one `android.permission.health.*` entry in `expo.android.permissions`.'
    );
  }
};

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
    const { modResults, sdkVersion = "0.1.0" } = config;
    const { language } = modResults;

    if (language !== "objc" && language !== "objcpp" && language !== "swift") {
      throw new Error(
        `Cannot modify the project AppDelegate as it's not in a supported language: ${language}`,
      );
    }

    let source = config.modResults.contents;

    if (language === "swift") {
      source = addSwiftImports(source, ['VitalHealthKit']);

      const autoConfig = "VitalHealthKitClient.automaticConfiguration()";
      const hasAutoConfig = source.includes(autoConfig);

      if (!hasAutoConfig) {
        source = insertContentsInsideSwiftFunctionBlock(
          source,
          'application(_:didFinishLaunchingWithOptions:)',
          autoConfig,
          { position: "head" },
        );
      }

    } else {
      source = addObjcImports(source, ['"VitalHealthKitConfiguration.h"']);

      const autoConfig = "[VitalHealthKitConfiguration automaticConfiguration];";
      const hasAutoConfig = source.includes(autoConfig);

      if (!hasAutoConfig) {
        source = insertContentsInsideObjcFunctionBlock(
          source,
          'application didFinishLaunchingWithOptions:',
          autoConfig,
          { position: "head" },
        );
      }
    }

    config.modResults.contents = source;
    return config;
  });

  return config;
};

const withHealthConnect = function androidManifestPlugin(config) {
  assertAndroidHealthPermissions(config);

  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;
    const mainActivity = androidManifest.application?.[0]?.activity?.[0];

    if (!mainActivity) {
      return config;
    }

    const intentFilters = Array.isArray(mainActivity['intent-filter'])
      ? mainActivity['intent-filter']
      : [];

    let hasPermissionsRationaleIntentFilter = false;
    const dedupedIntentFilters = intentFilters.filter((intentFilter) => {
      const hasRationaleAction =
        Array.isArray(intentFilter?.action) &&
        intentFilter.action.some(
          (action) => action?.$?.['android:name'] === HEALTH_CONNECT_PERMISSIONS_RATIONALE_ACTION
        );

      if (!hasRationaleAction) {
        return true;
      }

      if (hasPermissionsRationaleIntentFilter) {
        return false;
      }

      hasPermissionsRationaleIntentFilter = true;
      return true;
    });

    if (!hasPermissionsRationaleIntentFilter) {
      dedupedIntentFilters.push({
        action: [
          {
            $: {
              'android:name': HEALTH_CONNECT_PERMISSIONS_RATIONALE_ACTION,
            },
          },
        ],
      });
    }

    mainActivity['intent-filter'] = dedupedIntentFilters;

    return config;
  });
};

const setSettingsPlugin = (settingsGradle) => {
  if (/pluginManagement\s*{/.test(settingsGradle) && !/pluginManagement\s*{[\s\S]*repositories\s*{/.test(settingsGradle)) {
    settingsGradle = settingsGradle.replace(
      /pluginManagement\s*{/,
      `pluginManagement {\n  repositories {\n    gradlePluginPortal()\n    google()\n    mavenCentral()\n  }`
    );
  }

  if (/dependencyResolutionManagement\s*{/.test(settingsGradle) && !/dependencyResolutionManagement\s*{[\s\S]*repositories\s*{/.test(settingsGradle)) {
    settingsGradle = settingsGradle.replace(
      /dependencyResolutionManagement\s*{/,
      `dependencyResolutionManagement {\n  repositories {\n    google()\n    mavenCentral()\n  }`
    );
  }

  settingsGradle = settingsGradle.replace(
    new RegExp(
      `\\n?buildscript\\s*\\{\\s*dependencies\\s*\\{\\s*classpath\\s+['"]${escapeRegExp(SAMSUNG_HEALTH_PLUGIN_CLASSPATH)}['"]\\s*\\}\\s*\\}\\n?`,
      'g'
    ),
    '\n'
  );

  settingsGradle = settingsGradle.replace(
    new RegExp(
      `(^|\\n)\\s*classpath\\s+['"]io\\.tryvital:shealth-plugins:[^'"]+['"]\\s*`,
      'gm'
    ),
    '\n'
  );

  settingsGradle = settingsGradle.replace(
    new RegExp(`(^|\\n)\\s*id(?:\\s+|\\()['"]${escapeRegExp(SAMSUNG_HEALTH_SETTINGS_PLUGIN)}['"]\\)?[^\\n]*`, 'gm'),
    ''
  );

  settingsGradle = settingsGradle.replace(
    new RegExp(`(^|\\n)\\s*apply plugin:\\s*['"]${escapeRegExp(SAMSUNG_HEALTH_SETTINGS_PLUGIN)}['"]`, 'gm'),
    ''
  );

  settingsGradle = settingsGradle.replace(
    /\n\s*buildscript\s*\{\s*dependencies\s*\{\s*\}\s*\}\s*/g,
    '\n'
  );

  settingsGradle = settingsGradle.replace(
    /\n{3,}/g,
    '\n\n'
  );

  if (/plugins\s*{[\s\S]*?\n}/.test(settingsGradle)) {
    return settingsGradle.replace(
      /plugins\s*{[\s\S]*?\n}/,
      (match) => `${match.slice(0, -1)}  ${SAMSUNG_HEALTH_SETTINGS_PLUGIN_DECLARATION}\n}`
    );
  }

  return `${settingsGradle}\n\nplugins {\n  ${SAMSUNG_HEALTH_SETTINGS_PLUGIN_DECLARATION}\n}`;
};

const setProjectPluginClasspath = (buildGradle) => {
  const classpathLine = `classpath '${SAMSUNG_HEALTH_PLUGIN_CLASSPATH}'`;

  buildGradle = buildGradle.replace(
    new RegExp(
      `(^|\\n)\\s*classpath\\s+['"]io\\.tryvital:shealth-plugins:[^'"]+['"]\\s*`,
      'gm'
    ),
    '\n'
  );

  buildGradle = buildGradle.replace(
    /dependencies\s*{/,
    `dependencies {\n    ${classpathLine}`
  );

  return buildGradle.replace(
    new RegExp(`(^|\\n)(?:\\s*${escapeRegExp(classpathLine)}\\s*\\n){2,}`, 'g'),
    `$1    ${classpathLine}\n`
  );
};

const setProjectPlugin = (buildGradle) => {
  const pattern = new RegExp(`(^|\\n)\\s*apply plugin:\\s*['"]${SAMSUNG_HEALTH_PROJECT_PLUGIN}['"]`, 'm');
  if (pattern.test(buildGradle)) {
    return buildGradle;
  }

  return `apply plugin: '${SAMSUNG_HEALTH_PROJECT_PLUGIN}'\n\n${buildGradle}`;
};

const withSamsungHealth = (config, props) => {
  const samsungHealthAarPath = getSamsungHealthAarPath(props);

  if (!samsungHealthAarPath) {
    return config;
  }

  config = withGradleProperties(config, (config) => {
    config.modResults = updateAndroidBuildProperty(
      config.modResults,
      'samsungHealthAarPath',
      samsungHealthAarPath
    );

    return config;
  });

  config = withSettingsGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = setSettingsPlugin(config.modResults.contents);
    } else {
      addWarningAndroid(
        'samsungHealth.aarPath',
        "Cannot automatically configure settings.gradle if it's not groovy"
      );
    }

    return config;
  });

  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = setProjectPluginClasspath(config.modResults.contents);
      config.modResults.contents = setProjectPlugin(config.modResults.contents);
    } else {
      addWarningAndroid(
        'samsungHealth.aarPath',
        "Cannot automatically configure root build.gradle if it's not groovy"
      );
    }

    return config;
  });

  return config;
};

module.exports = (config, props = {}) =>
  withPlugins(config, [[withHealthKit, props], [withHealthConnect], [withSamsungHealth, props]]);
