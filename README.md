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

* Node.js + Yarn package manager
* Ruby + Bundler dependency manager (for iOS builds)
* JDK/JRE (for Android builds)

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
