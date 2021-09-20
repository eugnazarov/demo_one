import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, ListItem, withTheme} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

const LibraryItem = ({item, theme, openSheet, status}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isBookAvailable = status === 'available';
  const isBookUnavailable = status === 'unavailable';
  const isBookOrderedByMe = status === 'orderedByMe';
  const isBookOwnedByMe = status === 'ownedByMe';

  return (
    <TouchableOpacity onPress={() => setIsCollapsed(prevState => !prevState)}>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: theme.colors.secondary,
        }}>
        <ListItem.Content>
          <ListItem.Subtitle style={{color: '#fff', fontStyle: 'italic'}}>
            {item.author}
          </ListItem.Subtitle>
          <ListItem.Title style={{color: '#fff'}}>
            {item.title} | {status}
          </ListItem.Title>

          <Collapsible collapsed={isCollapsed}>
            <View>
              <Text style={styles.description}>{item.description}</Text>

              {isBookOrderedByMe && (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: theme.colors.primary,
                  }}>
                  Книга запрошена
                </Text>
              )}
              {isBookOwnedByMe && (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: theme.colors.primary,
                  }}>
                  Книга у тебя на руках
                </Text>
              )}
              {isBookAvailable && (
                <Button title="Запросить" onPress={openSheet} />
              )}
              {isBookUnavailable && (
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: theme.colors.primary,
                  }}>
                  Книга недоступна
                </Text>
              )}
            </View>
          </Collapsible>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default withTheme(LibraryItem);

const styles = StyleSheet.create({
  description: {
    color: 'grey',
    padding: 9,
    lineHeight: 18,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
