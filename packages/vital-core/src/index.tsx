import { NativeModules, Platform } from 'react-native';
import { VitalClient as NodeVitalClient } from '@tryvital/vital-node';
import type { ClientConfig } from '@tryvital/vital-node/dist/lib/models';

const LINKING_ERROR =
  `The package 'react-native-vital-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const VitalCore = NativeModules.VitalCore
  ? NativeModules.VitalCore
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class VitalClient extends NodeVitalClient {
  constructor(config: ClientConfig) {
    super(config);
  }
}
