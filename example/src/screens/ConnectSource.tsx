import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const BASE_URL = 'https://link.tryvital.io';

export const ConnectSource = ({navigation, route}) => {
  const {linkToken, environment, region} = route.params;

  const handleMessage = event => {
    if (event.nativeEvent.data === 'LINK_EVENT::CLOSE') {
      navigation.goBack();
    }
  };

  const getUrlParams = () => {
    return `?token=${linkToken}=&env=${environment}&isMobile=true&region=${region}`;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: BASE_URL + getUrlParams()}}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
};
