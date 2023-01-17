import VitalDevices

@objc(VitalDevicesReactNative)
class VitalDevicesReactNative: NSObject {

    @objc(startScanForDevice:name:brand:kind:resolver:rejecter:)
    func startScanForDevice(_ id:String,
     name: String,
     brand: String,
     kind: String,
     resolve: @escaping RCTPromiseResolveBlock,
     reject:RCTPromiseRejectBlock) -> Void {

      resolve(())
    }

    @objc(stopScanForDevice:rejecter:)
    func stopScanForDevice(_ resolve: @escaping RCTPromiseResolveBlock,
     reject:RCTPromiseRejectBlock) -> Void {

      resolve(())
    }

     @objc(pairDevice:resolver:rejecter:)
      func pairDevice(_ scannedDeviceId:String,
      resolve: @escaping RCTPromiseResolveBlock,
      reject:RCTPromiseRejectBlock) -> Void {

       resolve(())
    }

    @objc(readBloodPressure:resolver:rejecter:)
    func readBloodPressure(_ pairedDeviceId:String,
     resolve: @escaping RCTPromiseResolveBlock,
     reject:RCTPromiseRejectBlock) -> Void {

      resolve(())
    }

    @objc(readGlucoseMeter:resolver:rejecter:)
    func readGlucoseMeter(_ pairedDeviceId:String,
     resolve: @escaping RCTPromiseResolveBlock,
     reject:RCTPromiseRejectBlock) -> Void {

      resolve(())
    }
}
