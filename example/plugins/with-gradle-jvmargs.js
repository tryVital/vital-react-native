const { withGradleProperties } = require('@expo/config-plugins');
const { updateAndroidBuildProperty } = require('@expo/config-plugins/build/android/BuildProperties');

const DEFAULT_JVM_ARGS = '-Xmx2048m -XX:MaxMetaspaceSize=1024m';

module.exports = function withGradleJvmArgs(config, props = {}) {
  const jvmArgs =
    typeof props.jvmArgs === 'string' && props.jvmArgs.trim()
      ? props.jvmArgs.trim()
      : DEFAULT_JVM_ARGS;

  return withGradleProperties(config, (config) => {
    config.modResults = updateAndroidBuildProperty(
      config.modResults,
      'org.gradle.jvmargs',
      jvmArgs
    );

    return config;
  });
};
