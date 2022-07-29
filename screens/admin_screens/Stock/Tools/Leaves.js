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
import {Layout, RangeDatepicker, Calendar} from '@ui-kitten/components';
import CustomCalender from './CustomCalender';


// const DayCell = ({ date }, style) => (
//   <View
//     style={[styles.dayContainer, style.container]}>
//     <Text style={style.text}>{`${date.getDate('p')}`}</Text>
//     <Text style={[style.text, styles.value]}>
     
//     </Text>
//   </View>
// );
const Leaves = () => {
  const [leavesmodal, setLeavesModal] = useState(false);
  const [date, setDate] = React.useState(new Date());

  


  return (
    <View>
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
          padding: 20,
          borderWidth: 1,
          elevation: 0.9,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text>Name</Text>
          <Text>Designation</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text>Email</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text>Join_Date</Text>
          <Text>Mobile-No</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text>Emp_id</Text>
          <Text>A/c_no</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
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
      </View>
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
               
              }}>
              <Title>Leaves from </Title>
              <Pressable onPress={setLeavesModal}>
                <AntDesign name="close" size={30} color="black" />
              </Pressable>
            </View>
            <View style={{marginTop:10}}>
              <Layout style={styles.container} level="1">
                <Calendar
                  style={{borderWidth: 2, borderColor: 'black'}}
                  date={date}
                  isMultiSelection={true}
                  // values={this.values}
                  onSelect={nextDate => setDate(nextDate)}
                />
              </Layout>
            </View>
            <View>
              <TextButton
                label="Save"
                buttonContainerStyle={{
                  height: 45,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.padding,
                }}
                onPress={() => alert(date.toDateString())}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* modal end  */}
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
        <Title>Selected date: {date.toLocaleDateString()}</Title>
        <View>
          <Calendar
            style={{borderWidth: 2, borderColor: 'black'}}
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            // max={20}
            // min={yesterday}
            // max={tomorrow}
          />
        </View>
      </View>
      {/* <CustomCalender /> */}
    </View>
  );
};

export default Leaves;

const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
});

{
  /* <Title>days={newdate.getDay()}</Title>
<Title>Month={months[newdate.getMonth()]}</Title>
<Title>Year={newdate.getFullYear()}</Title> */
}
