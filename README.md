# vital-react-native

The official React Native Library for Vital API, HealthKit and Devices.

## Documentation

* [Installation](https://docs.tryvital.io/wearables/sdks/installation)
* [Authentication](https://docs.tryvital.io/wearables/sdks/authentication)
* [Core SDK](https://docs.tryvital.io/wearables/sdks/vital-core)
* [Health SDK](https://docs.tryvital.io/wearables/sdks/vital-health)
* [Devices SDK](https://docs.tryvital.io/wearables/sdks/vital-devices)

## Installation

The documentation can be found [here](https://docs.tryvital.io/wearables/sdks/react_native).

### SDK requirements

The SDKs require a minimum deployment target of 15.1+ on iOS. Note that you might need to update your Podfile in addition to the Xcode project:

```diff
# Podfile

-platform :ios, min_ios_version_supported
+platform :ios, '15.1'
```

### Building the example app

The Vital React Native Example app is built using Expo 54 through Expo Prebuild.

It requires the following toolchains being present in the environment:

- Node.js + Yarn package manager
- Expo 54+ CLI
- Ruby + Bundler dependency manager (for iOS builds)
- JDK/JRE (for Android builds)

The Example app can be built and launched in three simple steps:

```bash
# Build the Junction SDK packages
yarn syncpkg

# Resolve and install dependencies.
npx expo install

# Run the sample app
npx expo run:ios
npx expo run:android
```

# Expo

## Installation

> [!IMPORTANT]
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


### Android specific configuration

In your Expo `app.json`, use the expo-build-properties config plugin to customize the minimum, target and compile Android SDK version:

```json
{
  "expo": {
    // ...
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "minSdkVersion": 26
          }
        }
      ],
      // ...
    ]
  }
}
```

> [!NOTE]
>Health Connect requires a minimum of API Level 26, while Samsung Health requires a minimum of API Level 29.

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/) guide.

## Customizations

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

## Capabilities

The Expo config plugin for Vital Health SDK would perform all the necessary code mods during EAS prebuild to [enable Apple HealthKit Background Delivery](https://docs.tryvital.io/wearables/guides/apple-healthkit#setting-up-apple-healthkit-background-delivery).

This means your app project will declare HealthKit entitlements and will link the Apple HealthKit framework. So you must be prepared to demonstrate Apple
HealthKit usage in your app in your next submission to the Apple App Store.

- Automatic: Build the app with [EAS build](https://docs.expo.io/build/introduction/)
- Manual: Visit [Apple developer portal](https://developer.apple.com/account/resources/identifiers/list) and enable the HealthKit capability for your bundle identifier before building for production. This can also be done via Xcode.


# Android configuration in bare React Native projects

> [!NOTE]
> Only applicable to bare React Native projects. See the Expo section for Expo-specific instructions.

In your root project Gradle file (`./build.gradle`), make sure that:

1. Your Kotlin Gradle Plugin version is in sync with the Kotlin version.

2. You are compiling and targeting with Android SDK 34.

3. You are minimally targeting at least Android SDK 26.

```diff
 buildscript {
   ext {
     kotlinVersion = "2.0.21"
     buildToolsVersion = "34.0.0"
     minSdkVersion = 26
     compileSdkVersion = 34
     targetSdkVersion = 34
   }

   dependencies {
-    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
+    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
   }
 }
```
