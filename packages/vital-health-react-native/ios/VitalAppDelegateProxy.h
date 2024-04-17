#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface VitalAppDelegateProxy : NSObject <UIApplicationDelegate>
+ (instancetype)proxyWithBase:(id<UIApplicationDelegate>)delegate;
@end

NS_ASSUME_NONNULL_END
