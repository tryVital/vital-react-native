#import "VitalCoreConfiguration.h"
#import <React/RCTBridgeModule.h>

@import VitalCore;

@implementation VitalCoreConfiguration

+ (void)automaticConfiguration {
  [VitalClient automaticConfigurationWithCompletion:nil];
}

@end
