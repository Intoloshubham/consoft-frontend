import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import { Title } from 'react-native-paper';

 const HeaderCalender = ({ onNext, onBack, dateDisplay }) => {
    return(
      <View>
        <View style={{flexDirection:"row",justifyContent:"space-between",}}>
        <Title>{dateDisplay}</Title>
          <Button onPress={onBack} title='Back'/>
          <Button onPress={onNext} title='Next'/>
      </View>
      </View>
    );
  };

export default HeaderCalender

const styles = StyleSheet.create({

})