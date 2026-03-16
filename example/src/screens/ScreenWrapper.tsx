import React from 'react';
import { ScrollView, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView px={4} py={4}>
        <VStack space={4}>{children}</VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
