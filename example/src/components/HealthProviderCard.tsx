/* eslint-disable react-native/no-inline-styles */
import {
  AndroidHealthProvider,
  ConnectionStatus,
  IOSHealthProvider,
  VitalHealth,
  VitalResource,
} from '@tryvital/vital-health-react-native';
import type { HealthProvider } from '@tryvital/vital-health-react-native';
import { Button, VStack, HStack, Box } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Switch, Text } from 'react-native';
import { AskConfig } from '@tryvital/vital-health-react-native/lib/typescript/ask_config';

const requestedResources = [
  VitalResource.Activity,
  VitalResource.Workout,
  VitalResource.Sleep,
  VitalResource.HeartRate,
];

function providerLabel(provider: HealthProvider): string {
  switch (provider) {
    case AndroidHealthProvider.HealthConnect:
      return 'Health Connect';
    case AndroidHealthProvider.SamsungHealth:
      return 'Samsung Health';
    case IOSHealthProvider.AppleHealthKit:
      return 'HealthKit';
  }

  return provider;
}

type ObservedSyncStatus = {
  status: string;
  resource?: string;
  extra?: string;
};

function normalizeSyncStatus(
  status: ObservedSyncStatus | ConnectionStatus
): ObservedSyncStatus {
  if (typeof status === 'string') {
    return { status };
  }

  return status;
}

type HealthProviderCardProps = {
  provider: HealthProvider;
  useRequestRestrictionDemo: boolean;
  onUseRequestRestrictionDemoChange: (value: boolean) => void;
  userId: string;
};

export function HealthProviderCard({
  provider,
  useRequestRestrictionDemo,
  onUseRequestRestrictionDemoChange,
  userId,
}: HealthProviderCardProps) {
  const [permissionAsked, setPermissionAsked] = useState<VitalResource[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus | null>(null);
  const [syncStatus, setSyncStatus] = useState<ObservedSyncStatus | null>(null);
  const [isConnectingDisconnecting, setConnectingDisconnecting] =
    useState<boolean>(false);
  const [isBackgroundSyncEnabled, setBackgroundSyncEnabled] = useState<
    boolean | undefined
  >(undefined);
  const [isUpdatingBackgroundSync, setUpdatingBackgroundSync] =
    useState<boolean>(true);

  const refreshPermissionAsked = useCallback(async () => {
    const asked = await Promise.all(
      requestedResources.map(resource =>
        VitalHealth.hasAskedForPermission(resource, provider),
      ),
    );

    const sortedResources = requestedResources
      .filter((_, index) => asked[index])
      .sort((lhs, rhs) => lhs.localeCompare(rhs));

    setPermissionAsked(sortedResources);
  }, [provider]);

  const refreshBackgroundSync = useCallback(async () => {
    if (VitalHealth.canEnableBackgroundSyncNoninteractively) {
      setUpdatingBackgroundSync(false);
      return;
    }

    const enabled = await VitalHealth.isBackgroundSyncEnabledForProvider(
      provider,
    );
    setBackgroundSyncEnabled(enabled);
    setUpdatingBackgroundSync(false);
  }, [provider]);

  useEffect(() => {
    let isCancelled = false;
    let connectionSubscription:
      | ReturnType<typeof VitalHealth.observeConnectionStatusChange>
      | undefined;
    let syncSubscription:
      | ReturnType<typeof VitalHealth.observeSyncStatusChange>
      | undefined;

    const refresh = async () => {
      try {
        setUpdatingBackgroundSync(true);

        const available = await VitalHealth.isAvailable(provider);
        if (isCancelled) {
          return;
        }

        setIsAvailable(available);

        if (!available) {
          setPermissionAsked([]);
          setConnectionStatus(null);
          setSyncStatus(null);
          setBackgroundSyncEnabled(undefined);
          setUpdatingBackgroundSync(false);
          return;
        }

        connectionSubscription = VitalHealth.observeConnectionStatusChange(
          status => {
            if (!isCancelled) {
              setConnectionStatus(status);
            }
          },
          provider,
        );

        syncSubscription = VitalHealth.observeSyncStatusChange(
          status => {
            if (!isCancelled) {
              setSyncStatus(normalizeSyncStatus(status));
            }
          },
          provider,
        );

        await Promise.all([
          refreshPermissionAsked(),
          refreshBackgroundSync(),
        ]);
      } catch (error) {
        console.error(`Failed to refresh ${provider} card state`, error);
        if (!isCancelled) {
          setUpdatingBackgroundSync(false);
        }
      }
    };

    refresh();

    return () => {
      isCancelled = true;
      connectionSubscription?.remove();
      syncSubscription?.remove();
    };
  }, [provider, refreshBackgroundSync, refreshPermissionAsked, userId]);

  const handleAskForPermission = () => {
    let config: AskConfig | undefined;

    if (
      provider === IOSHealthProvider.AppleHealthKit &&
      Platform.OS === 'ios' &&
      useRequestRestrictionDemo
    ) {
      config = {
        type: 'ios',
        dataTypeAllowlist: [
          'HKQuantityTypeIdentifierStepCount',
          'HKQuantityTypeIdentifierActiveEnergyBurned',
          'HKCategoryTypeIdentifierSleepAnalysis',
        ],
      };
    }

    VitalHealth.ask(requestedResources, [], config, provider)
      .then(outcome => {
        console.log(`finished asking for ${provider} permission: ${outcome}`);
        refreshPermissionAsked();
      })
      .catch(err =>
        console.error(`errored when asking ${provider} permission`, err),
      );
  };

  const handleBackgroundSync = () => {
    if (isBackgroundSyncEnabled === undefined) {
      return;
    }

    setUpdatingBackgroundSync(true);

    if (isBackgroundSyncEnabled) {
      VitalHealth.disableBackgroundSync(provider)
        .then(() => setBackgroundSyncEnabled(false))
        .finally(() => setUpdatingBackgroundSync(false));
    } else {
      VitalHealth.enableBackgroundSync(provider)
        .then(success => setBackgroundSyncEnabled(success))
        .finally(() => setUpdatingBackgroundSync(false));
    }
  };

  const handleConnectDisconnect = () => {
    setConnectingDisconnecting(true);

    if (connectionStatus === 'disconnected') {
      VitalHealth.connect(provider).finally(() =>
        setConnectingDisconnecting(false),
      );
    } else {
      VitalHealth.disconnect(provider).finally(() =>
        setConnectingDisconnecting(false),
      );
    }
  };

  return (
    <Box padding="4" borderColor="#333333" borderWidth="1">
      <Text style={{ color: 'black', fontSize: 20, paddingBottom: 16 }}>
        {providerLabel(provider)}
      </Text>

      {!isAvailable && (
        <Text style={{ color: 'black', fontSize: 16 }}>
          {providerLabel(provider)} is unavailable on this device.
        </Text>
      )}

      {isAvailable && (
        <>
          {connectionStatus !== null && connectionStatus !== 'autoConnect' && (
            <>
              <Text style={{ color: 'black', fontSize: 16, paddingBottom: 16 }}>
                Explicit Connection Status: {connectionStatus}
              </Text>

              <Button
                onPress={handleConnectDisconnect}
                disabled={isConnectingDisconnecting}
                isLoading={isConnectingDisconnecting}
              >
                {connectionStatus === 'disconnected' ? 'Connect' : 'Disconnect'}
              </Button>
              <Box h={4} />
            </>
          )}

          {permissionAsked.length === 0 && (
            <Text style={{ color: 'black', fontSize: 16, paddingBottom: 16 }}>
              No permission was asked previously
            </Text>
          )}

          {permissionAsked.length > 0 && (
            <Text style={{ color: 'black', fontSize: 16, paddingBottom: 16 }}>
              Asked permission: {permissionAsked.join(', ')}
            </Text>
          )}

          {syncStatus !== null && (
            <Text style={{ color: 'black', fontSize: 16, paddingBottom: 16 }}>
              Latest Sync Status: {syncStatus.status}
              {syncStatus.resource ? ` (${syncStatus.resource})` : ''}
            </Text>
          )}

          <Button onPress={handleAskForPermission}>
            Ask for permission (Activity, Workout, Sleep)
          </Button>

          {provider === IOSHealthProvider.AppleHealthKit && (
            <HStack style={{ paddingVertical: 16, gap: 4 }}>
              <VStack style={{ flexShrink: 1 }}>
                <Text style={{ fontSize: 16 }}>Request Restriction Demo</Text>
                <Text style={{ fontSize: 12 }}>
                  Only allow stepCount, activeEnergyBurned and sleepAnalysis
                  (HealthKit types) to be requested.
                </Text>
              </VStack>

              <Switch
                value={useRequestRestrictionDemo}
                onValueChange={onUseRequestRestrictionDemoChange}
                style={{ flexShrink: 0 }}
              />
            </HStack>
          )}

          <Box h={2} />

          <Button onPress={() => VitalHealth.openPlatformHealthApp(provider)}>
            Open Platform Health App
          </Button>

          <HStack alignItems={'center'} style={{ marginTop: 8 }}>
            <Text style={{ flexGrow: 1 }}>Force Sync</Text>
            <Button onPress={() => VitalHealth.syncData([], provider)}>
              Sync
            </Button>
          </HStack>

          {!VitalHealth.canEnableBackgroundSyncNoninteractively && (
            <HStack alignItems={'center'} style={{ marginTop: 8 }}>
              <Text style={{ flexGrow: 1 }}>Background Sync</Text>
              {isBackgroundSyncEnabled !== undefined && (
                <Switch
                  value={isBackgroundSyncEnabled}
                  disabled={isUpdatingBackgroundSync}
                  onChange={handleBackgroundSync}
                />
              )}
              {isBackgroundSyncEnabled === undefined && <ActivityIndicator />}
            </HStack>
          )}
        </>
      )}
    </Box>
  );
}
