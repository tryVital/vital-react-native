import { VitalCore } from "@tryvital/vital-core-react-native";
import { VitalHealth, VitalResource } from "@tryvital/vital-health-react-native";
import { ClientFacingUser } from "@tryvital/vital-node/client/models/user_models";
import { Button, VStack, HStack, Box } from "native-base";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION } from "../Environment";
import { vitalNodeClient } from "../App";

export const UserScreen = ({route, navigation}) => {
    const user: ClientFacingUser = route.params.user;

    const [isCurrentSDKUser, setIsCurrentSDKUser] = useState(false);
    const [isSDKConfigured, setIsSDKConfigured] = useState(false);

    const [permissionAsked, setPermissionAsked] = useState<VitalResource[]>([])

    // Observe Vital Core SDK Status
    useEffect(() => {
        const subscription = VitalCore.observeStatusChange((status) => {
            setIsSDKConfigured(status.includes("configured"));
            VitalCore.currentUserId().then((userId) => {
                setIsCurrentSDKUser(userId?.toLowerCase() == user.user_id.toLowerCase());
            });
        });

        return () => subscription.remove();
    }, [user.user_id]);

    const refreshPermissionAsked = () => {
        Promise.all([
        VitalHealth.hasAskedForPermission(VitalResource.Activity),
        VitalHealth.hasAskedForPermission(VitalResource.Workout),
        VitalHealth.hasAskedForPermission(VitalResource.Sleep),
        ]).then(([activityAsked, workoutAsked, sleepAsked]) => {
        let resources = new Set<VitalResource>();
        
        if (activityAsked) {
            resources.add(VitalResource.Activity)
        }

        if (workoutAsked) {
            resources.add(VitalResource.Workout)
        }

        if (sleepAsked) {
            resources.add(VitalResource.Sleep)
        }

        let sortedResources = (new Array(...resources.values())).sort((lhs, rhs) => lhs.localeCompare(rhs))
        setPermissionAsked(sortedResources);
        });
    };

    useEffect(() => {
        refreshPermissionAsked();
    }, [navigation]);
    
    const handleAskForPermission = () => {
        // [1] Request permissions for wearable data
        VitalHealth.askForResources([VitalResource.Activity, VitalResource.Workout, VitalResource.Sleep])
        .then(() => {
            console.log("finished asking for permission")

            refreshPermissionAsked();
        })
        .catch((err) => console.error("errored when asking for permission", err))
        
        // [2] The SDK would automatically begin sync on resources with read permission granted.
    };

    const handleSignInWithJWTDemoMode = async () => {
        // IMPORTANT:
        //
        // Calling `POST /v2/user/{id}/sign_in_token` from example app is ONLY
        // for illustration purpose. In practice, this should be called by
        // your backend service on behalf of your consumer apps, so that your
        // Vital API Key is kept strictly as a server-side secret.
        //
        const response = await vitalNodeClient.User.createSignInToken(user.user_id)

        await VitalCore.signIn(response.sign_in_token);
    };

    const handleSignInWithAPIKeyMode = async () => {
        await VitalCore.configure(
            VITAL_API_KEY,
            VITAL_ENVIRONMENT,
            VITAL_REGION,
            true,
        );
        await VitalCore.setUserId(user.user_id);
    };

    const HealthSDKCard = () => {
        return (
        <Box padding="4" borderColor="#333333" borderWidth="1">
            <Text style={{color: 'black', fontSize: 20, paddingBottom: 16}}>
            {Platform.OS == 'android' ? 'Health Connect' : 'HealthKit'}
            </Text>

            {permissionAsked.length == 0 &&
            <Text style={{color: 'black', fontSize: 16, paddingBottom: 16}}>
                No permission was asked previously
            </Text>
            }

            {permissionAsked.length > 0 &&
            <Text style={{color: 'black', fontSize: 16, paddingBottom: 16}}>
                Asked permission: {permissionAsked.join(", ")}
            </Text>
            }

            <Button onPress={() => handleAskForPermission()}>
            Ask for permission
            </Button>

            <HStack alignItems={'center'} style={{marginTop: 8}}>
                <Text style={{flexGrow: 1}}>Force Sync</Text>
                <Button onPress={() => VitalHealth.syncData()}>Sync</Button>
            </HStack>
        </Box>
        )
    };

    return <VStack px={4} py={4} space={4}>
        <VStack space={1}>
        <Text style={{color: 'black'}}>User ID</Text>
        <Text style={{color: 'black'}}>{user.user_id}</Text>
        </VStack>
        
        <VStack space={1}>
        <Text style={{color: 'black'}}>Client User ID</Text>
        <Text style={{color: 'black'}}>{user.client_user_id}</Text>
        </VStack>

        <VStack space={1}>
        <Text style={{color: 'black'}}>SDK Status</Text>
        {isCurrentSDKUser && <Text style={{color: 'black'}}>Signed in as current SDK user.</Text>}
        {!isCurrentSDKUser && isSDKConfigured && <Text style={{color: 'black'}}>Another user is currently signed in.</Text>}
        {!isSDKConfigured && <Text style={{color: 'black'}}>SDK is not confingured.</Text>}
        </VStack>

        {
            !isCurrentSDKUser && isSDKConfigured &&
            <Button onPress={() => VitalHealth.cleanUp()}>
                Reset SDK
            </Button>
        }

{
            !isSDKConfigured &&
            <>
            <HStack alignItems={'center'}>
                <Text style={{flexGrow: 1, color: 'black'}}>Sign-in Token Demo mode</Text>
                <Button onPress={handleSignInWithJWTDemoMode}>Sign-in</Button>
            </HStack>
            <HStack alignItems={'center'}>
                <Text style={{flexGrow: 1, color: 'black'}}>API Key mode</Text>
                <Button onPress={handleSignInWithAPIKeyMode}>Sign-in</Button>
            </HStack>
            </>
        }

        {
            isCurrentSDKUser &&
            <>
            <HealthSDKCard />
            </>
        }
    </VStack>
};
