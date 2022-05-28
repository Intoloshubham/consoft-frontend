import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {FormInput, TextButton, Dropdown} from '../../Components';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {Card, Title} from 'react-native-paper';
const countries = ['Jabalpur', 'Bhopal', 'Katni', 'Indore'];
const Deeler = ({navigation}) => {
  const [deeler, setDeeler] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
        //  backgroundColor:"yellow"
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.notification}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
      <View>
        <Card style={{backgroundColor: 'rgba(144, 127, 136, 0.8)'}}>
          <Card.Content>
            <Title>Deeler Component</Title>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card style={{backgroundColor: 'rgba(171, 170, 158, 0.8)'}}>
          <Card.Content>
            <Title>DeelerName</Title>
            <FormInput
              placeholder="Enter name"
              onChange={name => {
                setDeeler(name);
              }}
            />
            <Title>City</Title>
            <Dropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <TextButton
              label="Submit"
              buttonContainerStyle={{
                height: 45,
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding,
              }}
              onPress={() => console.log('fgj')}
            />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default Deeler;

const styles = StyleSheet.create({
  // button: {
  //     margin: 10,
  //   },
});
