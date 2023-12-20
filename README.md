### Vital React Native Library

The Vital React Native Library, allows developers to easily connect to Vital's API using React Native. Our React Native library mirrors the functionality of our iOS and Android SDKs. It is a wrapper around the native SDKs, and it exposes the same methods and events. It is split into three parts: Core, Health and BLE Devices. They can be used interchangeably, but you need to install them separately. An example app project can be found under the `example` directory at the project root.

The documentation can be found [here](https://docs.tryvital.io/wearables/sdks/react_native).

### SDK requirements

The SDKs require a minimum deployment target of 14.0+ on iOS. Note that you might need to update your Podfile in addition to the Xcode project:

```diff
# Podfile

-platform :ios, min_ios_version_supported
+platform :ios, '14.0'
```

### Building the example app

The Vital React Native Library requires the following toolchains being present in the environment:

- Node.js + Yarn package manager
- Ruby + Bundler dependency manager (for iOS builds)
- JDK/JRE (for Android builds)

The example app can be built and launched in three simple steps:

```
# Resolve and install dependencies.
yarn install

# Build all the packages.
yarn run example:build:ios
yarn run example:build:android

# Run the sample app via the Metro bundler
yarn run example:start:ios
yarn run example:start:android
```

# Expo installation

> This package cannot be used in the "Expo Go" app because [it requires custom native code](https://docs.expo.dev/workflow/customizing/).

First install the package with yarn, npm, or [`npx expo install`](https://docs.expo.dev/more/expo-cli/#installation).

```sh
expo install @tryvital/vital-core-react-native
expo install @tryvital/vital-health-react-native
```

After installing this npm package, add the [config plugin](https://docs.expo.io/guides/config-plugins/) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "@tryvital/vital-core-react-native",
      "@tryvital/vital-health-react-native"
    ]
  }
}
```

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/) guide.

## API

The plugin provides props for extra customization. Every time you change the props or plugins, you'll need to rebuild (and `prebuild`) the native app. If no extra properties are added, defaults will be used.

- `healthSharePermission` (_string_): Sets the iOS `NSHealthShareUsageDescription` permission message to the `Info.plist`. Defaults to `Allow $(PRODUCT_NAME) to check health info`.

`app.config.js`

```json
{
  "expo": {
    "plugins": [
      "@tryvital/vital-core-react-native",
      [
        "@tryvital/vital-health-react-native",
        {
          "healthSharePermission": "Custom health share permission"
        }
      ]
    ]
  }
}
```

## Background Processing

Background processing is not currently supported by this plugin.

## Capabilities

This plugin will enable the iOS `com.apple.developer.healthkit` entitlement, but in order to sync this with the bundle identifier' production capabilities you'll need to do one of two things:

- Automatic: Build the app with [EAS build](https://docs.expo.io/build/introduction/)
- Manual: Visit [Apple developer portal](https://developer.apple.com/account/resources/identifiers/list) and enable the HealthKit capability for your bundle identifier before building for production. This can also be done via Xcode.
