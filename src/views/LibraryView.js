import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';

const LibraryView = observer(() => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
});

export default LibraryView;
