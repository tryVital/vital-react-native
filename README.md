### Vital React Native Library 

The Vital React Native Library, allows developers to easily connect to Vital's API using React Native. Our React Native library mirrors the functionality of our iOS and Android SDKs. It is a wrapper around the native SDKs, and it exposes the same methods and events. It is split into three parts: Core, Health and BLE Devices. They can be used interchangeably, but you need to install them separately. An example app can be found (here)[https://github.com/tryVital/vital-react-native/tree/main/example].

The docs can be found (here)[https://docs.tryvital.io/wearables/sdks/react_native]. 

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