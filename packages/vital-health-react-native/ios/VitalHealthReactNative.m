#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
@interface RCT_EXTERN_MODULE(VitalHealthReactNative, NSObject)

RCT_EXTERN_METHOD(configure:(BOOL)backgroundDeliveryEnabled
                  numberOfDaysToBackFill:(int)numberOfDaysToBackFill
                  enableLogs:(BOOL)enableLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configureClient:(NSString *)apiKey
                  environment:(NSString *)environment
                  region:(NSString *)region
                  enableLogs:(BOOL)enableLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(askForResources:(NSArray<NSString *> *)resources
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ask:(NSArray<NSString *> *)readResources
                  writeResources:(NSArray<NSString *> *)writeResources
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(writeHealthData:(NSString *)resource
                  value:(double)value
                  startDate:(double)startDate
                  endDate:(double)endDate
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

RCT_EXTERN_METHOD(status)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
