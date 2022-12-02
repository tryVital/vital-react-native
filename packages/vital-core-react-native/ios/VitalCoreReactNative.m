#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VitalCoreReactNative, NSObject)

RCT_EXTERN_METHOD(setUpId:(NSString *) userId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configurate:(NSString *)
                  withEnvironment:(NSString *)
                  withRegion:(NSString *)
                  withEnableLogs: (Bool)
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
