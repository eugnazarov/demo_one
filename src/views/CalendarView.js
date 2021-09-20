import React, {useState} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Button, Text, withTheme} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const CalendarView = observer(({theme}) => {
  LocaleConfig.defaultLocale = 'ru';
  LocaleConfig.locales.ru = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    dayNames: [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ],
    dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    today: 'Сегодня',
  };

  const [persons, setPersons] = useState([
    {
      name: 'Ivanov',
      days: ['2021-09-06', '2021-09-07', '2021-09-08', '2021-09-09'],
      color: 'red',
    },
    {
      name: 'Petrov',
      days: [
        '2021-09-01',
        '2021-09-02',
        '2021-09-03',
        '2021-09-04',
        '2021-09-06',
      ],
      color: 'orange',
    },
    {
      name: 'Sidorov',
      days: [
        '2021-09-03',
        '2021-09-04',
        '2021-09-06',
        '2021-09-07',
        '2021-09-08',
        '2021-09-09',
      ],
      color: 'green',
    },
    {
      name: 'Nazarov',
      days: ['2021-09-29', '2021-09-30'],
      color: 'darkblue',
    },
    {
      name: 'Bulkina',
      days: ['2021-09-16', '2021-09-17', '2021-09-18'],
      color: 'purple',
    },
    {
      name: 'Arshavin',
      days: ['2021-09-17', '2021-09-18', '2021-09-19'],
      color: 'tan',
    },
  ]);

  const createDates = () => {
    const dates = [];
    persons.map(person => {
      person.days.map(date => {
        dates.push(date);
      });
    });

    const data = {};
    dates.map(date => {
      data[date] = {
        periods: persons.map(
          person =>
            person.days.includes(date) && {
              startingDay: person.days[0] === date,
              endingDay: person.days[person.days.length - 1] === date,
              color: person.color,
            },
        ),
      };
    });

    console.log(data);
    return data;
  };

  return (
    <View>
      <View
        style={tw`m-5 flex-row justify-start  flex-wrap align-center flex-auto`}>
        {persons.map((person, index) => (
          <Button
            type="clear"
            titleStyle={{color: person.color}}
            title={person.name}
          />
        ))}
      </View>
      <Calendar markingType="multi-period" markedDates={createDates()} />
    </View>
  );
});

export default withTheme(CalendarView);
