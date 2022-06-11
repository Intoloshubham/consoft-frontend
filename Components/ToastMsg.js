import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';

const ToastMsg = ({visible, message}) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.TOP,
      ToastAndroid.SHORT,
      25,
      50,
    );

    return null;
  }
  return null;
};

export default ToastMsg;
