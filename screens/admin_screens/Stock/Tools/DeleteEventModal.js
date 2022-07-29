import { StyleSheet, Text, View,Button, } from 'react-native'
import React from 'react'
import {  Title } from 'react-native-paper';

const DeleteEventModal = ({ onDelete, eventText, onClose }) => {
    return(
      <>
        {/* <View>
          <Title>Event</Title>
  
          {/* <Title>{eventText}</Title> */}
  
          {/* <Button onClick={onDelete} title="Delete"/>
          <Button onClick={onClose} title="close"/>
        </View> */} 
  
        {/* <div id="modalBackDrop"></div> */} 
      </>
    );
  };

export default DeleteEventModal

const styles = StyleSheet.create({})