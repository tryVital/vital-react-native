

// Configuring Vital health SDK you can do this at any point in your app

import { HealthConfig, VitalHealth } from "@tryvital/vital-health-react-native";
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION, VITAL_USER_ID } from "./Environment";

// You can then set the user_id and data will start pushing up to the servers.
export async function initializeVitalSDK() {
    await VitalHealth.configureClient(
        VITAL_API_KEY,
        VITAL_ENVIRONMENT,
        VITAL_REGION,
        true,
    )

    console.log('Configured VitalCore SDK');
    
    await VitalHealth.configure(new HealthConfig())
    
    console.log('Configured VitalHealth SDK');

    // This must only be called after the SDK is configured.
    await VitalHealth.setUserId(VITAL_USER_ID)

    console.log('Configured Vital SDK current user ID');
}
