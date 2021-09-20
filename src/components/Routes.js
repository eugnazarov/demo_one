import React from 'react';
import {observer} from 'mobx-react-lite';
import {Actions, Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import LoginView from '../views/LoginView';
import SlackView from '../views/SlackView';
import HomeView from '../views/HomeView';
import RequestsView from '../views/RequestsView';
import LibraryView from '../views/LibraryView';
import {Button, Icon, withTheme} from 'react-native-elements';
import Profile from '../store/Profile';
import CalendarView from '../views/CalendarView';
import tw from 'tailwind-react-native-classnames';
import UnpaidRequestView from '../views/UnpaidRequestView';
import VacationView from '../views/VacationView';
import MyBooksView from '../views/MyBooksView';
import LibraryRulesView from '../views/LibraryRulesView';
import MyBooksRequestsView from '../views/MyBooksRequestsView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = observer(({theme}) => {
  const token = AsyncStorage.getItem('Profile').then(val => val.token);

  return (
    <Router>
      <Stack key="root">
        <Scene hideNavBar key="login" component={LoginView} />
        <Tabs
          initial={token && Profile.token}
          titleStyle={tw`text-white`}
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
            navigationBarStyle={{backgroundColor: theme.colors.primary}}
            icon={() => <Icon name="calendar-outline" type="ionicon" />}
            key="calendar"
            title="Календарь"
            tabBarLabel="Календарь"
            component={CalendarView}
          />
          <Scene
            navigationBarStyle={{backgroundColor: theme.colors.primary}}
            icon={() => <Icon name="book-outline" type="ionicon" />}
            key="library"
            title="LIBRARY"
            tabBarLabel="Библиотека"
            component={LibraryView}
          />
        </Tabs>
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
        <Scene
          navigationBarStyle={{backgroundColor: theme.colors.primary}}
          titleStyle={{color: '#fff'}}
          title="Запрос на отпуск"
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
          key="vacation"
          component={VacationView}
        />
        <Scene
          navigationBarStyle={{backgroundColor: theme.colors.primary}}
          titleStyle={{color: '#fff'}}
          title="Мои книги"
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
          key="myBooks"
          component={MyBooksView}
        />
        <Scene
          navigationBarStyle={{backgroundColor: theme.colors.primary}}
          titleStyle={{color: '#fff'}}
          title="Правила пользования"
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
          key="libraryRules"
          component={LibraryRulesView}
        />
        <Scene
          navigationBarStyle={{backgroundColor: theme.colors.primary}}
          titleStyle={{color: '#fff'}}
          title="Мои запросы"
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
          key="libraryRequests"
          component={MyBooksRequestsView}
        />
      </Stack>
    </Router>
  );
});

export default withTheme(Routes);
