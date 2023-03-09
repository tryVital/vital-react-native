#import "VitalCoreConfiguration.h"
#import <React/RCTBridgeModule.h>

@import VitalCore;

@implementation VitalCoreConfiguration

+ (void)automaticConfiguration {
  [VitalClient automaticConfigurationWithCompletionHandler:^{}];
}

@end
