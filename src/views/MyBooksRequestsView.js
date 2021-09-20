import React, {useEffect} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import Library from '../store/Library';
import Profile from '../store/Profile';
import LibraryRequestItem from '../components/UI/LibraryRequestItem';

const MyBooksRequestsView = observer(() => {
  useEffect(() => {
    Library.getRequests();
  }, []);

  const myRequests = Library.requests.filter(req => req.userId === Profile.id);

  return (
    <View style={styles.container}>
      <FlatList
        data={myRequests}
        renderItem={({item}) => <LibraryRequestItem item={item} />}
      />
    </View>
  );
});

export default MyBooksRequestsView;

const styles = StyleSheet.create({
  container: {padding: 15},
});
