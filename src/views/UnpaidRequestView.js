import React, {useState} from 'react';
import {View} from 'react-native';
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

const UnpaidRequestView = observer(({theme}) => {
  const [date, setDate] = useState(null);
  const [index, setIndex] = useState(null);

  const [visible, setVisible] = useState(false);
  const rules = [
    'Нужно отправить запрос на бс заранее (как минимум за 1,5-2 недели)',
    'Дождаться ответа по запросу',
  ];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const buttons = ['Да', 'Нет', 'Не знаю'];
  return (
    <View
      style={{
        padding: 15,
        justifyContent: 'space-around',
        height: '100%',
        backgroundColor: theme.colors.secondary,
      }}>
      <DatePicker
        date={date}
        style={{width: 300}}
        mode="date"
        placeholder="Выбери дату"
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
          setDate(d);
        }}
      />
      <Overlay
        overlayStyle={tw`h-1/2 p-5`}
        backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text h2 style={tw`mb-5`}>
          Правила взятия БС
        </Text>
        <View>
          {rules.map((rule, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{rule}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button onPress={toggleOverlay} title="Понятно" />
        </View>
      </Overlay>
      <View>
        <Text style={{color: theme.colors.primary}}>Укажи причину</Text>
        <Input inputStyle={{color: '#fff'}} />
      </View>
      <View>
        <Text style={{color: theme.colors.primary, marginBottom: 8}}>
          Есть ли на проекте срочные задачи и дедлайны?
        </Text>
        <ButtonGroup
          onPress={setIndex}
          selectedIndex={index}
          buttons={buttons}
          containerStyle={{height: 50}}
        />
      </View>
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
        title="Правила взятия БС"
      />
    </View>
  );
});

export default withTheme(UnpaidRequestView);
