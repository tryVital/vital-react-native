#import <Foundation/Foundation.h>

@interface VitalHealthKitConfiguration: NSObject

+ (void)automaticConfiguration;
+ (void)configureWithBackgroundDeliveryEnabled:(BOOL)backgroundDeliveryEnabled numberOfDaysToBackFill:(int)numberOfDaysToBackFill enableLogs:(BOOL)enableLogs;

@end
