import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react-lite';
import Profile from '../store/Profile';
import {Button, withTheme} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const HomeView = observer(({theme}) => {
  useEffect(() => {
    Profile.getUser();
  }, []);
  return !Profile.data ? (
    <ActivityIndicator />
  ) : (
    <View
      style={{
        padding: 15,
        height: '100%',
        backgroundColor: theme.colors.secondary,
      }}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white uppercase text-xl text-left`}>
          Привет, {Profile.data.firstName} {Profile.data.lastName}!
        </Text>
        {Profile.data.vacationDay === 0 ? (
          <Text style={tw`text-white text-left`}>
            У тебя нет доступных дней отпуска
          </Text>
        ) : (
          <Text style={tw`text-white text-left`}>
            У тебя есть {Profile.data.vacationDay} неиспользованных дней отпуска
          </Text>
        )}
      </View>
      <Button title="Выход" onPress={Profile.logOut} />
    </View>
  );
});

export default withTheme(HomeView);
