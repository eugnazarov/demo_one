import React from 'react';

import {observer} from 'mobx-react-lite';
import WebView from 'react-native-webview';
import Profile from '../store/Profile';
import qs from 'qs';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {Linking} from 'react-native';

const SlackView = observer(({uri}) => {
  const jsCode =
    'window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)';

  const onMessage = event => {
    const {data} = event.nativeEvent;
    if (data.includes('accessToken')) {
      let result = data.match(/"(accessToken|id)":("([^""]+)"|\[[^[]+])/gm);
      result = result.toString();
      let cleared = result.replaceAll('/', '');
      cleared = `{${cleared}}`;
      const json = JSON.parse(cleared);
      Profile.setToken(json.accessToken);
      Profile.setId(json.id);
    }
  };

  return (
    <WebView
      javaScriptEnabled={true}
      onMessage={onMessage}
      injectedJavaScript={jsCode}
      source={{uri}}
    />
  );
});

export default SlackView;
