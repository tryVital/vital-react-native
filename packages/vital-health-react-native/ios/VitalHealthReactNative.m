#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VitalHealthReactNative, NSObject)

RCT_EXTERN_METHOD(configure:(BOOL)backgroundDeliveryEnabled
                  numberOfDaysToBackFill:(int)numberOfDaysToBackFill
                  enableLogs:(BOOL)enableLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(askForResources:(NSArray<NSString *> *)resources
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(cleanUp:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(hasAskedForPermission:(NSString *)resource
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(syncData:(NSArray<NSString *> *)resources
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
