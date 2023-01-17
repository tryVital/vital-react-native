import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HStack, IconButton, Box} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const ChevronIcon = ({onPress}) => (
  <IconButton
    onPress={onPress}
    icon={<Icon name={'chevron-right'} size={16} />}
  />
);

const HomeScreen = ({navigation}) => {
  const data = [
    {
      name: 'Users',
      link: 'UserScreen',
    },
  ];

  const navigateTo = (linkName: string) => {
    navigation.navigate(linkName, {});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <HStack
            justifyContent={'space-between'}
            px={2}
            py={2}
            borderBottomColor={'gray.100'}
            borderBottomWidth={1}>
            <Box>
              <Text style={styles.item}>{item.name}</Text>
            </Box>
            <HStack>
              <ChevronIcon onPress={() => navigateTo(item.link)} />
            </HStack>
          </HStack>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
