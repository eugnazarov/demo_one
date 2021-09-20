import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';

const CalendarView = observer(() => {
  return (
    <View>
      <Text>Calendar</Text>
    </View>
  );
});

export default CalendarView;
