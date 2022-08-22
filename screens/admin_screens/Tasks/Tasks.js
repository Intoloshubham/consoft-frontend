import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {COLORS, icons, images, FONTS, SIZES} from '../../../constants';

const Tasks = () => {
  const [appointments, setAppointments] = useState({
    '2022-08-24': [
      {
        name: 'Rohit Namdeo',
        start: '10:00 AM',
        end: '10:30 AM',
        type: 'Follow Up',
      },
    ],
    '2022-08-23': [
      {
        name: 'Shubham Sahu',
        start: '10:00 AM',
        end: '11:00 AM',
        type: 'Accute',
      },
    ],
  });

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <Text style={styles.timing}>
          {item.start} - {item.end}
        </Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 100}}>
      <Agenda
        items={appointments}
        renderItem={item => {
          return renderItem(item);
        }}
        onDayPress={day => {
          console.log(day);
        }}
        showClosingKnob={true}
        style={{}}
        theme={{
          agendaDayTextColor: '#03A9F4',
          agendaDayNumColor: 'black',
          agendaKnobColor: '#03A9F4',
        }}
        markingType={'multi-dot'}
      />
    </View>
  );
};

export default Tasks;
const styles = StyleSheet.create({
  addbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  timing: {
    color: COLORS.darkGray,
  },
  type: {
    color: '#03A9F4',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  modalContent: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});
