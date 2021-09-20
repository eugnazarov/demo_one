import {action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile {
  token = null;
  id = null;
  data = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'Profile',
      properties: ['token', 'data', 'id'],
      storage: AsyncStorage,
    }).then(() => {
      console.log('persisted');
    });
  }

  getUser = () => {
    this.loading = true;
    axios
      .get(`http://localhost:8080/api/users/?id=${this.id}`, {
        headers: {authorization: `Bearer ${this.token}`},
      })
      .then(
        action(r => {
          this.data = r.data.userProfile;
          this.loading = false;
        }),
      )
      .catch(e => {
        console.log(e);
      });
  };
  logOut = async () => {
    this.token = null;
    this.id = null;
  };
  setToken = token => {
    console.log(token);
    this.token = token;
  };

  setId = id => {
    this.id = id;
  };

  authWithSlack = () => {
    Actions.slack({
      uri: linkOAuth,
      redirectUrl: 'http://localhost:8080/auth/slack/callback',
      clientId: '33906029636.2428260384196',
    });
  };
}
export default new Profile();

export const linkOAuth = `https://slack.com/oauth/authorize?client_id=33906029636.2428260384196&scope=identity.basic,identity.email,identity.avatar&redirect_uri=http://localhost:8080/auth/slack/callback`;
