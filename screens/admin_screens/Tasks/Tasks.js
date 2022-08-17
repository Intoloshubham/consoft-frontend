import React from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, icons} from '../../../constants';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

const Tasks = () => {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};
  return (
    <View
      style={{
        padding: 20,
      }}>
      <View>
        <Calendar
          initialDate={'2022-01-01'}
          minDate={'2000-01-01'}
          maxDate={'2050-01-01'}
          enableSwipeMonths={true}
          dayComponent={({date, state}) => {
            return (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  {date.day}
                </Text>
                <Text>A</Text>
                {/* <Text>10:30am - 7:30pm</Text> */}
              </View>
            );
          }}
          renderHeader={date => {
            <View>
              <Text>Header</Text>
            </View>;
          }}
        />
      </View>
    </View>
  );
};
export default Tasks;
