import {ClientFacingUser} from '@tryvital/vital-node/client/models/user_models';
import {FlatList, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vitalNodeClient} from '../App';
import { VITAL_ENVIRONMENT, VITAL_REGION } from '../Environment';
import {HStack, VStack, Box, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import styles from '../Styles';
import { VitalResource, VitalHealth } from '@tryvital/vital-health-react-native';

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
  const [permissionAsked, setPermissionAsked] = useState<VitalResource[]>([])
  const textInput = React.useRef<TextInput>(null);

  const refreshPermissionAsked = () => {
    Promise.all([
      VitalHealth.hasAskedForPermission(VitalResource.Activity),
      VitalHealth.hasAskedForPermission(VitalResource.Workout),
      VitalHealth.hasAskedForPermission(VitalResource.Sleep),
    ]).then(([activityAsked, workoutAsked, sleepAsked]) => {
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

      let sortedResources = (new Array(...resources.values())).sort((lhs, rhs) => lhs.localeCompare(rhs))
      setPermissionAsked(sortedResources);
    });
  }

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

    refreshPermissionAsked();

  }, [navigation]);

  const handleAskForPermission = () => {
    // [1] Request permissions for wearable data
    VitalHealth.askForResources([VitalResource.Activity, VitalResource.Workout, VitalResource.Sleep])
      .then(() => {
        console.log("finished asking for permission")

        refreshPermissionAsked();
      })
      .catch((err) => console.error("errored when asking for permission", err))
    
    // [2] The SDK would automatically begin sync on resources with read permission granted.
  }

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
              <Text style={styles.item}>{item.client_user_id}</Text>
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

  const HealthSDKCard = () => {
    return (
      <Box margin="4" padding="4" borderColor="#333333" borderWidth="1">
        <Text style={{color: 'black', fontSize: 20, paddingBottom: 16}}>
          {Platform.OS == 'android' ? 'Health Connect' : 'HealthKit'}
        </Text>

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
          Ask for permission
        </Button>
      </Box>
    )
  }

  return (
    <View style={styles.container}>
      <HealthSDKCard />
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
