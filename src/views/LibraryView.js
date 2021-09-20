import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Icon, SpeedDial, withTheme} from 'react-native-elements';
import LibraryItem from '../components/UI/LibraryItem';
import Profile from '../store/Profile';
import {Actions} from 'react-native-router-flux';

import Library from '../store/Library';
import moment from 'moment';

const LibraryView = observer(({theme}) => {
  useEffect(() => {
    Library.getAllBooks();
    Library.getRequests();
  }, []);

  const [isDialOpen, setIsDialOpen] = useState(false);
  const handleOpenPress = async item => {
    await onRequestSubmit(item);
  };
  const onDialClose = action => {
    action();
    setIsDialOpen(false);
  };

  const myRequests = Library.requests.filter(req => req.userId === Profile.id);

  const onRequestSubmit = async book => {
    const request = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      orderDate: moment(Date.now()).format('DD-MM-YYYY'),
    };
    await Library.sendBookRequest(request);
    Library.getAllBooks();
  };

  const myBooks = useMemo(() => {
    const books = [];

    Library.books.forEach(book => {
      const isVerified = myRequests.some(
        req => req.title === book.title && req.status === 'verified',
      );
      if (isVerified) {
        myBooks.push(book);
      }
    });

    return books;
  }, [myRequests]);

  const myOrderedBooks = useMemo(() => {
    const books = [];

    Library.books.forEach(book => {
      const isPending = myRequests.some(
        req => req.title === book.title && req.status === 'pending',
      );
      if (isPending) {
        console.log(book);
        myBooks.push(book);
      }
    });
    return books;
  }, [myBooks, myRequests]);

  console.log(myOrderedBooks);
  console.log(myBooks);

  const getBookStatus = book => {
    if (
      book.status === 'ordered' &&
      !myBooks.includes(book) &&
      !myOrderedBooks.includes(book)
    ) {
      return 'unavailable';
    }
    if (book.status === 'free') {
      return 'available';
    }
    if (myOrderedBooks.includes(book)) {
      return 'orderedByMe';
    }
    if (myBooks.includes(book)) {
      return 'ownedByMe';
    }

    return 'undefined';
  };

  return (
    <View
      style={{
        padding: 15,
        height: '100%',
        backgroundColor: theme.colors.secondary,
        fontWeight: 'bold',
      }}>
      <View>
        <FlatList
          renderItem={({item}) => (
            <LibraryItem
              item={item}
              status={getBookStatus(item)}
              openSheet={() => handleOpenPress(item)}
            />
          )}
          data={Library.books}
        />
      </View>
      <SpeedDial
        color={theme.colors.primary}
        isOpen={isDialOpen}
        icon={() => <Icon name="book" type="ionicon" color="#fff" />}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setIsDialOpen(!isDialOpen)}
        onClose={() => setIsDialOpen(!isDialOpen)}>
        <SpeedDial.Action
          title="Мои книги"
          icon={() => (
            <Icon name="folder-outline" type="ionicon" color="#fff" />
          )}
          onPress={() => onDialClose(Actions.libraryRequests)}
        />
        <SpeedDial.Action
          title="Правила пользования"
          icon={() => (
            <Icon name="newspaper-outline" type="ionicon" color="#fff" />
          )}
          onPress={() => onDialClose(Actions.libraryRules)}
        />
      </SpeedDial>
    </View>
  );
});

export default withTheme(LibraryView);

const styles = StyleSheet.create({
  container: {},
});
