#import "VitalCoreConfiguration.h"
#import <React/RCTBridgeModule.h>

@import VitalCore;

@implementation VitalCoreConfiguration

+ (void)automaticConfiguration {
  [VitalClient automaticConfigurationWithCompletion:nil];
}

+ (void)setStdOutEnabled:(BOOL)stdOutEnabled {
  VitalLoggerObjC.stdOutEnabled = stdOutEnabled;
}

@end
