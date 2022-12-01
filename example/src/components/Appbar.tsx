import React from 'react';
import {useStoreActions} from 'easy-peasy';
import {IconButton, Box, Text, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { StatusBar, StyleSheet } from 'react-native';
import { AlertDialog } from "native-base";

function UserNavigationBar() {
  const setIsCreatingUser = useStoreActions(
    // @ts-ignore
    actions => actions.setIsCreatingUser,
  );

  return (
    <>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content" // Here is where you change the font-color
      />
      <Box safeAreaTop bg="white" />
      <HStack
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        px={2}
>
        <Text style={styles.heading}>
          Users
        </Text>
        <IconButton
          p={0}
          variant="ghost"
          onPress={console.log}
          icon={<Icon size={20} name="plus-circle" color="rgb(64,64,64)" />}
        />
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  heading: {
    fontWeight: '900',
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  text: {
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 10,
  },
});


export default UserNavigationBar;
function getAuthToken() {
  throw new Error('Function not implemented.');
}

