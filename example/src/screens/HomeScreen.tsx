import {ClientFacingUser} from '@tryvital/vital-node/client/models/user_models';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vitalNodeClient} from '../App';
import { VITAL_ENVIRONMENT, VITAL_REGION } from '../Environment';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import styles from '../Styles';
import { VitalCore } from '@tryvital/vital-core-react-native';

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

  const [isSDKConfigured, setIsSDKConfigured] = useState(false);
  const [sdkCurrentUserId, setSDKCurrentUserId] = useState<string | null>(null);

  // Observe Vital Core SDK Status
  useEffect(() => {
    const subscription = VitalCore.observeStatusChange((status) => {
      console.log("Vital Core SDK status:", status)
      setIsSDKConfigured(status.includes("configured"));

      VitalCore.currentUserId().then((userId) => {
        console.log("Vital Current User ID:", userId)
        setSDKCurrentUserId(userId);
      });
    });

    return () => subscription.remove();
  });

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
    sdkCurrentUserId: string | null
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
            <TouchableOpacity
              onPress={() => navigation.navigate('User', {user: item})}
            >
              <HStack
                justifyContent={'space-between'}
                px={4}
                py={2}
                borderBottomColor={'gray.100'}
                borderBottomWidth={1}
              >
                <VStack flexShrink={1}>
                  <Text style={styles.itemTitle}>{item.client_user_id}</Text>
                  {
                    item.user_id.toLowerCase() == sdkCurrentUserId?.toLowerCase() &&
                    <HStack alignItems={"center"}>
                      <Icon name="arrow-up" size={14} color={"green"} />
                      <Text style={styles.itemSubtitle}>Current SDK User</Text>
                    </HStack>
                  }
                </VStack>
                <HStack alignItems={"center"}>
                  <Icon name="chevron-right" size={14} color={"grey"} style={{marginLeft: 4}} />
                  {
                    item.user_id.toLowerCase() == sdkCurrentUserId?.toLowerCase() &&
                    <LinkButton
                      onPress={() => handlePressOnConnectDevice(item.user_id)}
                      isLoading={isLoading}
                    />
                  }
                  <DeleteButton
                    onPress={() => handlePressDeleteUser(item.user_id)}
                  />
                </HStack>
              </HStack>
            </TouchableOpacity>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <UserList state={getUsers} sdkCurrentUserId={sdkCurrentUserId} />
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
