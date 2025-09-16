import { VitalCore } from "@tryvital/vital-core-react-native";
import { ConnectionStatus, HealthConfig, VitalHealth, VitalResource } from "@tryvital/vital-health-react-native";
import { ClientFacingUser } from "@tryvital/vital-node/client/models/user_models";
import { Button, VStack, HStack, Box } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Switch, Text } from "react-native";
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION } from "../Environment";
import { vitalNodeClient } from "../App";
import { AskConfig } from "@tryvital/vital-health-react-native/lib/typescript/ask_config";

export const UserScreen = ({route, navigation}) => {
    const user: ClientFacingUser = route.params.user;

    const [isCurrentSDKUser, setIsCurrentSDKUser] = useState(false);
    const [isSDKConfigured, setIsSDKConfigured] = useState(false);

    const [permissionAsked, setPermissionAsked] = useState<VitalResource[]>([]);
    const [isBackgroundSyncEnabled, setBackgroundSyncEnabled] = useState<boolean | undefined>(undefined);
    const [isUpdatingBackgroundSync, setUpdatingBackgroundSync] = useState<boolean>(true);

    const [useRequestRestrictionDemo, setRequestRestrictionDemo] = useState<boolean>(false);

    const [useExplicitConnectMode, setExplicitConnectMode] = useState<boolean>(false);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
    const [isConnectingDisconnecting, setConnectingDisconnecting] = useState<boolean>(false);

    // Observe Vital Core SDK Status
    useEffect(() => {
        const subscription = VitalCore.observeStatusChange((status) => {
            setIsSDKConfigured(status.includes("configured"));
            VitalCore.currentUserId().then((userId) => {
                setIsCurrentSDKUser(userId?.toLowerCase() == user.user_id.toLowerCase());
            });
        });

        const subscription2 = VitalHealth.observeConnectionStatusChange(setConnectionStatus);

        return () => {
            console.log("clean up UserScreen subscription");
            subscription.remove();
            subscription2.remove();
        };
    }, [user.user_id]);

    const refreshPermissionAsked = () => {
        Promise.all([
        VitalHealth.hasAskedForPermission(VitalResource.Activity),
        VitalHealth.hasAskedForPermission(VitalResource.Workout),
        VitalHealth.hasAskedForPermission(VitalResource.Sleep),
        VitalHealth.hasAskedForPermission(VitalResource.HeartRate),
        ]).then(([activityAsked, workoutAsked, sleepAsked, heartRateAsked]) => {
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

        if (heartRateAsked) {
            resources.add(VitalResource.HeartRate)
        }

        let sortedResources = (new Array(...resources.values())).sort((lhs, rhs) => lhs.localeCompare(rhs))
        setPermissionAsked(sortedResources);
        });
    };

    useEffect(() => {
        refreshPermissionAsked();

        VitalHealth.isBackgroundSyncEnabled
            .then((enabled) => setBackgroundSyncEnabled(enabled))
            .then((enabled) => setUpdatingBackgroundSync(false));

    }, [navigation]);
    
    const handleAskForPermission = () => {
        let config: AskConfig | undefined = undefined;

        if (Platform.OS == "ios" && useRequestRestrictionDemo) {
            config = {
                type: "ios",
                dataTypeAllowlist: [
                    "HKQuantityTypeIdentifierStepCount",
                    "HKQuantityTypeIdentifierActiveEnergyBurned",
                    "HKCategoryTypeIdentifierSleepAnalysis",
                ]
            }
        }

        // [1] Request permissions for wearable data
        VitalHealth.ask(
            [VitalResource.Activity, VitalResource.Workout, VitalResource.Sleep, VitalResource.HeartRate],
            [],
            config,
        )
        .then((outcome) => {
            console.log(`finished asking for permission: ${outcome}`);
            refreshPermissionAsked();
        })
        .catch((err) => console.error("errored when asking for permission", err))
        
        // [2] The SDK would automatically begin sync on resources with read permission granted.
    };

    const onSignInSuccess = async () => {
        const config = new HealthConfig();
        config.connectionPolicy = useExplicitConnectMode ? "explicit" : "autoConnect";
        await VitalHealth.configure(config);
    };

    const handleSignInWithJWTDemoMode = async () => {
        // IMPORTANT:
        //
        // Calling `POST /v2/user/{id}/sign_in_token` from example app is ONLY
        // for illustration purpose. In practice, this should be called by
        // your backend service on behalf of your consumer apps, so that your
        // Vital API Key is kept strictly as a server-side secret.
        //

        await VitalCore.identifyExternalUser(
            `ext:${user.client_user_id}`,
            async (externalUserId) => {
                console.log(`SDK requesting auth credential for ${externalUserId}`);

                const response = await vitalNodeClient.User.createSignInToken(user.user_id);

                return {
                    type: "signInToken",
                    rawToken: response.sign_in_token,
                };
            }
        );
        await onSignInSuccess();
    };

    const handleSignInWithAPIKeyMode = async () => {

        await VitalCore.identifyExternalUser(
            `ext:${user.client_user_id}`,
            async (externalUserId) => {
                console.log(`SDK requesting auth credential for ${externalUserId}`);

                return {
                    type: "apiKey",
                    environment: VITAL_ENVIRONMENT,
                    region: VITAL_REGION,
                    key: VITAL_API_KEY,
                    userId: user.user_id
                };
            }
        )

        await onSignInSuccess();
    };

    const handleBackgroundSync = () => {
        if (isBackgroundSyncEnabled === undefined) {
            console.log("LOL");
            return;
        }

        setUpdatingBackgroundSync(true);

        if (isBackgroundSyncEnabled) {
            VitalHealth.disableBackgroundSync()
                .then(() => setBackgroundSyncEnabled(false))
                .then(() => setUpdatingBackgroundSync(false));
        } else {
            VitalHealth.enableBackgroundSync()
                .then((x) => {
                    console.log(x);
                    return x;
                })
                .then((success) => setBackgroundSyncEnabled(success))
                .then(() => setUpdatingBackgroundSync(false));
        }
    };

    const handleConnectDisconnect = () => {
        setConnectingDisconnecting(true);

        if (connectionStatus === "disconnected") {
            VitalHealth.connect().finally(() => setConnectingDisconnecting(false));
        } else {
            VitalHealth.disconnect().finally(() => setConnectingDisconnecting(false));
        }
    };

    const HealthSDKCard = () => {
        return (
        <Box padding="4" borderColor="#333333" borderWidth="1">
            <Text style={{color: 'black', fontSize: 20, paddingBottom: 16}}>
            {Platform.OS == 'android' ? 'Health Connect' : 'HealthKit'}
            </Text>

            {connectionStatus !== "autoConnect" && <>
                <Text style={{color: 'black', fontSize: 16, paddingBottom: 16}}>
                    Explicit Connection Status: {connectionStatus}
                </Text>

                <Button
                    onPress={() => handleConnectDisconnect()}
                    disabled={isConnectingDisconnecting}
                    isLoading={isConnectingDisconnecting}
                >
                    {connectionStatus === "disconnected" ? "Connect" : "Disconnect"}
                </Button>
                <Box h={4} />
            </>}

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
            Ask for permission (Activity, Workout, Sleep)
            </Button>

            {Platform.OS == "ios" && (
                <HStack style={{paddingVertical: 16, gap: 4}}>
                    <VStack style={{ flexShrink: 1 }}>
                        <Text style={{ fontSize: 16 }}>Request Restriction Demo</Text>
                        <Text style={{ fontSize: 12 }}>Only allow stepCount, activeEnergyBurned and sleepAnalysis (HealthKit types) to be requested.</Text>
                    </VStack>

                    <Switch
                        value={useRequestRestrictionDemo}
                        onValueChange={setRequestRestrictionDemo}
                        style={{flexShrink: 0}}
                    />
                </HStack>
            )}

            <Box h={2} />

            <Button onPress={() => VitalHealth.openPlatformHealthApp()}>
            Open Platform Health App
            </Button>

            <HStack alignItems={'center'} style={{marginTop: 8}}>
                <Text style={{flexGrow: 1}}>Force Sync</Text>
                <Button onPress={() => VitalHealth.syncData()}>Sync</Button>
            </HStack>

            {!VitalHealth.canEnableBackgroundSyncNoninteractively && (
                <HStack alignItems={'center'} style={{marginTop: 8}}>
                    <Text style={{flexGrow: 1}}>Background Sync</Text>
                    {isBackgroundSyncEnabled !== undefined && (
                        <Switch 
                            value={isBackgroundSyncEnabled}
                            disabled={isUpdatingBackgroundSync}
                            onChange={handleBackgroundSync}
                        />
                    )}
                    {isBackgroundSyncEnabled === undefined && (
                        <ActivityIndicator />
                    )}
                </HStack>
            )}
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
            <Button onPress={() => VitalCore.signOut()}>
                Reset SDK
            </Button>
        }

{
            !isSDKConfigured &&
            <>
            <HStack alignItems={'center'} style={{marginTop: 8}}>
                <Text style={{flexGrow: 1}}>Health SDK Explicit Connect mode</Text>
                <Switch 
                    value={useExplicitConnectMode}
                    onValueChange={(value) => setExplicitConnectMode(value)}
                />
            </HStack>
            <HStack alignItems={'center'}>
                <Text style={{flexGrow: 1, color: 'black'}}>Sign-in Token Demo</Text>
                <Button onPress={handleSignInWithJWTDemoMode}>Sign-in</Button>
            </HStack>
            <HStack alignItems={'center'}>
                <Text style={{flexGrow: 1, color: 'black'}}>API Key</Text>
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
