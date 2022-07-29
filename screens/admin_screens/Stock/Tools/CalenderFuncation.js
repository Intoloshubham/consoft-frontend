import React, {useEffect, useState, Fragment} from 'react';
import {StyleSheet, Button, TouchableOpacity, View, Text} from 'react-native';
import {Title} from 'react-native-paper';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {HeaderBar} from '../../../../Components';
import tw from 'twrnc';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CalenderFuncation = props => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  console.log(firstDayCurrentMonth);

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: +1});
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )
  //

  return (
    <View>
      <HeaderBar />
      <View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <Title>{format(firstDayCurrentMonth, 'MMMM yyyy')}</Title>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={previousMonth}>
                  <Text style={{paddingRight: 10}}>Previous month</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextMonth}>
                  <Text>Next month</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Title style={{}}>Sun</Title>
              <Title style={{}}>Mon</Title>
              <Title style={{}}>Tus</Title>
              <Title style={{}}>Web</Title>
              <Title style={{}}>Thus</Title>
              <Title style={{}}>Fri</Title>
              <Title style={{}}>Sat</Title>
            </View>

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {days.map((day, dayIdx) => (
                <View
                  style={{
                    width: '15.28%',
                    borderWidth: 1,
                    margin: 5,
                    alignItems: 'center',
                  }}
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && [getDay(day)],
                    'py-1.5',
                  )}>
                  <TouchableOpacity
                    onPress={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    )}>
                    <Title dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'dd')}
                    </Title>
                  </TouchableOpacity>

                  <View>
                    {/* {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )} */}
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text>
              Schedule for{' '}
              <Title dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </Title>
            </Text>
            {/* <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))
                ) : (
                  <p>No meetings for today.</p>
                )}
              </ol> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalenderFuncation;

const styleSheet = StyleSheet.create({
  // gridStyle: {
  //   // flex:1,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   height: 40,
  //   margin: 2,
  //   backgroundColor: '#00C853'
  // },
  // gridText: {
  //   fontSize: 24,
  //   color: 'white',
  //    justifyContent: 'space-between',
  // }
});
