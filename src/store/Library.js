import {action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import Profile from './Profile';
import {log} from 'react-native-reanimated';

class Library {
  books = [];
  requests = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAllBooks = () => {
    this.loading = true;
    axios
      .get('http://localhost:8080/api/books/all', {
        headers: {authorization: `Bearer ${Profile.token}`},
      })
      .then(
        action(r => {
          this.books = r.data;
          this.loading = false;
        }),
      );
  };

  getRequests = () => {
    this.loading = true;
    axios
      .get('http://localhost:8080/api/books/requests', {
        headers: {authorization: `Bearer ${Profile.token}`},
      })
      .then(
        action(r => {
          console.log(r.data);
          this.requests = r.data;
          this.loading = false;
        }),
      );
  };

  sendBookRequest = async request => {
    const {orderDate, bookId, title, author} = request;
    const returnDate = new Date(moment(Date.now()).add(3, 'weeks')).toString();
    const data = {
      bookId: bookId.toString(),
      orderDate,
      userID: Profile.id,
      returnDate,
      title,
      author,
    };

    console.log(Profile.token);
    await axios.post(
      `http://localhost:8080/api/books/requests/?id=${Profile.id}`,
      data,
      {
        headers: {
          authorization: `Bearer ${Profile.token}`,
        },
      },
    );
  };
}

export default new Library();
