import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('StockMangement')}><Text>Dashboard</Text></TouchableOpacity>
    </View>
  );
};

export default Home;
