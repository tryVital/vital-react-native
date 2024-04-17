#import <Foundation/Foundation.h>

@interface VitalHealthKitConfiguration: NSObject

+ (void)load;

+ (void)automaticConfiguration;
+ (void)configureWithBackgroundDeliveryEnabled:(BOOL)backgroundDeliveryEnabled numberOfDaysToBackFill:(int)numberOfDaysToBackFill enableLogs:(BOOL)enableLogs;

@end
