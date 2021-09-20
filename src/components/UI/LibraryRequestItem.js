import React from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

const LibraryRequestItem = ({item}) => {
  const getBookStatus = () => {
    switch (item.status) {
      case 'returned': {
        return `Книга возвращена ${item.returnDate}`;
      }
      case 'rejected': {
        return 'Запрос был отклонен';
      }
      case 'verified': {
        return `Книга на руках до ${item.returnDate}`;
      }
      default: {
        return 'Запрос в обработке';
      }
    }
  };

  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
        <ListItem.Title>{item.title}</ListItem.Title>
        <Text>{getBookStatus()}</Text>
      </ListItem.Content>
    </ListItem>
  );
};

export default LibraryRequestItem;
