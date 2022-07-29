import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Title} from 'react-native-paper';

const Day = ({day, onClick}) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${
    day.isCurrentDay ? 'currentDay' : ''
  }`;
  return (
    <View>
      <TouchableOpacity onPress={onClick} className={className}>
        <Title>
          {day.value === 'padding' ? '' : day.value}
          {/* {day.event && <View>{day.event.title}</View>} */}
        </Title>
      </TouchableOpacity>
    </View>
  );
};
export default Day;

const styles = StyleSheet.create({});
