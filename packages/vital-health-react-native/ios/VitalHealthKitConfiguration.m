#import "VitalHealthKitConfiguration.h"
#import "VitalAppDelegateProxy.h"
#import <React/RCTBridgeModule.h>
#import <objc/runtime.h>

@import VitalHealthKit;

@implementation VitalHealthKitConfiguration

+ (void)load {
  // Swap AppDelegate
  Method setDelegateMethod = class_getInstanceMethod([UIApplication class], @selector(setDelegate:));
  IMP originalImpl = method_getImplementation(setDelegateMethod);
  void (*originalSetDelegate)(id, SEL, __attribute((ns_consumed)) id) = (typeof(originalSetDelegate)) originalImpl;
  IMP newImpl = imp_implementationWithBlock(^void(id app, id delegate) {
    originalSetDelegate(app, @selector(setDelegate:), [VitalAppDelegateProxy proxyWithBase:delegate]);
  });
  method_setImplementation(setDelegateMethod, newImpl);
}

+ (void)automaticConfiguration {
  [VitalHealthKitClient automaticConfigurationWithCompletion:nil];
}

+ (void)configureWithBackgroundDeliveryEnabled:(BOOL)backgroundDeliveryEnabled numberOfDaysToBackFill:(int)numberOfDaysToBackFill enableLogs:(BOOL)enableLogs {
  [VitalHealthKitClient configureWithBackgroundDeliveryEnabled:backgroundDeliveryEnabled numberOfDaysToBackFill:numberOfDaysToBackFill logsEnabled:enableLogs];
}

@end
