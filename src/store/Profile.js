import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {Linking} from 'react-native';

class Profile {
  user = null;
  token = null;
  id = null;
  data = null;
  loading: false;

  constructor() {
    makeAutoObservable(this);
  }

  getUser = () => {
    this.loading = true;
    axios
      .get(`http://localhost:8080/users/?id=${this.id}`, {
        headers: {authorization: `Bearer ${this.token}`},
      })
      .then(r => {
        this.data = r.data.userProfile;
        this.loading = false;
      });
  };
  logOut = () => {
    this.token = null;
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
