import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import Routes from './src/components/Routes';
import {ThemeProvider} from 'react-native-elements';
import { theme } from "./src/theme";

const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
});

export default App;
