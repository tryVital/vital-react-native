


import {ClientFacingUser} from '@tryvital/vital-node/client/models/user_models';
import {FlatList, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vitalClient} from '../App';
import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
} from 'react-native-paper';

const HomeScreen = () => {
  const [getUsers, setUsers] = useState(Array<ClientFacingUser>());

  useEffect(() => {
    vitalClient.User.getAll()
      .then(users => {
        setUsers(users.users);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={getUsers}
        renderItem={({item}) => (
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
              },
            ]}>
            <Text style={styles.item}>{item.client_user_id}</Text>
            <IconButton
              icon="login"
              size={20}
              onPress={() =>
                vitalClient.Link.create(
                  item.client_user_id,
                  'strava',
                  'vitalexample://callback',
                )
                  .then(link => {
                    return vitalClient.Link.getOAuthLink(
                      link.link_token,
                      'strava',
                    );
                  })
                  .then(oauthResponse => {
                    return Linking.openURL(oauthResponse.oauth_url!);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            />
            <IconButton
              icon="login"
              size={20}
              onPress={() => vitalClient.User.delete(item.client_user_id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
