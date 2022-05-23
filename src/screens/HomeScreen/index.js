import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const onSignInPressed = () => {
    //validate user
    navigation.navigate('SignIn');
  };

  return (
    <View>
      <Text style={{fontSize:24, alignSelf:'center'}}>index home screen</Text>
      <Text onPress={onSignInPressed} > Sign In  
      fdgdf saurabh </Text>
    </View>
  ) 
}

export default HomeScreen
