#import "VitalAppDelegateProxy.h"
#import "VitalHealthKitConfiguration.h"

@interface VitalAppDelegateProxy ()
@property(strong, nonatomic) id<UIApplicationDelegate> delegate;
@end

@implementation VitalAppDelegateProxy
@synthesize delegate;

+ (instancetype)proxyWithBase:(id<UIApplicationDelegate>)delegate {
  VitalAppDelegateProxy *proxy = [[VitalAppDelegateProxy alloc] init];
  proxy.delegate = delegate;
  return proxy;
};

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey,id> *)launchOptions {
  [VitalHealthKitConfiguration automaticConfiguration];

  if ([self.delegate respondsToSelector:@selector(application:didFinishLaunchingWithOptions:)]) {
    return [self.delegate application:application didFinishLaunchingWithOptions:launchOptions];
  } else {
    return YES;
  }
}

- (BOOL)respondsToSelector:(SEL)aSelector {
  return [self.delegate respondsToSelector:aSelector];
}

- (BOOL)conformsToProtocol:(Protocol *)aProtocol {
  return [self.delegate conformsToProtocol:aProtocol];
}

- (id)forwardingTargetForSelector:(SEL)aSelector {
  return self.delegate;
}

@end
