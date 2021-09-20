import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import Profile from '../store/Profile';
import {Button, Text, withTheme} from 'react-native-elements';

const LoginView = observer(({theme}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          padding: 25,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.secondary,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: theme.colors.textColor,
              textTransform: 'uppercase',
              fontSize: 35,
              marginBottom: 25,
            }}>
            noorsoft team
          </Text>
          <Button
            titleStyle={styles.buttonText}
            title="Войти при помощи Slack"
            onPress={() => {
              Profile.authWithSlack();
            }}
          />
        </View>
      </View>
    </View>
  );
});

export default withTheme(LoginView);

const styles = StyleSheet.create({
  buttonText: {
    padding: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
