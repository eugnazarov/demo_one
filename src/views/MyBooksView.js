import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {ListItem} from 'react-native-elements';

const MyBooksView = observer(() => {
  const books = [
    {
      id: 1,
      title: 'А. Авторов',
      author: 'Книга по Реакту',
      orderDate: '13-01-2021',
      returnDate: '27-01-2021',
    },
    {
      id: 2,
      title: 'А. Авторов',
      author: 'Книга по джава',
      orderDate: '13-01-2021',
      returnDate: '27-01-2021',
    },
    {
      id: 3,
      title: 'А. Авторов',
      author: 'Книга по базам данных',
      orderDate: '13-01-2021',
      returnDate: '27-01-2021',
    },
  ];
  return (
    <View>
      <FlatList
        data={books}
        renderItem={({item}) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
});

export default MyBooksView;
