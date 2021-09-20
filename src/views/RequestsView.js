import React, {useState} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {FAB, Icon, SpeedDial, Text, withTheme} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import {Actions} from 'react-native-router-flux';

const RequestsView = observer(({theme}) => {
  const [isDialOpen, setIsDialOpen] = useState(false);

  const onDialClose = action => {
    action();
    setIsDialOpen(false);
  };
  return (
    <View
      style={{
        padding: 15,
        height: '100%',
        backgroundColor: theme.colors.secondary,
      }}>
      <Text h1 style={tw`text-white text-center`}>
        Список запросов пуст
      </Text>
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
          onPress={() => console.log('Add Something')}
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
