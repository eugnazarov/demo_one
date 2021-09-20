import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {
  Button,
  ButtonGroup,
  Input,
  ListItem,
  Overlay,
  Text,
  withTheme,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import tw from 'tailwind-react-native-classnames';
import Profile from '../store/Profile';

const VacationView = observer(({theme}) => {
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [index, setIndex] = useState(null);

  const [visible, setVisible] = useState(false);
  const rules = [
    'Отпуск составляет 28 дней в году',
    'Одна часть отпуска 14 дней',
    'Отпуск доступен, если ты отработал(а) более 6 мес.',
    'Предупреждать об отпуске (Алину Решетникову) необходимо не менее чем за 2 недели до ухода в него',
    'Твой отпуск не должен пересекаться с отпусками других разработчиков',
    'Интервал между отпусками - больше 2х мес. - если это большие отпуска по 14 дней.',
    'ВАЖНО! При уходе в отпуск необходимо в статусе слека ставить пальмочку :palm_tree:',
  ];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View
      style={{
        padding: 15,
        justifyContent: 'space-around',
        height: '100%',
        backgroundColor: theme.colors.secondary,
      }}>
      <Text style={tw`text-center text-xl text-white`}>
        Отпускных дней доступно: {Profile.data.vacationDay}
      </Text>
      <DatePicker
        date={startDate}
        style={{width: 300}}
        mode="date"
        placeholder="Выбери дату начала отпуска"
        format="YYYY-MM-DD"
        minDate={moment(Date.now()).add(1, 'days').format('YYYY-MM-DD')}
        maxDate={moment(Date.now()).add(1, 'months').format('YYYY-MM-DD')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateText: {color: '#fff'},
          dateInput: {
            color: '#fff',
            marginLeft: 36,
            borderColor: theme.colors.primary,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={d => {
          setStartDate(d);
        }}
      />
      <DatePicker
        date={finishDate}
        style={{width: 300}}
        mode="date"
        placeholder="Выбери дату конца отпуска"
        format="YYYY-MM-DD"
        minDate={moment(Date.now()).add(1, 'days').format('YYYY-MM-DD')}
        maxDate={moment(Date.now()).add(1, 'months').format('YYYY-MM-DD')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateText: {color: '#fff'},
          dateInput: {
            color: '#fff',
            marginLeft: 36,
            borderColor: theme.colors.primary,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={d => {
          setFinishDate(d);
        }}
      />
      <Overlay
        overlayStyle={tw`h-3/4 p-5`}
        backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text h2 style={tw`mb-5 text-center `}>
          Правила взятия отпусков
        </Text>
        <FlatList
          data={rules}
          renderItem={({item}) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <Button onPress={toggleOverlay} title="Понятно" />
      </Overlay>

      <View>
        <Text style={{color: theme.colors.primary, marginBottom: 9}}>
          Оставь комментарий
        </Text>
        <Input multiline inputStyle={{color: '#fff'}} />
      </View>
      <Button title="Отправить запрос" />
      <Button
        onPress={toggleOverlay}
        titleStyle={{fontSize: 21}}
        type="outline"
        title="Правила взятия отпусков"
      />
    </View>
  );
});

export default withTheme(VacationView);
