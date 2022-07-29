import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import HeaderCalender from './HeaderCalender';
import Day from './Day';
import DeleteEventModal from './DeleteEventModal';
import {UseDate} from './UseDate';
import NewEventModal from './NewEventModal';
import {Title} from 'react-native-paper';
import {HeaderBar} from '../../../../Components';
import {AutoComplete} from 'react-native-element-textinput';

const NewCalender = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    //   localStorage.getItem('events') ?
    //     JSON.parse(localStorage.getItem('events')) :
    [],
  );

  const eventForDate = date => events.find(e => e.date === date);

  // useEffect(() => {
  //   localStorage.setItem('events', JSON.stringify(events));
  // }, [events]);

  const {days, dateDisplay} = UseDate(events, nav);

  return (
    <>
      <View>
        <HeaderBar />
        <ScrollView>
          <View>
            <HeaderCalender
              dateDisplay={dateDisplay}
              onNext={() => setNav(nav + 1)}
              onBack={() => setNav(nav - 1)}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <Title>Sun</Title>
              <Title>Mon</Title>
              <Title>Tue</Title>
              <Title>Wed</Title>
              <Title>Thur</Title>
              <Title>Fri</Title>
              <Title>Sat</Title>
            </View>

            <ScrollView maxHeight={500}>
              <View
                style={{
                  backgroundColor: 'yellow',
                  padding: 20,
                 
                }}>
                {days.map((d, index) => (
                  <Day
                    key={index}
                    day={d}
                    onPress={() => {
                      if (d.value !== 'padding') {
                        setClicked(d.date);
                      }
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {clicked && !eventForDate(clicked) && (
            <NewEventModal
              onClose={() => setClicked(null)}
              onSave={title => {
                setEvents([...events, {title, date: clicked}]);
                setClicked(null);
              }}
            />
          )}

          {clicked && eventForDate(clicked) && (
            <DeleteEventModal
              eventText={eventForDate(clicked).title}
              onClose={() => setClicked(null)}
              onDelete={() => {
                setEvents(events.filter(e => e.date !== clicked));
                setClicked(null);
              }}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default NewCalender;

const styles = StyleSheet.create({});
