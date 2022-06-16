import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const Tracker = () => {
  React.useEffect(() => {
    fetch('http://192.168.1.99:8000/api/project-type', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // setProjects(data);
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Tracker</Text>
    </View>
  );
};
export default Tracker;
