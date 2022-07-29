import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity,Button} from 'react-native';
import {HeaderBar} from '../../../../Components';
import {Title, Card, } from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import {COLORS} from '../../../../constants';

const CustomCalender = () => {

  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const newdate = new Date();
  var ndate = new Date(
    newdate.getFullYear(),
    newdate.getMonth() + 1,
    0,
  ).getDate();
  // console.log(ndate);
  
    var cells ='';
    for(let i=1; i<=ndate; i++){
      console.log(i)
      // cells+="<View>" + {i} + "</View>"
    }

  return (
    <View>
      <HeaderBar right={true} title="Calender" />
      <View style={{flexDirection:"row",justifyContent:"space-between",margin:20}}>
        <Button title='back' />
        <Button title='next' />
      </View>
      <View
        style={{
          height: 400,
          backgroundColor: COLORS.lightblue_700,
          margin: 10,
          borderRadius: 10,
          borderWidth:1,
          elevation:0.5
        }}>
        <View style={{alignItems:"center",marginTop:20}}>
          <Title>{months[newdate.getMonth()]}</Title>
          <Title>{newdate.toDateString()}</Title>
        </View>
        <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop:10,
                padding:10
              }}>
              <Title>Mon</Title>
              <Title>Tus</Title>
              <Title>Wed</Title>
              <Title>Thus</Title>
              <Title>Fri</Title>
              <Title>Sat</Title>
              <Title>Sun</Title>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop:10,
                padding:10 
              }}>
              <TouchableOpacity><Title>1</Title></TouchableOpacity>
              <TouchableOpacity><Title>2</Title></TouchableOpacity>
              <TouchableOpacity><Title>3</Title></TouchableOpacity>
              <TouchableOpacity><Title>4</Title></TouchableOpacity>
              <TouchableOpacity><Title>5</Title></TouchableOpacity>
              <TouchableOpacity><Title>6</Title></TouchableOpacity>
              <TouchableOpacity><Title>7</Title></TouchableOpacity>
            </View>
      </View>
          
      <View>
        <Calendar name="Calender" />
      </View>
    </View>
  );
};

export default CustomCalender;

const styles = StyleSheet.create({});
