import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {
  Badge,
  FAB,
  Icon,
  ListItem,
  SpeedDial,
  Text,
  withTheme,
} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import {Actions} from 'react-native-router-flux';
import Collapsible from 'react-native-collapsible';
import RequestItem from '../components/requestItem';

const RequestsView = observer(({theme}) => {
  const [isDialOpen, setIsDialOpen] = useState(false);

  const onDialClose = action => {
    action();
    setIsDialOpen(false);
  };
  const mockData = [
    {type: 'БС', date: '2021-21-09', status: 'pending'},
    {type: 'БС', date: '2021-22-09', status: 'rejected'},
    {
      type: 'Удаленка',
      date: '2021-22-09',
      status: 'rejected',
      reason: 'Недостаток сотрудников на проекте',
    },
    {type: 'БС', date: '2021-22-09', status: 'rejected'},
    {type: 'БС', date: '2021-22-09', status: 'rejected'},
    {type: 'БС', date: '2021-23-09', status: 'approved'},
  ];

  return (
    <View
      style={{
        padding: 15,
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <View style={tw`mb-10`}>
        <Text style={tw`text-center text-black uppercase text-lg`}>
          Мои запросы
        </Text>
      </View>
      <FlatList
        data={mockData}
        renderItem={({item}) => <RequestItem item={item} />}
      />
      <SpeedDial
        color={theme.colors.primary}
        isOpen={isDialOpen}
        icon={() => <Icon name="add" type="ionicon" color="#fff" />}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setIsDialOpen(!isDialOpen)}
        onClose={() => setIsDialOpen(!isDialOpen)}>
        <SpeedDial.Action
          title="Удаленка"
          icon={() => <Icon name="globe-outline" type="ionicon" color="#fff" />}
          onPress={() => console.log('Delete Something')}
        />
        <SpeedDial.Action
          title="Отпуск"
          icon={() => (
            <Icon name="airplane-outline" type="ionicon" color="#fff" />
          )}
          onPress={() => onDialClose(Actions.vacation)}
        />
        <SpeedDial.Action
          title="БС"
          icon={() => (
            <Icon name="pause-circle-outline" type="ionicon" color="#fff" />
          )}
          onPress={() => onDialClose(Actions.unpaid)}
        />
      </SpeedDial>
    </View>
  );
});

export default withTheme(RequestsView);
