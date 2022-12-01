import {Appbar} from 'react-native-paper';
import React from 'react';
import {useStoreActions} from 'easy-peasy';

function UserNavigationBar() {
  const setIsCreatingUser = useStoreActions(
    // @ts-ignore
    actions => actions.setIsCreatingUser,
  );

  return (
    <Appbar.Header>
      <Appbar.Content title="Users" />
      <Appbar.Action
        icon={'plus'}
        onPress={() => {
          setIsCreatingUser(true);
        }}
      />
    </Appbar.Header>
  );
}

export default UserNavigationBar;
