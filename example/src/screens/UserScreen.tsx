/* eslint-disable react-native/no-inline-styles */
import { VitalCore } from '@tryvital/vital-core-react-native';
import {
  AndroidHealthProvider,
  HealthConfig,
  IOSHealthProvider,
  VitalHealth,
} from '@tryvital/vital-health-react-native';
import React from 'react';
import { Vital } from '@tryvital/vital-node';
import { Button, VStack, HStack, ScrollView, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { Platform, Switch, Text } from 'react-native';
import { VITAL_API_KEY, VITAL_ENVIRONMENT, VITAL_REGION } from '../Environment';
import { vitalNodeClient } from '../App';
import { HealthProviderCard } from '../components/HealthProviderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenWrapper } from './ScreenWrapper';

const supportedProviders =
  Platform.OS === 'android'
    ? [AndroidHealthProvider.HealthConnect, AndroidHealthProvider.SamsungHealth]
    : [IOSHealthProvider.AppleHealthKit];

export const UserScreen = ({ route }) => {
  const user: Vital.ClientFacingUser = route.params.user;

  const [isCurrentSDKUser, setIsCurrentSDKUser] = useState(false);
  const [isSDKConfigured, setIsSDKConfigured] = useState(false);

  const [useRequestRestrictionDemo, setRequestRestrictionDemo] =
    useState<boolean>(false);

  const [useExplicitConnectMode, setExplicitConnectMode] =
    useState<boolean>(false);

  // Observe Vital Core SDK Status
  useEffect(() => {
    const subscription = VitalCore.observeStatusChange(status => {
      setIsSDKConfigured(status.includes('configured'));
      VitalCore.currentUserId().then(userId => {
        setIsCurrentSDKUser(
          userId?.toLowerCase() === user.userId.toLowerCase(),
        );
      });
    });

    return () => {
      console.log('clean up UserScreen subscription');
      subscription.remove();
    };
  }, [user.userId]);

  const onSignInSuccess = async () => {
    const config = new HealthConfig();
    config.connectionPolicy = useExplicitConnectMode
      ? 'explicit'
      : 'autoConnect';

    for (const provider of supportedProviders) {
      if (Platform.OS === 'android' && !(await VitalHealth.isAvailable(provider))) {
        continue;
      }

      await VitalHealth.configure(config, provider);
    }
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
      `ext:${user.clientUserId}`,
      async externalUserId => {
        console.log(`SDK requesting auth credential for ${externalUserId}`);

        const response = await vitalNodeClient.user.getUserSignInToken(
          user.userId,
        );

        return {
          type: 'signInToken',
          rawToken: response.signInToken,
        };
      },
    );
    await onSignInSuccess();
  };

  const handleSignInWithAPIKeyMode = async () => {
    await VitalCore.identifyExternalUser(
      `ext:${user.clientUserId}`,
      async externalUserId => {
        console.log(`SDK requesting auth credential for ${externalUserId}`);

        return {
          type: 'apiKey',
          environment: VITAL_ENVIRONMENT,
          region: VITAL_REGION,
          key: VITAL_API_KEY,
          userId: user.userId,
        };
      },
    );

    await onSignInSuccess();
  };

  return (
    <ScreenWrapper>
      <VStack space={1}>
        <Text style={{ color: 'black' }}>User ID</Text>
        <Text style={{ color: 'black' }}>{user.userId}</Text>
      </VStack>

      <VStack space={1}>
        <Text style={{ color: 'black' }}>Client User ID</Text>
        <Text style={{ color: 'black' }}>{user.clientUserId}</Text>
      </VStack>

      <VStack space={1}>
        <Text style={{ color: 'black' }}>SDK Status</Text>
        {isCurrentSDKUser && (
          <Text style={{ color: 'black' }}>Signed in as current SDK user.</Text>
        )}
        {!isCurrentSDKUser && isSDKConfigured && (
          <Text style={{ color: 'black' }}>
            Another user is currently signed in.
          </Text>
        )}
        {!isSDKConfigured && (
          <Text style={{ color: 'black' }}>SDK is not confingured.</Text>
        )}
      </VStack>

      {!isCurrentSDKUser && isSDKConfigured && (
        <Button onPress={() => VitalCore.signOut()}>Reset SDK</Button>
      )}

      {!isSDKConfigured && (
        <>
          <HStack alignItems={'center'} style={{ marginTop: 8 }}>
            <Text style={{ flexGrow: 1 }}>
              Health SDK Explicit Connect mode
            </Text>
            <Switch
              value={useExplicitConnectMode}
              onValueChange={value => setExplicitConnectMode(value)}
            />
          </HStack>
          <HStack alignItems={'center'}>
            <Text style={{ flexGrow: 1, color: 'black' }}>
              Sign-in Token Demo
            </Text>
            <Button onPress={handleSignInWithJWTDemoMode}>Sign-in</Button>
          </HStack>
          <HStack alignItems={'center'}>
            <Text style={{ flexGrow: 1, color: 'black' }}>API Key</Text>
            <Button onPress={handleSignInWithAPIKeyMode}>Sign-in</Button>
          </HStack>
        </>
      )}

      {isCurrentSDKUser && (
        <>
          {supportedProviders.map(provider => (
            <HealthProviderCard
              key={`${user.userId}-${provider}`}
              provider={provider}
              useRequestRestrictionDemo={useRequestRestrictionDemo}
              onUseRequestRestrictionDemoChange={setRequestRestrictionDemo}
              userId={user.userId}
            />
          ))}
        </>
      )}

      <Box height={16} />
    </ScreenWrapper>
  );
};
