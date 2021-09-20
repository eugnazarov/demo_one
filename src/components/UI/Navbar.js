import React from 'react';
import {Header} from 'react-native-elements';

const Navbar = () => {
  return (
    <Header
      leftComponent={{icon: 'menu', color: '#fff', iconStyle: {color: '#fff'}}}
      centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
      rightComponent={{icon: 'home', color: '#fff'}}
    />
  );
};

export default Navbar;
