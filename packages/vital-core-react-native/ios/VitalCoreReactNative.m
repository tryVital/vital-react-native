#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VitalCoreReactNative, NSObject)

RCT_EXTERN_METHOD(setUserId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configure:(NSString *)apiKey
                  environment:(NSString *)environment
                  region:(NSString *)region
                  enableLogs:(BOOL)enableLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(hasUserConnectedTo:(NSString *)provider
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(userConnectedSources:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createConnectedSourceIfNotExist:(NSString *)provider
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(postTimeSeriesData:(NSString *)jsonString
                  provider:(NSString *)provider
                  timeZone:(NSString *)timeZone
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(cleanUp:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
