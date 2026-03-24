import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Switch, Text, VStack } from "native-base";
import { VitalHealth } from "@tryvital/vital-health-react-native";
import { ActivityIndicator } from "react-native";

export const PersistentLoggingToggle = () => {
    const [isPersistentLoggingEnabled, setPersistentLoggingEnabled] = useState<boolean | undefined>(undefined);
    const [isSharing, setSharing] = useState<boolean>(false);

    useEffect(() => {
        VitalHealth.isPersistentLoggingEnabled().then(setPersistentLoggingEnabled);
    }, []);

    const onSwitchToggle = (enabled: boolean) => {
        // Optimistic update
        setPersistentLoggingEnabled(enabled);

        // Actual update
        VitalHealth.setPersistentLoggingEnabled(enabled)
            .then(() => VitalHealth.isPersistentLoggingEnabled())
            .then(setPersistentLoggingEnabled);
    };

    const shareLogArchive = () => {
        if (isSharing) {
            return;
        }

        setSharing(true);
        VitalHealth.sharePersistentLogArchive();
        setTimeout(() => setSharing(false), 3_000);
    };

    return (
        <Box borderWidth="1" borderRadius="md" mx="2" my="2">
            <VStack alignItems="flex-start" space="2" pt="2">
                <HStack px="3" alignItems="center">
                    <Text flexGrow={1}>Persistent Logging</Text>
                    {isPersistentLoggingEnabled === undefined && <ActivityIndicator />}
                    {isPersistentLoggingEnabled !== undefined && <Switch value={isPersistentLoggingEnabled} onValueChange={onSwitchToggle} />}
                </HStack>
                <Button variant="ghost" mb="0" onPress={shareLogArchive} isLoading={isSharing} isDisabled={isSharing}>
                    Share Log Archive
                </Button>
            </VStack>
        </Box>
    )
};
