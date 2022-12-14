#import "VitalHealthKitConfiguration.h"
#import <React/RCTBridgeModule.h>

@import VitalHealthKit;

@implementation VitalHealthKitConfiguration

+ (void)configureWithBackgroundDeliveryEnabled:(BOOL)backgroundDeliveryEnabled numberOfDaysToBackFill:(int)numberOfDaysToBackFill enableLogs:(BOOL)enableLogs {
  [VitalHealthKitClient configureWithBackgroundDeliveryEnabled:backgroundDeliveryEnabled numberOfDaysToBackFill:numberOfDaysToBackFill logsEnabled:enableLogs];
}

@end
