import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-custom-calendars';

const CalenderDate = () => {
  return (
    <View>
      <Text>CalenderDate</Text>
      <Calendar />
    </View>
  )
}

export default CalenderDate

const styles = StyleSheet.create({})