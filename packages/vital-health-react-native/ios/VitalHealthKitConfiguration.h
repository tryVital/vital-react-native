#import <Foundation/Foundation.h>

@interface VitalHealthKitConfiguration: NSObject

+ (void)configureWithBackgroundDeliveryEnabled:(BOOL)backgroundDeliveryEnabled numberOfDaysToBackFill:(int)numberOfDaysToBackFill enableLogs:(BOOL)enableLogs;

@end