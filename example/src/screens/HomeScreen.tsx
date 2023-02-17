import {ClientFacingUser} from '@tryvital/vital-node/client/models/user_models';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vitalNodeClient} from '../App';
import { VITAL_ENVIRONMENT, VITAL_REGION } from '../Environment';
import {HStack, VStack, Box} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import styles from '../Styles';

const DeleteButton = ({onPress}) => (
  <Icon
    onPress={onPress}
    name="trash"
    style={styles.iconButtonDestructive}
  />
);

const LinkButton = ({onPress, isLoading}) => (
  <Icon
    onPress={onPress}
    name="link"
    disabled={isLoading}
    style={styles.iconButton}
  />
);

enum ResourceStatus {
  Loaded, Loading, Failure
}

type ResourceLoaded<T> = { status: ResourceStatus.Loaded, users: T };
type ResourceLoading = { status: ResourceStatus.Loading };
type ResourceFailure = { status: ResourceStatus.Failure, error: any };

type ResourceState<T> = ResourceLoaded<T> | ResourceLoading | ResourceFailure

const HomeScreen = ({navigation}) => {
  const [getUsers, setUsers] = useState({ status: ResourceStatus.Loading } as ResourceState<ClientFacingUser[]>);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const textInput = React.useRef<TextInput>(null);

  useEffect(() => {
    setLoading(true);

    vitalNodeClient.User.getAll()
      .then(response => {
        setUsers({ status: ResourceStatus.Loaded, users: response.users });
      })
      .catch(err => {
        setUsers({ status: ResourceStatus.Failure, error: err });
        console.log({err});
      })
      .finally(() => setLoading(false));

    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          onPress={() => {
            setIsOpen(true);
          }}
          style={styles.iconButton}
        />
      ),
    });
  }, [navigation]);

  const handleCreateUser = () => {
    setIsOpen(false);
    const newUserClientId = textInput.current!.state as string;
    setLoading(true);
    vitalNodeClient.User.create(newUserClientId)
      .then(_ => {
        return vitalNodeClient.User.getAll();
      })
      .then(response => {
        setUsers({ status: ResourceStatus.Loaded, users: response.users });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handlePressOnConnectDevice = async (user_id: string) => {
    setLoading(true);
    const token = await vitalNodeClient.Link.create(user_id);
    navigation.navigate('ConnectSource', {
      linkToken: token.link_token,
      environment: VITAL_ENVIRONMENT,
      region: VITAL_REGION,
    });
    console.log(user_id);
    setLoading(false);
  };

  const handlePressDeleteUser = async (user_id: string) => {
    setLoading(true);
    vitalNodeClient.User.delete(user_id)
      .then(_ => {
        return vitalNodeClient.User.getAll();
      })
      .then(response => {
        setUsers({ status: ResourceStatus.Loaded, users: response.users });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  type UserListProps = {
    state: ResourceState<ClientFacingUser[]>
  };
  const UserList = (props: UserListProps) => {
    switch (props.state.status) {
      case ResourceStatus.Loading:
        return <Text>Loading</Text>;
      case ResourceStatus.Failure:
        return (
          <VStack>
            <Text>Error</Text>
            <Text>{props.state.error.toString()}</Text>
          </VStack>
        );
      case ResourceStatus.Loaded:
      return (
        <FlatList
          data={props.state.users}
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
                <LinkButton
                  onPress={() => handlePressOnConnectDevice(item.user_id)}
                  isLoading={isLoading}
                />
                <DeleteButton
                  name="trash"
                  onPress={() => handlePressDeleteUser(item.user_id)}
                />
              </HStack>
            </HStack>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <UserList state={getUsers} />
      <View>
        <Dialog.Container visible={isOpen}>
          <Dialog.Title>Create User</Dialog.Title>
          <Dialog.Description>
            Enter Client User ID below to create a new user.
          </Dialog.Description>
          <Dialog.Input
            textInputRef={textInput}
            onChangeText={text => (textInput.current!.state = text)}
          />
          <Dialog.Button label="Cancel" onPress={() => setIsOpen(false)} />
          <Dialog.Button label="Create User" onPress={handleCreateUser} />
        </Dialog.Container>
      </View>
    </View>
  );
};

export default HomeScreen;
