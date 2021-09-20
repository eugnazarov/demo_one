import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {
  Actions,
  Drawer,
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import LoginView from '../views/LoginView';
import Navbar from './UI/Navbar';
import SlackView from '../views/SlackView';
import HomeView from '../views/HomeView';
import RequestsView from '../views/RequestsView';
import LibraryView from '../views/LibraryView';
import {Button, Icon, withTheme} from 'react-native-elements';
import Profile from '../store/Profile';
import CalendarView from '../views/CalendarView';
import tw from 'tailwind-react-native-classnames';
import UnpaidRequestView from '../views/UnpaidRequestView';

const Routes = observer(({theme}) => {
  return (
    <Router>
      <Stack key="root">
        {!Profile.token && (
          <Scene hideNavBar key="login" component={LoginView} />
        )}
        <Scene hideNavBar key="slack" component={SlackView} />
        <Scene
          navigationBarStyle={{backgroundColor: theme.colors.primary}}
          titleStyle={{color: '#fff'}}
          title="Запрос на БС"
          back
          backButtonTintColor="#fff"
          renderBackButton={() => (
            <Button
              icon={() => (
                <Icon
                  color="#fff"
                  name="chevron-back-outline"
                  type="ionicon"
                  onPress={() => Actions.pop()}
                />
              )}
            />
          )}
          key="unpaid"
          component={UnpaidRequestView}
        />
        <Tabs
          titleStyle={tw`text-white`}
          initial={!!Profile.token}
          hideNavBar
          key="tabs">
          <Scene
            navigationBarStyle={{backgroundColor: theme.colors.primary}}
            key="home"
            component={HomeView}
            title="Профиль"
            icon={() => <Icon name="person-circle-outline" type="ionicon" />}
          />
          <Scene
            navigationBarStyle={{backgroundColor: theme.colors.primary}}
            icon={() => <Icon name="documents-outline" type="ionicon" />}
            key="requests"
            title="Запросы"
            tabBarLabel="Запросы"
            component={RequestsView}
          />
          <Scene
            icon={() => <Icon name="calendar-outline" type="ionicon" />}
            key="calendar"
            tabBarLabel="Календарь"
            component={CalendarView}
          />
          <Scene
            icon={() => <Icon name="book-outline" type="ionicon" />}
            key="library"
            tabBarLabel="Библиотека"
            component={LibraryView}
          />
        </Tabs>
      </Stack>
    </Router>
  );
});

export default withTheme(Routes);
