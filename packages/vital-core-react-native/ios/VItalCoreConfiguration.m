#import "VitalCoreConfiguration.h"
#import <React/RCTBridgeModule.h>

@import VitalHealthKit;

@implementation VitalCoreConfiguration

+ (void)automaticConfiguration {
  [VitalClient automaticConfiguration];
}

@end
