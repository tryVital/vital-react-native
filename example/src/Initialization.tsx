

// Configuring Vital health SDK you can do this at any point in your app

import { HealthConfig, VitalHealth } from "@tryvital/vital-health-react-native";
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION, VITAL_USER_ID } from "./Environment";
import { VitalCore } from "@tryvital/vital-core-react-native";

// You can then set the user_id and data will start pushing up to the servers.
export async function initializeVitalSDK() {
    await VitalHealth.configureClient(
        VITAL_API_KEY,
        VITAL_ENVIRONMENT,
        VITAL_REGION,
        true,
    )

    console.log('Configured VitalCore SDK');

    // This must only be called after the SDK is configured.
    await VitalCore.setUserId(VITAL_USER_ID)
    
    console.log('Configured Vital SDK current user ID');

    try {
        // iOS: HealthKit is always available on iPhone.
        // Android: Health Connect may be unavailable, and causes SDK configuration to fail.
        await VitalHealth.configure(new HealthConfig())
        
        console.log('Configured VitalHealth SDK');
    } catch (err) {
        console.log('Failed to configure Vital Health', err)
    }
}
