import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {withTheme} from 'react-native-elements';

const LibraryRulesView = ({theme}) => {
  const libraryRules = [
    'брать одновременно больше 1 книги',
    'задерживать у себя книгу больше чем на 3 недели (ты можешь ее продлить, оставив еще одну заявку)',
    'делать в книгах пометки',
    'передавать книги другому человеку без предупреждения',
    'забирать домой электронную книгу',
  ];

  return (
    <View
      style={{
        padding: 15,
        height: '100%',
        backgroundColor: theme.colors.secondary,
        fontWeight: 'bold',
      }}>
      <Text style={{fontSize: 25, color: '#fff', marginBottom: 10}}>
        Нельзя:{' '}
      </Text>
      <FlatList
        data={libraryRules}
        renderItem={({item}) => (
          <Text style={{color: '#fff', fontSize: 18, marginBottom: 5}}>
            {item}
          </Text>
        )}
      />
    </View>
  );
};

export default withTheme(LibraryRulesView);
