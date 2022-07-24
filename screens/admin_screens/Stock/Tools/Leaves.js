import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {HeaderBar, TextButton, FormInput} from '../../../../Components';
import {Title, DataTable, Card} from 'react-native-paper';
import {SIZES, COLORS, icons, FONTS} from '../../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Leaves = () => {
  const [leavesmodal, setLeavesModal] = useState(false);

  var newdate = new Date();
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

 
  newdate.getMonth(1);
    var ndate = new Date(
    newdate.getFullYear(),
    newdate.getMonth() + 1, 
    0
    ).getDate();
      // console.log(ndate);

    const moveDate=(pera)=>{
      if(pera=='pre'){
        newdate.setMonth(newdate.getMonth()-1)
      }
      else if(pera=='next'){
      newdate.setMonth(newdate.getMonth()+1)
    }
    }

    var days = [];
    var cells = '';

    for (let i = 0; i <= ndate; i++) {
      // console.log(i)
    }

  return (
    <View style={{flex: 1}}>
      <HeaderBar right={true} title="Leaves" />
      <View
        style={{
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
        }}>
        <Card style={{borderWidth: 1}}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Leaves</Title>
              <TextButton
                label="Leaves"
                buttonContainerStyle={{
                  paddingHorizontal: SIZES.base,
                  borderRadius: 5,
                }}
                // labelStyle={{...FONTS.h5}}
                onPress={() => setLeavesModal(true)}
              />
            </View>
          </Card.Content>
        </Card>
        {/* leacves modal start  */}
        <Modal transparent={false} visible={leavesmodal} animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000aa',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                margin: 10,
                padding: 20,
                borderRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                }}>
                <Title>Leaves from </Title>
                <Pressable onPress={setLeavesModal}>
                  <AntDesign name="close" size={30} color="black" />
                </Pressable>
              </View>
              {/* <FormInput
              label="name"
              onChange={optionTypename => {
                setoptionTypename(optionTypename);
              }}
            /> */}
              <View>
                <TextButton
                  label="Save"
                  buttonContainerStyle={{
                    height: 45,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                  }}
                  onPress={() => alert()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray2,
          ...styles.shadow,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          padding: 10,
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                moveDate('per');
              }}>
              <Text>Pre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                moveDate('next');
              }}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Title style={{textAlign: 'center', marginVertical: -10}}>
              {months[newdate.getMonth()]}
            </Title>
            <Title style={{textAlign: 'center'}}>
              {newdate.toDateString()}
            </Title>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            borderBottomWidth: 1,
          }}>
          <Text>Sun</Text>
          <Text>Mon</Text>
          <Text>Tus</Text>
          <Text>Web</Text>
          <Text>Thus</Text>
          <Text>Fri</Text>
          <Text>Sat</Text>
        </View>
        <View
          style={{
            // flex:1,
            // flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text>1</Text>
          </TouchableOpacity>
          <Text>2</Text>
          <Text>3</Text>
          <Text>4</Text>
          <Text>5</Text>
          <Text>6</Text>
          <Text>7</Text>
        </View>
      </View>
    </View>
  );
};

export default Leaves;

const styles = StyleSheet.create({});

{
  /* <Title>days={newdate.getDay()}</Title>
<Title>Month={months[newdate.getMonth()]}</Title>
<Title>Year={newdate.getFullYear()}</Title> */
}
