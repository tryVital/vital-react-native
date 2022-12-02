#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VitalCoreReactNative, NSObject)

RCT_EXTERN_METHOD(setUserId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configurate:(NSString *)apiKey
                  environment:(NSString *)environment
                  region:(NSString *)region
                  enableLogs:(BOOL)enableLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
