import React from 'react';
import {View, Text} from 'react-native';
import { Card, Title } from 'react-native-paper';
import {Dropdown, FormInput, HeaderBar,TextButton} from '../../../Components';
import {COLORS,SIZES,} from '../../../constants';

const countries = ['Jabalpur', 'Bhopal', 'Katni', 'Indore'];
const StocksAndInventry = () => {
  const [deeler, setDeeler] = React.useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
       backgroundColor:"",
      }}>
      <HeaderBar right={true} />
       <View>
       <Card>
          <Card.Content>
            <Title>StocksAndInventry</Title>
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

export default StocksAndInventry;
