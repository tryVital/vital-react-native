import {ClientFacingUser} from '@tryvital/vital-node/client/models/user_models';
import {FlatList, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vitalClient} from '../App';
import {HStack, IconButton, Box} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const DeleteIcon = () => (
  <IconButton icon={<Icon name={'trash'} size={16} />} />
);

const LinkIcon = ({onPress, isLoading}) => (
  <IconButton
    onPress={onPress}
    icon={<Icon name={'link'} size={16} />}
    disabled={isLoading}
  />
);
const HomeScreen = ({navigation}) => {
  const [getUsers, setUsers] = useState(Array<ClientFacingUser>());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    vitalClient.User.getAll()
      .then(users => {
        setUsers(users.users);
      })
      .catch(err => {
        console.log(err);
      });
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            p={0}
            variant="ghost"
            onPress={() => console.log('IM WORKING')}
            icon={<Icon size={20} name="plus-circle" color="rgb(64,64,64)" />}
          />
        ),
      });
  }, [navigation]);

  const handlePressOnConnectDevice = async (user_id: string) => {
    setLoading(true);
    const token = await vitalClient.Link.create(user_id);
    navigation.navigate('ConnectSource', {
      linkToken: token.link_token,
      environment: 'sandbox',
      region: 'eu',
    });
    console.log(user_id);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getUsers}
        renderItem={({item}) => (
          <HStack
            justifyContent={'space-between'}
            px={2}
            py={2}
            borderBottomColor={'gray.100'}
            borderBottomWidth={1}>
            <Box>
              <Text style={styles.item}>{item.client_user_id}</Text>
            </Box>
            <HStack>
              <LinkIcon
                onPress={() => handlePressOnConnectDevice(item.user_id)}
                isLoading={isLoading}
              />
              <DeleteIcon />
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
